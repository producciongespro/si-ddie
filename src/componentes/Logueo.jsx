import React, { Component } from 'react';
import {ValidationForm, TextInput} from 'react-bootstrap4-form-validation';
import referenciasJson from '../data/referencias.json';
const referencias = referenciasJson[0];
var me;
class Logueo extends Component {
    constructor(props) {
   
      console.log("props", props);
      
      super(props);
      this.state = {
      }
      me = this;   
    }

  handleSubmit = (e, formData, inputs) => {
    // me = this;
    e.preventDefault();
    console.log("FormaData del logueo", formData.txtContrasena);
    console.log("Inputs del logueo", inputs);
    this.props.handlerLogin(formData.txtUsuario,formData.txtContrasena);
  }

  handleErrorSubmit = (e,formData, errorInputs) => {
      console.log("handleErrorSubmit", errorInputs)
  }

  resetForm = () => {
      let formRef = this.formRef.current;
      formRef.resetValidationState(this.state.clearInputOnReset);
  }

    render() {
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
                        <TextInput key="usuario" type="text" className="form-control input-ingreso" placeholder="Usuario" id="txtUsuario" name="txtUsuario" required /> <br />
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <TextInput key="contraseña" type="password" className="form-control input-ingreso" placeholder="Contraseña" id="txtContrasena" name="txtContrasena" required />
                    </div>
                </div>
                <br/>
              </div>
              <div className="row">
                <div className="col-md-12 center">
                  {/* <button className="btn btn-ingreso float-right" onClick={() => this.props.handlerLogin(user, password )} > Entrar </button> */}
                  <button className="btn btn-ingreso float-right"> Entrar </button>
                </div>
              </div>
          </ValidationForm>
        </React.Fragment>
      );
  }
}

export default Logueo;