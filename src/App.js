import './App.css';
import './Slideshow.css';
import React, { StrictMode } from 'react';
import ReactDOM  from 'react-dom/client';

const imgUrls = [
	"https://images.unsplash.com/photo-1518893063132-36e46dbe2428?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80", 
	"https://images.unsplash.com/photo-1588421357574-87938a86fa28?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
	"https://images.unsplash.com/photo-1539622106114-e0df812097e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80",
	"https://images.unsplash.com/photo-1585758874546-c593da5f29e7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
	"https://images.unsplash.com/photo-1615457938971-3ab61c1c0d57?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80",
  "https://images.unsplash.com/photo-1559614500-75b5f1ffab7c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80"
];



// Creating Carousel class to act as a wrapper (here carousel) to handle the entire logic for the 
class Carousel extends React.Component{
  constructor (props) { //use of the constructor to initialize the state of the carousel. This will help implementing the functions down the line.
    super(props);
    this.state ={
      currentImageIndex: 0
    };
  

  this.nextSlide = this.nextSlide.bind(this); //used to bind the previous and next slide functions to constructor, so that they can enact onto the Slideshow.
  this.previousSlide = this.previousSlide.bind(this);
  }

  previousSlide(){
    const lastIndex = imgUrls.length - 1;
    const { currentImageIndex } = this.state;
    const shouldResetIndex = currentImageIndex === 0;
    const index = shouldResetIndex ? lastIndex : currentImageIndex - 1;
    
    this.setState({
      currentImageIndex: index
    });
  }

  nextSlide(){
    const lastIndex = imgUrls.length - 1;
    const { currentImageIndex } = this.state;
    const shouldResetIndex = currentImageIndex === lastIndex;
    const index = shouldResetIndex ? 0 : currentImageIndex + 1;
    
    this.setState({
      currentImageIndex: index
    });
  }

  render() {
    return (
      <div className="carousel">
        < Arrow direction="left" clickFunction={ this.PreviousSlide} glyph="&#9664;" />
        <ImageSlide url={imgUrls[this.state.currentImageIndex]} />
        < Arrow direction="right" clickFunction={ this.NextSlide} glyph="&#9654;" />
      </div>
    )
  }
}

//Creation of the ImageSlide component. stateless/functional component as there is no inherent logic to control the state of these components. 
//The component shall receive the image URL (as a string) creates an object describing how it should be styled and returns with the markup filled with the info provided.

const ImageSlide = ({url}) => {
  const styles = {
    backgroundImage: `url(${url})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };

  return (
    <div className="image-slide" style={styles}></div>
  );
}

//Creation of the Arrow Function.  Both arrows will be constructed at the same time, the direction changed accordingly.
//Clickfunction describes what happens once an arrow is clicked. Glyph answers the question "What will be rendered".

const Arrow = ({ direction, clickFunction, glyph}) => (
  <div className={ `slide-arrow ${direction}`} onClick={ clickFunction}>
    {glyph}
  </div>
);

const containerElement = document.getElementById('container');

const root = ReactDOM.createRoot(containerElement);
// Function to render the carousel and send it to the container division
root.render(
  <StrictMode>
    <Carousel />
  </StrictMode>
  
);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div id="container"></div>
      </header>
    </div>
  );
}



export default App;
