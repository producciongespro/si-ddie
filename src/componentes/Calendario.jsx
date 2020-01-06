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
    // const  loading  = this.state.loading;
    // const  classSuccess  = this.state.classSuccess;
    return ( 
      <React.Fragment>
        {/* <ValidationForm onSubmit={this.handleSubmit} onErrorSubmit={this.handleErrorSubmit}
            ref={this.formRef}
            immediate={this.state.immediate}
            setFocusOnError={this.state.setFocusOnError}
            defaultErrorMessage = {
              { required : "Este campo es requerido",
              min : "El número debe ser mayor a 0",
              max : "El número debe ser menor igual a 20"}
            }
          >
          <h1 className="header-1">Calendario</h1>
          <hr/>
          <div className="row">
            <div className="col-12">
                <TextInput key="contraseña" type="email" placeholder="user@gmail.com" className="form-control input-ingreso" id="email" name="email" required />
            </div>
          </div>
          <div className="row">
              <div className="col-md-12">
                <button className="btn btn-ingreso float-right"> 
                  Enviar {loading ? <LoadingSpinner key="loading" elementClass={"spinner-grow text-light spinner-grow-lg"} /> : <LoadingSpinner  key="loading" elementClass={"d-none"} /> } 
                </button>
             </div>
          </div> 
        </ValidationForm>    */}
       <h1 className="header-1">Calendario</h1>
        <div id="calendarEmbedWrapper">
            <Iframe id="calendarEmbed" 
                        // url="https://calendar.google.com/calendar/embed?src=ddie.mep%40gmail.com&ctz=America%2FCosta_Rica"
                        url= "https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=America%2FCosta_Rica&amp"
            />
            {/* <div id="calendarEmbedBlocker">
                <p>Por favor introduzca el correo electrónico y presione Enviar</p>
            </div> */}
        </div>
      </React.Fragment>
    )
  }
}
 
export default Calendario;