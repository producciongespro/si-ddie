import React, { Component } from 'react';
import {ValidationForm, TextInput, SelectGroup} from 'react-bootstrap4-form-validation';

import referenciasJson from '../data/referencias.json';


//Librerias
import alertify from 'alertifyjs';
import axios from 'axios';

var nombre, apellido1, apellido2, provincia = "NA", clave, confirmaClave, usuario, fechaNacimiento;
const referencias = referenciasJson[0];



class Registro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ajaxOcupado: false
    }
  }

  // componentDidMount() {
    //Obtener paises
    // axios.get(referencias.obtenerPaises)
    //   .then(function (response) {
    //     //console.log("Paises:",  response.data);       
    //     const limite = response.data.length;
    //     for (let index = 0; index < limite; index++) {
    //       paises.push(response.data[index].nombre);
    //     }
    //     // console.log("Lista Paises:", paises);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   })
    //   .finally(function () {
    //     //console.log("fin obtener paises");
    //   });
  // }


  cerrarModal = () => {
    this.props.handlerCerrarModal();
  }


  // enviarDatosForm = () => {
  //   //sexo:
  //   let sexo = "F";
  //   if (document.getElementById("radM").checked) {
  //     sexo = "M"
  //   }

  //   let data =
  //   {
  //     "nombre": nombre,
  //     "apellido1" : apellido1,
  //     "apellido2" : apellido2,
  //     "usuario": usuario,
  //     "pais": this.state.paisOrigen,
  //     "provincia": provincia,
  //     "fechaNacimiento": fechaNacimiento,
  //     "sexo": sexo,
  //     "clave": clave,
  //     "confirmaClave": confirmaClave
  //   };

  //   console.log("data", data);

  //   //console.log(referencias.setRegistro);
  //   //this.setState({ ajaxOcupado : true });

  //   const me = this;
  //   console.log("URL servicio", referencias.registroUsuario );
    
  //   axios.post(referencias.registroUsuario, data)    
  //     .then(function (response) {
  //       console.log(response.data);

  //       alertify
  //         .alert( referencias.version, response.data.mensaje, function () {            
  //           me.cerrarModal();                       
  //         });
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //       alertify
  //       .alert( referencias.version, "Error de conexión al intentar registrarse", function () {            
  //         me.cerrarModal();                       
  //       });

  //     })
  //     .finally(function () {

  //     });

  // }


  obtenerDatosForm = (e) => {
    const opcion = e.target.id;
    // console.log(e.target.value);

    switch (opcion) {
      case "txtNombre":
        nombre = e.target.value;
        break;
      case "txtApellido1":
        apellido1 = e.target.value;
        break;
      case "txtApellido2":
        apellido2 = e.target.value;
        break;
      case "selProvincia":
        provincia = e.target.value;
        break;
      case "txtClave1":
        clave = e.target.value;
        break;
      case "txtClave2":
        confirmaClave = e.target.value;
        break;
      case "txtUsuario":
        usuario = e.target.value;
        break;
      case "datFechaNacimiento":
        fechaNacimiento = e.target.value;
        break;



      default:
        console.log("Opción fuera de rango");
        break;
    }


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

          {/* <div className="textos control-group form-group"> */}
          <div className="textos control-group form-group mt-2">
            <div className="row">
              <div className="col-12">
                <TextInput key ="nombre" type="text" className="form-control input-ingreso" placeholder="Nombre" onChange={this.obtenerDatosForm} id="txtNombre"  required/>
              </div>
            </div>
            <br/>
            <div className="row">
              <div className="col-12">
                <TextInput key ="apellido1" type="text" className="form-control input-ingreso" placeholder="Primer Apellido" onChange={this.obtenerDatosForm} id="txtApellido1" required  />
              </div>
            </div>
            <br/>
            <div className="row">
              <div className="col-12">
                <TextInput key ="apellido2" type="text" className="form-control input-ingreso" placeholder="Segundo Apellido" onChange={this.obtenerDatosForm} id="txtApellido2" required/> <br />
              </div>
            </div>
            <br/>
            <div className="row">
              <div className="col-12">
                <TextInput key="tipo" type="text" className="form-control input-ingreso" placeholder="Tipo de usuario" onChange={this.obtenerDatosForm} id="txtTipoUsuario" required /> <br />
              </div>
            </div>
            <br/>
            <div className="row">
              <div className="col-12">
                <TextInput type="text" className="form-control input-ingreso" placeholder="Correo electrónico" onChange={this.obtenerDatosForm} id="txtcorreo" required />
              </div>
            </div>
            <br/>
            <div className="row">
              <div className="col-6">
                <TextInput type="password" className="form-control input-ingreso" placeholder="Contraseña" onChange={this.obtenerDatosForm} id="txtClave1"  required/>
              </div>
              <div className="col-6">
                <TextInput type="password" className="form-control input-ingreso" placeholder="Repita Contraseña" onChange={this.obtenerDatosForm} id="txtClave2" required />
              </div>
            </div> <br />

            <div className="row">
                <div className="col-md-4 center">
                  {/* <button className="btn btn-warning" onClick={this.enviarDatosForm} > Guardar registro </button> */}
                  {/* <button className="btn btn-warning"  > Guardar registro </button> */}
                  <button className="btn btn-ingreso float-right"  > Enviar </button>
                </div>
            </div>
          </div>
        </ValidationForm>

      </React.Fragment>
    );
  }
}

export default Registro;