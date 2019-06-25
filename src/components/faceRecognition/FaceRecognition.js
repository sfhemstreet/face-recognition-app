import React from 'react';
import FaceBox from './FaceBox';
import './faceRecognition.css'

class FaceRecognition extends React.Component{
    

    renderFaceBoxes = (i) => {
        return(
            <FaceBox 
                key={[i]}
                box={this.props.box[i]} 
            />
        ) 
    }

    render(){
        const { imageURL, box } = this.props; 
        
        return (
            <div className='center ma'>
                <div className='absolute mt2'> 
                    <img id='inputImage' alt='' src={imageURL} width='500px' height='auto'/>  
                    {
                        box.map((_,i) => {
                            return this.renderFaceBoxes(i);
                        })
                    }
                </div>
            </div>
        )    
    }

    
}

export default FaceRecognition;