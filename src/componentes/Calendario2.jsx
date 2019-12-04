import React, { Component } from 'react';
import Iframe from 'react-iframe';
// import {ValidationForm, TextInput} from 'react-bootstrap4-form-validation';
// import LoadingSpinner from './spinner/LoadingSpinner';
class Calendario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // loading: false, 
    }
  }
  componentDidMount() { 
    var frames = window.frames; // or // var frames = window.parent.frames;
for (var i = 0; i < frames.length; i++) { 
  // do something with each subframe as frames[i]
  frames[i].document.body.style.background = "red";
  console.log("arreglo de frames", frames);
  console.log("Cantidad de iframes", frames.length);
  
  
}
  }


    render() { 
    return ( 
      <React.Fragment>
       <h1 className="header-1">Calendario</h1>
        <div id="calendarEmbedWrapper">
            <Iframe id="calendarEmbed" 
                        url="https://calendar.google.com/calendar/embed?src=ddie.mep%40gmail.com&ctz=America%2FCosta_Rica"
            />
        </div>
      </React.Fragment>
    )
  }
}
 
export default Calendario;