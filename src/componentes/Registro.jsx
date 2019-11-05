import React, { Component } from 'react';
// import provincias from '../data/provincias.json';
import referenciasJson from '../data/referencias.json';
// import Autocomplete from './Autocomplete/Autocomplete';

//Librerias
import alertify from 'alertifyjs';
import axios from 'axios';

// var paises = []; // array de paises de la BD
var nombre, apellido1, apellido2, provincia = "NA", clave, confirmaClave, usuario, fechaNacimiento;
const referencias = referenciasJson[0];



class Registro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paisOrigen: "",
      provinciaVisible: false,
      ajaxOcupado: false
    }
  }

  componentWillMount() {
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
  }


  cerrarModal = () => {
    this.props.handlerCerrarModal();
  }


  enviarDatosForm = () => {
    //sexo:
    let sexo = "F";
    if (document.getElementById("radM").checked) {
      sexo = "M"
    }

    let data =
    {
      "nombre": nombre,
      "apellido1" : apellido1,
      "apellido2" : apellido2,
      "usuario": usuario,
      "pais": this.state.paisOrigen,
      "provincia": provincia,
      "fechaNacimiento": fechaNacimiento,
      "sexo": sexo,
      "clave": clave,
      "confirmaClave": confirmaClave
    };

    console.log("data", data);

    //console.log(referencias.setRegistro);
    //this.setState({ ajaxOcupado : true });

    const me = this;
    console.log("URL servicio", referencias.registroUsuario );
    
    axios.post(referencias.registroUsuario, data)    
      .then(function (response) {
        console.log(response.data);

        alertify
          .alert( referencias.version, response.data.mensaje, function () {            
            me.cerrarModal();                       
          });
      })
      .catch(function (error) {
        console.log(error);
        alertify
        .alert( referencias.version, "Error de conexión al intentar registrarse", function () {            
          me.cerrarModal();                       
        });

      })
      .finally(function () {

      });

  }


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


//   obtenerPais = (paisOrigen) => {
//     this.setState({ paisOrigen: paisOrigen }, () => {
//       console.log("Pais desde el estado", this.state.paisOrigen);

//       if (this.state.paisOrigen === "Costa Rica") {
//         this.setState({ provinciaVisible: true });
//         provincia = "1";
//       }
//     });


//   }



  render() {
    return (
      <React.Fragment>
        <h1 className="titmodal">Registro</h1> <hr />



        <div className="textos control-group form-group">

          <h5 className="text-perfil" >Datos Personales</h5>

          <div className="row ">
            <div className="col-md-6">
              <input type="text" className="form-control" placeholder="Nombre" onChange={this.obtenerDatosForm} id="txtNombre" />
              <input type="text" className="form-control" placeholder="Primer Apellido" onChange={this.obtenerDatosForm} id="txtApellido1" />
              <input type="text" className="form-control" placeholder="Segundo Apellido" onChange={this.obtenerDatosForm} id="txtApellido2" /> <br />
            </div>

            <div className="col-md-6 ">
              <h6>Fecha de Nacimiento</h6>
              <input type="date" className="form-control" placeholder="Fecha de nacimiento" onChange={this.obtenerDatosForm} id="datFechaNacimiento" /> <br />
            </div>
          </div>

          <div className="row ">

            <div className="col-md-5">
              {/* <Autocomplete suggestions={paises} obtenerPais={this.obtenerPais} css="form-control" /> */}
            </div>


            <div className="col-md-5">

              {
                this.state.provinciaVisible && (
                  <select className="form-control" onChange={this.obtenerDatosForm} id="selProvincia" placeholder="Provincia" >
                    {/* {
                      provincias.map((item) => (
                        <option key={item.id} value={item.id}>  {item.etiqueta}   </option>
                      ))
                    } */}
                  </select>
                )
              }
            </div>
          </div>
          <hr />

          <div className="row">
            <div className="col-4">
              Sexo:
            </div>
            <div className="col-8">

              <div className="pretty p-default p-round">
                <input type="radio" name="sexo" id="radM" />
                <div className="state">
                  <label>Masculino</label>
                </div>
              </div>

              <div className="pretty p-default p-round">
                <input type="radio" name="sexo" id="radF" />
                <div className="state">
                  <label>Femenino</label>
                </div>
              </div>

            </div>
          </div>



          <br />


          <div className="row">
            <div className="col-4">
              <input type="text" className="form-control" placeholder="Usuario" onChange={this.obtenerDatosForm} id="txtUsuario" />
            </div>
            <div className="col-4">
              <input type="password" className="form-control" placeholder="Contraseña" onChange={this.obtenerDatosForm} id="txtClave1" />
            </div>

            <div className="col-4">
              <input type="password" className="form-control" placeholder="Repita Contraseña" onChange={this.obtenerDatosForm} id="txtClave2" />
            </div>
          </div> <br />



          <div className="row">
            <div className="col-md-4 center">
            {/* <button className="btn btn-warning" onClick={this.enviarDatosForm} > Guardar registro </button> */}
              <button className="btn btn-warning"> Guardar registro </button>
            </div>
          </div>


        </div>



      </React.Fragment>
    );
  }
}

export default Registro;