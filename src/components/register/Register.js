import React from 'react';

class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            name: '',
        }
    }
    // NAME
    onNameChange = (event) => {
        const re = new RegExp(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/igm)
        if(event.target.value.match(re)){
            this.setState({name: event.target.value});
        }
    }
    // EMAIL
    onEmailChange = (event) => {
        const re = new RegExp(/[a-z\d]+([._]?[a-z\d]+)+@[a-z\d]+(\.[a-z]+)+/igm)
        if(event.target.value.match(re)){
            this.setState({email: event.target.value});
        }
    }
    // PASSWORD 
    onPasswordChange = (event) => {
        /*
        pattern matches password validation for having 3 of 4 of the following items: 
        lowercase, uppercase, numbers, special characters
        */
        const re = new RegExp(/^((?=.*[\d])(?=.*[a-z])(?=.*[A-Z])|(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\d\s])|(?=.*[\d])(?=.*[A-Z])(?=.*[^\w\d\s])|(?=.*[\d])(?=.*[a-z])(?=.*[^\w\d\s])).{7,30}$/gm)
        if(event.target.value.match(re)){
            this.setState({password: event.target.value});
        }
        
    }
    // SUBMIT
    onRegisterSubmit = (event) => {
        if(!this.state.email || !this.state.name || !this.state.password){
            return console.log('Whatttt');
        }
        fetch('https://rocky-savannah-13857.herokuapp.com/register', {
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
            })
        })
        .then(response => response.json())
        .then(user => {
            if(user.id){
                this.props.loadUser(user)
                this.props.onRouteChange('home');
            }
            
        })
        
    }

    render(){
        return (
            <div className="br3 ba  b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <div className="pa4 black-80">
                    <div className="measure ">
                        <div id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">
                                    User Name
                                </label>
                                <input 
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="text" 
                                    name="name"  
                                    id="username" 
                                    onChange={this.onNameChange}
                                />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                                    Email
                                </label>
                                <input 
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="email" 
                                    name="email-address"  
                                    id="email-address" 
                                    onChange={this.onEmailChange}
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">
                                    Password
                                </label>
                                <input 
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="password" 
                                    name="password"  
                                    id="password" 
                                    onChange={this.onPasswordChange}
                                />
                            </div>
                        
                        </div>
                        <div className="">
                            <input 
                                onClick={this.onRegisterSubmit}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib pointer" 
                                type="submit" 
                                value="Register" 
                            />
                        </div>
                    </div>
                </div>
            </div>
        )    
    }
    
}

export default Register;