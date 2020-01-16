import React, { Component } from 'react';
import Iframe from 'react-iframe';
import {ValidationForm, TextInput} from 'react-bootstrap4-form-validation';
import LoadingSpinner from './spinner/LoadingSpinner';

// import showCall from './Muestracalendario.js'

// import referenciasJSON from '../data/referencias.json';

// librerías


class Calendario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false, 
    }
  }

  showCall = ( ) => {
    var iframe = document.getElementById('calendarEmbed');
    var email = document.getElementById('email').value;
    var blocker = document.getElementById('calendarEmbedBlocker');
    if (email && /.+\@.+/.test(email)){
      console.log("entré, correo validado");
      
        // iframe.src = 'https://calendar.google.com/calendar/embed?src=' + encodeURI(email);
        iframe.url = 'https://calendar.google.com/calendar/embed?src=' + encodeURI(email);
        blocker.style.display = 'none';
    }
    else {
        alert("That doesn't look like a valid email...");
        blocker.style.display = 'block';
    }
  }
  //eventos del formulario
  handleSubmit = (e, formData, inputs) => {
    this.showCall();    
  }

  handleErrorSubmit = (e,formData, errorInputs) => {
      // console.log("handleErrorSubmit",e,formData, errorInputs);
      console.log("handleErrorSubmit", errorInputs)
  }

  resetForm = () => {
      let formRef = this.formRef.current;
      formRef.resetValidationState(this.state.clearInputOnReset);
  }

    render() { 
    return ( 
      <React.Fragment>
       <h1 className="header-1">Calendario</h1>
        <div id="calendarEmbedWrapper">
            <Iframe id="calendarEmbed" 
               url= 'https://calendar.google.com/calendar/embed?src=ddie.mep%40gmail.com&ctz=America%2FCosta_Rica" style="border: 0" width="800" height="600" frameborder="0" scrolling="no"'
            />
        </div>
      </React.Fragment>
    )
  }
}
 
export default Calendario;