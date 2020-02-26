import React, { Component, useState, useContext } from 'react';


// context con los datos del usuario
import MyContext from '../modulos/MyContext';

import {ValidationForm, TextInput} from 'react-bootstrap4-form-validation';
import LoadingSpinner from './spinner/LoadingSpinner';


//Librerias
import alertify from 'alertifyjs';
import axios from 'axios';

import referenciasJson from '../data/referencias.json';
const referencias = referenciasJson[0];

export default function Loguin() {
  const [loading, setLoading] = useState(false);


  // handleSubmit = (e, formData, inputs) => {
  //   e.preventDefault();
  //   handlerLogin(formData);
  // }

  const handleErrorSubmit = (e,formData, errorInputs) => {
      console.log("handleErrorSubmit", errorInputs)
  }

  const sendDatas = (data) => { 
          
    var datosUsuario = {
      correo: data.correo,
      idUsuario: data.idUsuario,
      tipoUsuario: data.tipoUsuario,
      isAccesado : true};
      const { usuario, setUsuario } = useContext(MyContext);
      console.log("usuario LOGUEO", usuario);
      console.log("usuario nuevo", datosUsuario);
      setUsuario(nuevosDatos);

  }

  const handleSubmit = (e, data) => {
    e.preventDefault();
    axios.post(referencias.login, data)
      .then(function (response) {
        const mensajeError = response.data.error_msg;
        // console.log("response",response/*  */)
        if (response.data.error === false) {
          sendDatas = (data);

          //Almacenamiento en session el objeto usuario                    
          // sessionStorage.setItem("correo",  JSON.stringify(response.data.correo)  );                             
          // sessionStorage.setItem("tipo_usuario",  JSON.stringify(response.data.tipoUsuario)  );                             
          // sessionStorage.setItem("id_usuario",  JSON.stringify(response.data.idUsuario)  );                             
          // //Asigna valores en caso de que el login fue exitoso.
          // console.log("correo",  JSON.stringify(response.data.correo)  );                             
          // console.log("id_usuario",  JSON.stringify(response.data.idUsuario)  );                             
          // console.log("tipo_usuario",  JSON.stringify(response.data.tipoidUsuario)  );                             
          

          // me.correoUsuario= response.data.correo;
          // me.setState({isAccesado: true});
          // me.setState({ isModalActivo:false  });
          // me.setState({componenteActual : <Consultas/> });
          // me.setState({componenteActivo : 'consultas' });
        } else {
          console.log("Error IF acceso usuario");
          alertify
            .alert("Aviso", mensajeError, function () {
            });
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => {
        // me.setState({
        //   ajaxOcupado: false
        // })
      });

  }

  resetForm = () => {
    me = this;
    let formRef = me.formRef.current;    
    formRef.resetValidationState(this.state.clearInputOnReset);
  }

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
                        <TextInput key="usuario" type="text" className="form-control input-ingreso" placeholder="Digite el correo electrónico" id="correo" name="correo" required value="ana.araya.salazar@mep.go.cr"/> <br />
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <TextInput key="contraseña" type="password" className="form-control input-ingreso" placeholder="Digite la contraseña" id="claveEncriptada" name="claveEncriptada" value="a" required/>
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
