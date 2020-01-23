import React, { Component } from 'react';
import {ValidationForm, TextInput, SelectGroup} from 'react-bootstrap4-form-validation';

import axios from 'axios';

import mostrarAlerta from './Alerta.js'

import referenciasJson from '../data/referencias.json';

import LoadingSpinner from './spinner/LoadingSpinner';


const referencias = referenciasJson[0];
var correoUser = sessionStorage.getItem("correo");
var idUser = sessionStorage.getItem("id_usuario");
     
console.log("correoUser", correoUser);
console.log("idUser", idUser);


var  me;


class Consultas extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      id_intervencion : "",
      id_solicitud : "",
      id_solicitante : "",
      id_respuesta: "",    
      ttipo_intervencion : [],
      ttipo_solicitud : [],
      ttipo_solicitante : [],
      ttipo_respuesta: [],      
      alertaActiva : false,
      classSuccess : false,
      loading: false // will be true when ajax request is running
     }
  }

 

  componentDidMount() {
    this.obtenerJson("ttipo_solicitud");
    this.obtenerJson("ttipo_solicitante");
    this.obtenerJson("ttipo_intervencion");
    this.obtenerJson("ttipo_respuesta");
  }


  obtenerJson = (tabla) => {
    var tablaConsulta = tabla.substring(1);
    console.log("tabla subs", tabla)
   let url= referencias.consultageneral+"?tabla=" + tablaConsulta;
    // console.log("URL",url);
    axios.get(url)
      .then(res => {     
        this.setState({ [tabla] : res.data  }); 
      })

      .catch(function (error) {
        console.log("error",error)
      })
      .finally(function () {
      });
  }

  handleSubmit = (e, formData, inputs) => {
    e.preventDefault();
    this.enviarDatosForm(e.target,formData);
    // e.preventDefault();
    console.log(formData);
    alert(JSON.stringify(formData, null, 2));
  }

  handleErrorSubmit = (e,formData, errorInputs) => {
      console.log("handleErrorSubmit", errorInputs)
  }

  resetForm = () => {
    let formRef = this.formRef.current;
    formRef.resetValidationState(this.state.clearInputOnReset);
}

  enviarDatosForm =  (form, datos)  => {
    console.log("datos para enviar", datos)
      me = this;
      if (datos.id_respuesta === ""){
        delete datos["id_respuesta"];
      };
      if (datos.fecha_respuesta === ""){
        delete datos["fecha_respuesta"];
      }
      if (datos.solicitante_otro === ""){
        delete datos["solicitante_otro"];
      }

       this.setState({ loading: true }, () => {
        // let url= referencias.guardaconsulta+"?tabla_destino=consultas";
        // console.log("url", url);
        
        axios.post(referencias.guardaconsulta+"?tabla_destino=consultas", datos)    
          .then(function (response) {
          
            console.log("response.data",response.data.error);
             me.setState({loading: false});
              mostrarAlerta( "ALERTA", response.data['mensaje']  );
               
          })
          .catch(function (error) {
            console.log("Este es el error en envío",error);       
            // mostrarAlerta( "Error", "Ocurrido un error al guardar la información"  );
          })
          .finally(function () {
            console.log("Transacción finalizada");        
          });
        });

  }

  handleChange = (e) => {
  console.log("escogido del tipo de intervencion", e.target.value);
  this.setState({
    [e.target.name]: e.target.value
  })
  if (e.target.name === 'tipo_solicitante') {
      e.target.value === '5'?this.setState({ classSuccess: true }):this.setState({ classSuccess: false });
  }
}

  obtenerSolicitante = (e) => {
    //ojo limpiar el valor si no es 5, en caso de más de un registro
    console.log("Target obtener Solicitante", e.target.value);
    e.target.value === '5'?this.setState({ classSuccess: true }):this.setState({ classSuccess: false });
    // this.obtenerDatosForm(e);    
  }

    render() { 
      const  loading  = this.state.loading;
      const  classSuccess  = this.state.classSuccess;
      return (
        <React.Fragment>
          {/* <Menu /> */}
          <h1 className="header-1">Consultas</h1>     
          <hr/>         
          <ValidationForm onSubmit={this.handleSubmit} onErrorSubmit={this.handleErrorSubmit}
                  ref={this.formRef}
                  immediate={this.state.immediate}
                  setFocusOnError={this.state.setFocusOnError}
                  defaultErrorMessage = {
                    { required : "Este campo es requerido"}
                  }><div className="form-group">
              <label className="font-len" htmlFor="id_intervencion">Tipo de intervención:</label>
              <SelectGroup name="id_intervencion" id="id_intervencion"
                         value={this.state.id_intervencion} 
                        required errorMessage="Por favor seleccione un tipo de intervención."
                        onChange={this.handleChange}
                        >
                           {/* <option value="">--- Please select ---</option> */}
                <option  disabled value="">Seleccione la opción</option>
                {
                    this.state.ttipo_intervencion.map((item) => (
                    <option key={"intervencion"+ item.id} value={item.id}>  {item.tipo}   </option>
                  ))
                }
              </SelectGroup>

            <label className="font-len" htmlFor="id_solicitante">Tipo de solicitante:</label>
            {/* <select defaultValue={'DEFAULT'} className="form-control"   name="tipo_solicitante" onChange={this.obtenerSolicitante} > */}
            <SelectGroup name="id_solicitante" id="id_solicitante"
                         value={this.state.id_solicitante} 
                        required errorMessage="Por favor seleccione un tipo de solicitante."
                        onChange={this.handleChange}>
                <option  disabled value="">Seleccione la opción</option>
                {
                      this.state.ttipo_solicitante.map((item) => (
                    <option key={item.id} value={item.id}>  {item.tipo}   </option>
                  ))
                }
            </SelectGroup>
            <br/>
            <div className={"form-group form-control-sm " + (classSuccess? "":"d-none")}>
                <TextInput key ="tiposolicitante" type="text" className="form-control" placeholder="Escriba el nombre" name="solicitante_otro"/>
            </div>
            
              <label className="font-len" htmlFor="id_solicitud">Tipo de solicitud:</label>
              {/* <select defaultValue={'DEFAULT'} className="form-control"  name="tipo_solicitud" onChange={this.obtenerDatosForm} > */}
              <SelectGroup name="id_solicitud" id="id_solicitud"
                         value={this.state.id_solicitud} 
                        required errorMessage="Por favor seleccione el tipo de solicitud." 
                        onChange={this.handleChange}>
                  
              <option  disabled value="">Seleccione la opción</option>
              { 
                  this.state.ttipo_solicitud.map((item) => (
                  <option key={"solicitud"+item.id} value={item.id}>  {item.tipo}   </option>
                ))
              }
              </SelectGroup>

            </div>
            <div className="form-group">
              <label className="font-len" htmlFor="tema">Tema:</label>
              <TextInput key ="temas" type="text" className="form-control" id="tema" name="tema" required/>
            </div>
            <div className="form-group">
              <label className="font-len" htmlFor="fecha_solicitud">Fecha solicitud:</label>
              <TextInput key ="fechasolicitud" type="date" className="form-control" id="fecha_solicitud" name="fecha_solicitud" required/>
            </div>
            <br />
            <h2 className="header-2">Atención a la consulta</h2>
            <hr />
            <label className="font-len" htmlFor="id_respuesta">Tipo de respuesta:</label>
              <SelectGroup name="id_respuesta" id="id_respuesta"
                      value={this.state.id_respuesta}
                      onChange={this.handleChange}>
              <option  disabled value="">Seleccione la opción</option>
              {
                this.state.ttipo_respuesta.map((item) => (
                <option key={item.id} value={item.id}>  {item.tipo}   </option>
                ))
              }
              </SelectGroup>
            <div className="form-group">
              <label className="font-len" htmlFor="fecha_respuesta">Fecha de respuesta:</label>
              <TextInput key ="fecharespuesta"  type="date" className="form-control" id="fecha_respuesta" name="fecha_respuesta" onChange={this.obtenerDatosForm} />
            </div>

            <div className={"form-group d-none"}>
                <TextInput key ="usuario" type="text" className="form-control" name="id_usuario" id="id_usuario" value ={idUser}/>
                

                
            </div>

            <div className="row">
              <div className="col-md-6 center">
                <button className="btn btn-block btn-main"> 
                {/* {this.state.showWarning ? 'Hide' : 'Show'} */}
                Guardar registro {loading ? <LoadingSpinner elementClass={"spinner-grow text-light spinner-grow-lg"} /> : <LoadingSpinner elementClass={"d-none"} /> } </button>
              </div>
            </div>  
            </ValidationForm>  

          </React.Fragment>

        );
    }
}
 
export default Consultas;