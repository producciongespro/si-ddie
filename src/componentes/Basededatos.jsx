import React, { Component } from 'react';
import {ValidationForm, TextInput, SelectGroup} from 'react-bootstrap4-form-validation';
 //https://andyhu92.github.io/react-bootstrap4-form-validation/#/example/basic-usage
//  https://andyhu92.github.io/react-bootstrap4-form-validation/#/api/validation-form

 import axios from 'axios';

 import referenciasJson from '../data/referencias.json';

import mostrarAlerta from './Alerta.js';

import LoadingSpinner from './spinner/LoadingSpinner';

const referencias = referenciasJson[0];

var  me,
    fechaActual = new Date(),
    idUser = sessionStorage.getItem("id_usuario");

class Basededatos extends Component {
  constructor(props) {
    super(props);
    

    this.formRef = React.createRef();

    this.state = { 

      id_usuario      : "",
      id_ingreso      : "",
      descriptor      : "",
      portada         : "",
      texto_completo  : "",
      enlace          : "",
      fecha           : fechaActual,
      anno            : "",
      mes             : "",
      
      tipo_ingreso : [],
      alertaActiva : false,
      loading: false, 
      classSuccess : false,
    
      immediate:true,   //estado de validación del form
      setFocusOnError:true,
      clearInputOnReset:false
    };
  }

  componentDidMount( ) {
    this.obtenerJson("tipo_ingreso");
  }

  obtenerJson = (tabla) => {
    let url= referencias.consultageneral+"?tabla=" + tabla;
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
    this.enviarDatosForm(formData);
  }

  handleErrorSubmit = (e,formData, errorInputs) => {
      console.log("handleErrorSubmit", errorInputs);
      

  }

  handleChange = (e) => {
    var estado = e.target.name;      
    this.setState({
      [estado] : e.target.value
    })
    if (e.target.name === 'id_ingreso') {
      e.target.value === '3'?this.setState({ classSuccess: true }):this.setState({ classSuccess: false });
    }
  }

  resetForm = () => {
      let formRef = this.formRef.current;
      formRef.resetValidationState(this.state.clearInputOnReset);
  }

  enviarDatosForm = (ingresos) => {
      me = this;     
      if (ingresos.anno === ""){
        delete ingresos["anno"];
      };
      if (ingresos.mes === ""){
        delete ingresos["mes"];
      } 
       this.setState({ loading: true }, () => {
        axios.post(referencias.guardaconsulta+"?tabla_destino=ingresos", ingresos)    
          .then(function (response) {
             console.log("response.data",response.data);
             me.setState({loading: false});   
             mostrarAlerta( "Alerta", response.data['mensaje']  );
             if(!response.data['error']){ 
               me.limpiaDatos();
             }
          })
          .catch(function (error) {
            console.log("Este es el error en envío",error);       
          })
          .finally(function () {
            console.log("Transacción finalizada");        
          });
        });

  }

  limpiaDatos  = ( ) => {
    me = this;
    me.setState(() => ({
      id_usuario      : "",
      id_ingreso      : "",
      descriptor      : "",
      portada         : "",
      texto_completo  : "",
      enlace          : "",
      anno            : "",
      mes             : "",
      fecha           :  fechaActual
      })
    );
    me.resetForm(); 
  }


    render() { 
    const  loading  = this.state.loading,
           classSuccess  = this.state.classSuccess;
    return (
      <React.Fragment>
        <ValidationForm onSubmit={this.handleSubmit} onErrorSubmit={this.handleErrorSubmit}
          ref={this.formRef}
          immediate={this.state.immediate}
          setFocusOnError={this.state.setFocusOnError}
          defaultErrorMessage = {
            { required : "Este campo es requerido y debe ser numérico",
              min : "El número debe ser mayor a 0",
              type: "El valor debe ser numérico",
            }
          }
        >
          <h1 className="header-1">Base de datos</h1>
          <hr/>
          <div className="row">
            <div className="form-group col-sm-6">
              <label className="font-len" htmlFor="id_ingreso">Nuevo ingreso:</label>
              <SelectGroup  key="idingreso" className="form-control" name="id_ingreso" id="id_ingreso" 
                            value={this.state.id_ingreso} 
                            required 
                            onChange={this.handleChange}
                            errorMessage={{ required:"Este campo es requerido"}}
                >
                 <option  disabled value="">Seleccione la opción</option>
                {
                    this.state.tipo_ingreso.map((item) => (
                    <option key={item.id} value={item.id}>{item.tipo} </option>
                  ))
                }
              </SelectGroup>
            </div>

            <div className="form-group col-sm-6">
              <label  className="font-len"  htmlFor="descriptor">Descriptor:</label>
              <TextInput  key="kdescriptor" type="number" className="form-control form-basedatos" id="descriptor" name="descriptor" min="1"  placeholder="Digite la cantidad" required value={this.state.descriptor} onChange={this.handleChange} />
            </div>
          </div>
          <div className={"row"+ (classSuccess? "":" d-none")}>  
            <div className="form-group col-sm-6">
              <label  className="font-len"  htmlFor="mes">Mes:</label>
              <TextInput type="number" className="form-control form-basedatos" id="mes" name="mes" min="1" max='12' placeholder="Digite el mes"  value={this.state.mes} onChange={this.handleChange} />
            </div>
            <div className="form-group col-sm-6">
              <label  className="font-len"  htmlFor="anno">Año:</label>
              <TextInput type="number" className="form-control form-basedatos" id="anno" name="anno" placeholder="Digite el año de la publicación"  value={this.state.anno} onChange={this.handleChange} />
            </div>
          </div>
          <div className="row">  
            <div className="form-group col-sm-6">
              <label  className="font-len"  htmlFor="portada">Portada:</label>
              <TextInput type="number" className="form-control form-basedatos" id="portada" name="portada" min="1" placeholder="Digite la cantidad" required value={this.state.portada} onChange={this.handleChange} />
            </div>
            <div className="form-group col-sm-6">
              <label  className="font-len"  htmlFor="texto_completo">Texto completo:</label>
              <TextInput type="number" className="form-control form-basedatos" id="texto_completo" name="texto_completo" min="1" placeholder="Digite la cantidad" required value={this.state.texto_completo} onChange={this.handleChange} />
            </div>
          </div>
          <br/>

          <div className="row">  
            <div className="form-group col-sm-6">
              <label  className="font-len"  htmlFor="enlace">Enlace:</label>
              <TextInput type="number" className="form-control form-basedatos" id="enlace" name="enlace" min="1"  placeholder="Digite la cantidad" required value={this.state.enlace} onChange={this.handleChange} />
            </div>
            <div className="form-group col-sm-6">
              <label  className="font-len" htmlFor="fecha">Fecha</label>
              <TextInput type="date" className="form-control" id="fecha" name="fecha" required onChange={this.handleChange}  value={this.state.fecha} errorMessage={{ required:"Este campo es requerido"}}/>
            </div>
          </div>
          <hr/>
          <div className={"form-group d-none"}>
              <TextInput type="text" className="form-control" name="id_usuario" id="id_usuario" value ={idUser}/>    
          </div>
          <div className="row">
              <div className="col-md-6 center">
                <button className="btn btn-block btn-main"> 
                  Guardar registro {loading ? <LoadingSpinner elementClass={"spinner-grow text-light spinner-grow-lg"} /> : <LoadingSpinner elementClass={"d-none"} /> } 
                </button>
              </div>
          </div>     
        </ValidationForm>   
      </React.Fragment>
    );
  }
}
 
export default Basededatos;