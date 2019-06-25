const calculateFaceLocations = (data , faces) => {
    
    
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
    
  }

  export default calculateFaceLocations;