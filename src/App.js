import React from 'react';
import Navigation from './components/navigation/Navigation.js';
import SignIn from './components/signIn/SignIn';
import Register from './components/register/Register';
import Logo from './components/logo/Logo.js';
import ImageLinkForm from './components/image_link_form/ImageLinkForm';
import Rank from './components/rank/Rank';
import FaceRecognition from './components/faceRecognition/FaceRecognition';
import './App.css';
import Particles from 'react-particles-js';
import {particlesOptions} from './constants/particleConstants';


const initialState = {
  input: '',
  imageURL: '',
  faceBox: [],
  route: 'signIn',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
  }
};


class App extends React.Component {
  constructor(){
    super();
    this.state = initialState;
  }

  /* LOAD USER
    gets user data from signin or register
  */
  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
    }})
  }

  // ROUTER
  onRouteChange = (route) => {
    if(route === 'signOut'){
      this.setState(initialState);
    }
    else if(route === 'home'){
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  
  // CALCULATE FACE BOX
  calculateFaceLocation = (data) => {
    
    let faces = [];
    for(let i = 0; i < data.outputs[0].data.regions.length; i++){
      const clarifaiFace = data.outputs[0].data.regions[i].region_info.bounding_box;
      const image = document.getElementById('inputImage');
      const width = Number(image.width);
      const height = Number(image.height);
      faces.push({
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height),
      })
    }
    return faces;
    
  };
  

  // DISPLAYS FACE BOX
  displayFaceBox = (box) => {
    this.setState({ faceBox: box });
  };

  // UPDATE INPUT -- URL for FACE RECOGNITION
  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  // SUMBITS URL TO FGACE RECOG API
  onButtonSubmit = (event) => {
    this.setState({ imageURL: this.state.input });
    fetch('https://rocky-savannah-13857.herokuapp.com/imageurl', {
        method: 'post',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then((response) => {
        // increment num of entries
        if(response){
          fetch('https://rocky-savannah-13857.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {entries: count}));
          })
          .catch(console.log);
        }
        // calculate face location then display box
        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch(err => console.log(err, 'API CALL ERROR'));
  }

  // RENDER 
  render(){
    const { isSignedIn, imageURL, route, faceBox } = this.state;

    return(
      <div className="App">
        <Particles 
          className='particles'
          params={particlesOptions} 
        />
        <Navigation  
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {{
          'home':
            <div>
              <Logo />
              <Rank 
                name={this.state.user.name}
                entries={this.state.user.entries}
              />
              <ImageLinkForm 
                onButtonSubmit={this.onButtonSubmit}
                onInputChange={this.onInputChange}
              />
              <FaceRecognition 
                box={faceBox}
                imageURL={imageURL}
              />
            </div>,
          'signIn':
            <SignIn 
              loadUser={this.loadUser}
              onRouteChange={this.onRouteChange}
            />,
          'register':
            <Register 
              loadUser={this.loadUser}
              onRouteChange={this.onRouteChange}
            />
        }[route]}
      </div>
    )
  }
}

export default App;
