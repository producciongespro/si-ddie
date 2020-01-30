import React, { Component } from 'react';
import { ValidationForm, TextInput, SelectGroup} from 'react-bootstrap4-form-validation';

import axios from 'axios';

import referenciasJson from '../data/referencias.json';

import LoadingSpinner from './spinner/LoadingSpinner';

import mostrarAlerta from './Alerta.js'

const referencias = referenciasJson[0];

var me,
    hoy = new Date(),
    idUser = sessionStorage.getItem("id_usuario");
     

    //1 - Definicion de la clase
class Respuestas extends Component {

  //2 - Constructor
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      id_usuario      : "",
      id_solicitud : "",
      registro_id : "",
      id_solicitante : "",
      tema : "",
      solicitante_otro : "",
      fecha_solicitud : "",
      id_respuesta : "",
      fecha_respuesta : "",
      respuesta : "",

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
    
    if (tabla === "consultas") {
      // console.log("isChecked antes if", this.state.isChecked);

      (this.state.isChecked) ? usuarioConsulta = 0 : usuarioConsulta = idUser; //0 todos

      url = referencias.consultaespecifica + "?tabla=" + tabla + "&id_u=" + usuarioConsulta;
      // console.log("URL ", url);

    } else {
      url = referencias.consultageneral + "?tabla=" + tabla;
        // console.log("URL", url);
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

      var id_consulta = this.state.registro_id;
      // console.log("URL servicio", referencias.actualizaconsulta + "?tabla_destino=consultas&id=" + id_consulta);

      axios.post(referencias.actualizaconsulta + "?tabla_destino=consultas&id=" + id_consulta, datos)
        .then(function (response) {
          me.setState({ loading: false });
          mostrarAlerta("Alerta", response.data['mensaje']);
          console.log("response.error", response.data['error'] );

          mostrarAlerta( "ALERTA", response.data['mensaje']  );
          if(!response.data['error']){
              
             // actualizar los json de los selects
            me.obtenerJson("tipo_solicitud");
            me.obtenerJson("tipo_solicitante");
            me.obtenerJson("consultas"); 
            me.obtenerJson("tipo_respuesta");
            me.setState(() => ({
                  id_solicitud : "",
                  registro_id : "",
                  id_solicitante : "",
                  tema : "",
                  solicitante_otro : "",
                  fecha_solicitud : "",
                  id_respuesta : "",
                  fecha_respuesta : "",
                  respuesta : "",
                  classSuccess: false 
              })
            );
            me.resetForm(); 
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
    var estado = e.target.name;
      console.log("Estado", estado);
      
    this.setState({
      [estado] : e.target.value
    })

    if (e.target.name === "tema") {
      var itemID;
      var list = e.target.selectedOptions;    
      
      for (let item of list) {
        itemID = item.id;
      };
      let consultaSeleccionada = this.state.consultas.filter(elemento => {
        return elemento.id === itemID; 
      }) ; 
      
      //carga los datos guardados en la tabla
      this.setState({ registro_id: consultaSeleccionada[0].id });
      this.setState({ tema: consultaSeleccionada[0].tema });
      this.setState({ id_solicitante:  consultaSeleccionada[0].id_solicitante });
      console.log("id solicitante", consultaSeleccionada[0].id_solicitante );
      
      if (consultaSeleccionada[0].id_solicitante === '5') {
        this.setState({ solicitante_otro:  consultaSeleccionada[0].solicitante_otro });
        this.setState({ classSuccess: true });
      };

      this.setState({ id_solicitud: consultaSeleccionada[0].id_solicitud });
      this.setState({ fecha_solicitud: consultaSeleccionada[0].fecha_solicitud });
      
      if(!consultaSeleccionada[0].id_respuesta) { 
      //CHEQUEA SI ES NULL o UNDEFINED
        this.setState({ id_respuesta: ""}); 
      }
      else {
        this.setState({ id_respuesta: consultaSeleccionada[0].id_respuesta });      
      }

        if( !consultaSeleccionada[0].fecha_respuesta) {
        this.setState({ fecha_respuesta: hoy});     
      }
      else {
        this.setState({ fecha_respuesta: consultaSeleccionada[0].fecha_respuesta });
      }
      //fin de la carga de datos      
    }
    // si el solicitante es otro, habilita el input de descripción del solicitante_otro
    if (e.target.name === 'id_solicitante') {
            e.target.value === '5'?this.setState({ classSuccess: true }):this.setState({ classSuccess: false },this.setState({solicitante_otro : ""}));
        }
  };


  render() {
    const  loading  = this.state.loading;
    const  classSuccess  = this.state.classSuccess;
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
               <SelectGroup key="temas" name="tema" id="tema"
                        value={this.state.tema} 
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
          <div className="row">
            <div className="col-6">
              <label className="font-len" htmlFor="id_solicitante">Tipo de solicitante:</label>
              <SelectGroup key="idsolicitante" name="id_solicitante" id="id_solicitante"
                          value={this.state.id_solicitante} 
                          required errorMessage="Por favor seleccione un tipo de solicitante."
                          onChange={this.handleChange}>
                  <option  disabled value="">Seleccione la opción</option>
                  {
                        this.state.tipo_solicitante.map((item) => (
                      <option key={item.id} value={item.id}>  {item.tipo}   </option>
                    ))
                  }
              </SelectGroup>     
              <br/>
              <div className={"form-group form-control-sm " + (classSuccess? "":"d-none")}>
                <TextInput key ="tiposolicitante" type="text" className="form-control input-otro" placeholder="Escriba el nombre" name="solicitante_otro" value={this.state.solicitante_otro} onChange={this.handleChange}/>
              </div>
            </div>
            <div className="col-6">
              <label className="font-len" htmlFor="id_solicitud">Tipo de solicitud:</label>
              <SelectGroup key ="idsolicitud" name="id_solicitud" id="id_solicitud"
                          value={this.state.id_solicitud} 
                        required errorMessage="Por favor seleccione el tipo de solicitud." 
                        onChange={this.handleChange}>
                  
              <option  disabled value="">Seleccione la opción</option>
              { 
                  this.state.tipo_solicitud.map((item) => (
                  <option key={"solicitud"+item.id} value={item.id}>  {item.tipo}   </option>
                ))
              }
              </SelectGroup>
            </div>
          </div>
          <label className="font-len" htmlFor="fecha_solicitud">Fecha de solicitud:&nbsp;&nbsp;</label>
          <TextInput key ="fechasolicitud"  type="date" className="form-control" id="fecha_solicitud" name="fecha_solicitud" value={this.state.fecha_solicitud}  onChange={this.handleChange} required />
          <h2 className="header-2">Atención a la consulta</h2>
          <hr />
          <label className="font-len" htmlFor="id_respuesta">Tipo de respuesta:</label>
          <SelectGroup  key ="idrespuesta" name="id_respuesta" id="id_respuesta"
                    value={this.state.id_respuesta} 
                    errorMessage="Por favor seleccione un tipo de respuesta."
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
            <TextInput key ="fecharespuesta"  type="date" className="form-control" id="fecha_respuesta" name="fecha_respuesta" value={this.state.fecha_respuesta}  onChange={this.handleChange} />
          </div>
          <br /><hr />
          <div className={"form-group d-none"}>
              <TextInput key ="usuario" type="text" className="form-control" name="id_usuario" id="id_usuario" value ={idUser}/>    
          </div>
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