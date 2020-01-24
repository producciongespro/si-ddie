import React, { Component } from 'react';

import {ValidationForm, TextInput} from 'react-bootstrap4-form-validation';
import LoadingSpinner from './spinner/LoadingSpinner';

// import referenciasJson from '../data/referencias.json';
// const referencias = referenciasJson[0];

var me;

class Logueo extends Component {
    constructor(props) {      
      super(props);
      this.state = {
        loading: false, 
        // validacion
        immediate:true,
        setFocusOnError:true,
        clearInputOnReset:true
      }
    }

  handleSubmit = (e, formData, inputs) => {
    e.preventDefault();
    this.props.handlerLogin(formData);

  }

  handleErrorSubmit = (e,formData, errorInputs) => {
      console.log("handleErrorSubmit", errorInputs)
  }

  resetForm = () => {
    me = this;
    let formRef = me.formRef.current;    
    formRef.resetValidationState(this.state.clearInputOnReset);
  }

    render() {
      const  loading  = this.state.loading;
      return (
        <React.Fragment>
          <ValidationForm onSubmit={this.handleSubmit} onErrorSubmit={this.handleErrorSubmit}
            ref={this.formRef}
            immediate={this.state.immediate}
            setFocusOnError={this.state.setFocusOnError}
            defaultErrorMessage = {
              { required : "Este campo es requerido"}
            }>
              <div className="textos control-group form-group mt-2">
                <div className="row">
                    <div className="col-md-12 ">
                        <TextInput key="usuario" type="text" className="form-control input-ingreso" placeholder="Digite el correo electrónico" id="correo" name="correo" required /> <br />
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <TextInput key="contraseña" type="password" className="form-control input-ingreso" placeholder="Digite la contraseña" id="claveEncriptada" name="claveEncriptada" required />
                    </div>
                </div>
                <br/>
              </div>
              <div className="row">
              <div className="col-md-12">
                <button className="btn btn-ingreso float-right"> 
                  Enviar {loading ? <LoadingSpinner key="loading" elementClass={"spinner-grow text-light spinner-grow-lg"} /> : <LoadingSpinner  key="loading" elementClass={"d-none"} /> } 
                </button>
             </div>
            </div> 
          </ValidationForm>
        </React.Fragment>
      );
  }
}

export default Logueo;