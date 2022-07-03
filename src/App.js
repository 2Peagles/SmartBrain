import React, { Component} from 'react';
import Particles from 'react-tsparticles';
// import { loadFull } from "tsparticles";
import FaceRecognition from './Component/FaceRecognition/FaceRecognition';
import Navigation from './Component/Navigation/Navigation';
import SignIn from './Component/SignIn/SignIn';
import Register from './Component/Register/Register';
import Logo from './Component/Logo/Logo';
import ImageLinkForm from './Component/ImageLinkForm/ImageLinkForm';
import Rank from './Component/Rank/Rank';
import 'tachyons';
import './App.css'

const particlesOptions = {
particles: { 
  number: {
    value: 30,
    density: { b b
    enable: true,
      value_area:800, 
        color: {
          value: "#ffffff",
          preset: "links",
        },
    }
   }
  }
  }

 const initialState ={
  input :' ',
  imageUrl:'',
  box: { },
  route: 'SignIn',
  isSignedIn : false,
  user : {
      id: ' ',
      name:' ',
      email:' ',
      entries: 0,
      joined: ' '
  }
  }

class App extends Component {
  constructor () { 
    super ();
     this.state = initialState;
  }
  calculateFaceLocation =(data) => {   
    const clarifaiFace =data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById ('inputImage');
    const width = Number (image.width );
    const height = Number (image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height ,
      rightCol :width - (clarifaiFace.right_col*width) ,
      bottomRow:height - (clarifaiFace.bottom_row*height)
    }
    }

displayFaceBox =(box) => {
  this.setState({ box : box })
}
  onInputChange =( event ) => {
   this.setState({input: event.target.value});
  }
   onButtonSumbit = ( ) => {           //OnPictureSumbit better nam
     this.setState({ imageUrl:this.state.input});
     fetch ('http://localhost:3000/imageurl', {
      method : 'post',
      headers : { 'Content-Type ': 'application/json' },
      body : JSON.stringify({
          input:this.state.input
           })
        })
        .then(response => response.json())
        .then(response =>{ 
if (response) {
  fetch ('http://localhost:3000/image', {
    method : 'put',
    headers : { 'Content-Type ': 'application/json' },
    body :JSON.stringify({
        id:this.state.user.id
         })
      })
    .then (response => response.json( ))
    .then (count => {
      this.setState (Object.assign(this.state.user,{entries:count}))
     })  
     .catch(console.log)
    }
this.displayFaceBox( this.calculateFaceLocation (response))
}) 
    .catch (err => console.log(err)) ;
    }
     
    onRouteChange = ( route) => {
      if (route === 'signout') {
        this.setstate (initialState)
      } else if (route === 'home'){
        this.setState({isSignedIn: true})
      }
      this.setState({route:route});
    }
     
 render () {
  const {isSignedIn, imageUrl,route,box} = this.state;
   return (
    <div className="App"> 
     <Particles 
        id="tsparticles" 
        params={ particlesOptions }
     />
      <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
   { route === 'home' ? 
   <div>
      <Logo/>
      < Rank 
          name={this.state.user.name}
          entries= {this.state.user.entries} />
      <ImageLinkForm
           onInputChange={this.onInputChange}
           onButtonSumbit={this.onButtonSumbit} />
           <FaceRecognition box={box} imageUrl ={imageUrl} />
   </div>
: ( route === 'SignIn'
  ? <SignIn  loadUser= {this.loadUser} onRouteChange={this.onRouteChange}/> 
  :  <Register loadUser= {this.loadUser } onRouteChange={this.onRouteChange}/> 
)
   }
    </div>
    );
  }
}

export default App ;
