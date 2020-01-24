import React, { Component } from 'react';
import { ValidationForm, TextInput, SelectGroup, Checkbox} from 'react-bootstrap4-form-validation';
import Moment from 'react-moment';

import axios from 'axios';

import referenciasJson from '../data/referencias.json';

import LoadingSpinner from './spinner/LoadingSpinner';

import mostrarAlerta from './Alerta.js'

const referencias = referenciasJson[0];

var usuario = sessionStorage.getItem("correo"),
    me,
    fechaOut = "",
    idUser = sessionStorage.getItem("id_usuario");
     

    //1 - Definicion de la clase
class Respuestas extends Component {

  //2 - Constructor
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
        registroactual : {
          id_usuario : idUser,
          id_intervencion : "",
          id_solicitante : "",
          id_solicitante_otro : "",
          id_solicitud : "",
          id_respuesta: "", 
          tema: "",
          fecha_solicitud : "",
          fecha_respuesta : ""
        },

      // tema: "",
      // id_respuesta: "",
      // id_solicitud : "",
      // id_solicitante : "",
      item_id : "",
      consultas: [],
      tipo_respuesta: [],
      tipo_solicitud : [],
      tipo_solicitante : [],
      classSuccess : false,
      loading: false, // will be true when ajax request is running
      isChecked: false,
      // form-validate
      immediate: true,
      setFocusOnError: true,
      clearInputOnReset: true
    }
  }

  componentDidMount() {
    //Obtener datos  
    this.obtenerJson("tipo_solicitud");
    this.obtenerJson("tipo_solicitante");
    this.obtenerJson("consultas"); // obtiene listado de registros del usuario actual
    this.obtenerJson("tipo_respuesta");
  }

  // obtener los listados para los selects
  obtenerJson = (tabla) => {  
    var url = "";
    var usuarioConsulta;
    console.log("usuarioid", idUser);
    
    if (tabla === "consultas") {
      // console.log("isChecked antes if", this.state.isChecked);

      (this.state.isChecked) ? usuarioConsulta = 0 : usuarioConsulta = idUser; //0 todos

      url = referencias.consultaespecifica + "?tabla=" + tabla + "&id_u=" + usuarioConsulta;
      console.log("URL ", url);

    } else {
      url = referencias.consultageneral + "?tabla=" + tabla;
        console.log("URL", url);
    }
    axios.get(url)
      .then(res => {
        this.setState({ [tabla]: res.data });
      })

      .catch(function (error) {
        console.log("error", error)
      })
      .finally(function () {
      });
  }

  handleSubmit = (e, formData) => {
    e.preventDefault();
    this.enviarDatosForm(formData);
    // alert(JSON.stringify(formData, null, 2));
  }

 

  enviarDatosForm = (datos) => {
    me = this;    
    this.setState({ loading: true }, () => {

      var id_consulta = this.state.registroactual.id;
      // console.log("URL servicio", referencias.actualizaconsulta + "?tabla_destino=consultas&id=" + id_consulta);

      axios.post(referencias.actualizaconsulta + "?tabla_destino=consultas&id=" + id_consulta, datos)
        .then(function (response) {
          console.log("response.data", response.data);
          me.setState({ loading: false });
          mostrarAlerta("Alerta", response.data['mensaje']);
          console.log("response.error", response.data['error'] );
          console.log("response.error", !response.data['error'] );
          if( response.data['error'] === false ){
            me.resetForm();
            //  me.setState({ registroactual: {} }, () => { document.getElementById("spanFecha").classList.add("d-none") } );
          }

        })
        .catch(function (error) {
          console.log("Este es el error en envío", error);
        })
        .finally(function () {
          console.log("Transacción finalizada");
        });
    });
  }

  handleErrorSubmit = (e, formData, errorInputs) => {
    console.log("handleErrorSubmit", errorInputs)
  }

  resetForm = () => {
    me = this;
    let formRef = me.formRef.current;
    formRef.resetValidationState(this.state.clearInputOnReset);
  }

  toggleChange = (e, value) => {
    this.setState({ isChecked: !this.state.isChecked }, () => {
      // console.log("isChecked", this.state.isChecked); 
      this.obtenerJson("consultas"); // obtiene listado de registros del usuario actual
    });
  }

  handleChange = (e) => {
    // this.setState({
    //   [e.target.name]: e.target.value
    // })
    var estado = "dato modificado es "+e.target.name;
      console.log("Estado", estado);
      
    this.setState({
      // [e.target.name]: e.target.value
      [estado] : e.target.value    
    })
    if (e.target.name=== "tema") {
      var itemID;
      var list = e.target.selectedOptions;    
      for (let item of list) {
            itemID = item.id            
      }
    // eslint-disable-next-line array-callback-return
      this.state.consultas.map((item) => {
        if (item.id === itemID) {
          this.setState({ registroactual: item }, () => {
          });
        }
      });
    }
  }

  // handleChange = (e) => {
  //   var estado = "registroactual."+e.target.name;
  //   console.log("Estado", estado);
    
  // this.setState({
  //   // [e.target.name]: e.target.value
  //   [estado] : e.target.value    
  // })
  // console.log("registroactual campo", estado);

  //   if (e.target.name === 'tipo_solicitante') {
  //       e.target.value === '5'?this.setState({ classSuccess: true }):this.setState({ classSuccess: false });
  //   }
  // }


  render() {
    const  loading  = this.state.loading;
    const  classSuccess  = this.state.classSuccess;
    // fechaOut = this.state.registroactual.fecha_solicitud;
    return (
      <React.Fragment>
        <h1 className="header-1">Respuestas</h1>
        <div className="custom-control custom-checkbox mb-3 float-right">
            <input type="checkbox" className="custom-control-input" id="todosCheck" name="todosCheck" onChange={this.toggleChange} />
            <label className="custom-control-label" htmlFor="todosCheck">Mostrar todos los registros</label>
          </div>
          <hr />
        <ValidationForm onSubmit={this.handleSubmit} onErrorSubmit={this.handleErrorSubmit}
                  ref={this.formRef}
                  immediate={this.state.immediate}
                  setFocusOnError={this.state.setFocusOnError}
                  defaultErrorMessage = {{ required : "Este campo es requerido"}}
              >
          <div className="form-group">
            <label className="font-len" htmlFor="tema">Seleccione la consulta:</label>
               <SelectGroup name="tema" id="tema"
                         value={this.state.registroactual.tema} 
                        required errorMessage="Por favor seleccione un tipo de consulta."
                        onChange={this.handleChange}
                        >
                <option  disabled value="">Seleccione la opción</option>
              {
                this.state.consultas.map((item) => (
                  <option key={item.id} id={item.id} value={item.tema}>{item.tema}</option>
                ))
              }
            </SelectGroup>
          </div>

          {/* <div className="form-group module"> */}
          <label className="font-len" htmlFor="id_solicitante">Tipo de solicitante:</label>
            <SelectGroup name="id_solicitante" id="id_solicitante"
                         value={this.state.registroactual.id_solicitante} 
                        required errorMessage="Por favor seleccione un tipo de solicitante."
                        onChange={this.handleChange}>
                <option  disabled value="">Seleccione la opción</option>
                {
                      this.state.tipo_solicitante.map((item) => (
                    <option key={item.id} value={item.id}>  {item.tipo}   </option>
                  ))
                }
                 <br/>
            <div className={"form-group form-control-sm " + (classSuccess? "":"d-none")}>
                <TextInput key ="tiposolicitante" type="text" className="form-control" placeholder="Escriba el nombre" name="solicitante_otro"/>
            </div>

            </SelectGroup>            
              <label className="font-len" htmlFor="id_solicitud">Tipo de solicitud:</label>
              <SelectGroup name="id_solicitud" id="id_solicitud"
                         value={this.state.registroactual.id_solicitud} 
                        required errorMessage="Por favor seleccione el tipo de solicitud." 
                        onChange={this.handleChange}>
                  
              <option  disabled value="">Seleccione la opción</option>
              { 
                  this.state.tipo_solicitud.map((item) => (
                  <option key={"solicitud"+item.id} value={item.id}>  {item.tipo}   </option>
                ))
              }
              </SelectGroup>
              <label className="font-len" htmlFor="fecha_solicitud">Fecha de solicitud:&nbsp;&nbsp;</label>
              <TextInput key ="fechasolicitud"  type="date" className="form-control" id="fecha_solicitud" name="fecha_solicitud" value={this.state.registroactual.fecha_solicitud}  />

          <h2 className="header-2">Atención a la consulta</h2>
          <hr />
          <label className="font-len" htmlFor="id_respuesta">Tipo de respuesta:</label>
          <SelectGroup name="id_respuesta" id="id_respuesta"
                    value={this.state.registroactual.id_respuesta} 
                    required errorMessage="Por favor seleccione un tipo de respuesta."
                    onChange={this.handleChange}
                    >
             <option  disabled value="">Seleccione la opción</option>
            {
              this.state.tipo_respuesta.map((item) => (
                <option key={item.id} value={item.id}>  {item.tipo}   </option>
              ))
            }
          </SelectGroup>

          <div className="form-group">
            <label className="font-len" htmlFor="fecha_respuesta">Fecha de respuesta:</label>
            <TextInput key ="fecharespuesta"  type="date" className="form-control" id="fecha_respuesta" name="fecha_respuesta" required/>
          </div>
          <br /><hr />
          <div className="row">
              <div className="col-md-6 center">
                <button className="btn btn-block btn-main"> 
                Guardar registro {loading ? <LoadingSpinner elementClass={"spinner-grow text-light spinner-grow-lg"} /> : <LoadingSpinner elementClass={"d-none"} /> } </button>
              </div>
            </div>  
        </ValidationForm>
      </React.Fragment>
    );
  }
}

export default Respuestas;