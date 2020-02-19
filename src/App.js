import React, { Component } from 'react';

//componentes
import Ingreso from './componentes/Ingreso';
import Botones from './componentes/Botones';
import Consultas from './componentes/Consultas';
import Basededatos  from './componentes/Basededatos';
import Bitacora from './componentes/Bitacora';
import Estadisticas from './componentes/Estadisticas';
import Produccion from './componentes/Produccion.js';
import Respuestas  from './componentes/Respuestas';
import Calendario  from './componentes/Calendario';
import Acerca  from './componentes/Acerca';
import Menu from './componentes/Menu';
import PantallaFondo from './componentes/PantallaFondo';

//Librerias
import alertify from 'alertifyjs';
import axios from 'axios';


//CSS
// import './css/animate.css';
import "./css/master.css";
import  'pretty-checkbox/src/pretty-checkbox.scss';

//json

import referenciasJson from './data/referencias.json';
import paginas from './data/paginas.json';

const referencias = referenciasJson[0];


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      componenteActual : <PantallaFondo/>, 
      componenteActivo: 'consultas',
      colUno : "col-sm-3",
      colDos: "col-sm-9",
      hideNav: window.innerWidth <= 760,

      isAccesado: false,
      isModalActivo: true,
      modalComponent: <Ingreso handlerLogin={this.handlerLogin}/>
    }
  };
  //propiedades de la clase:
  correoUsuario="";

componentDidMount() {  
    if (!this.state.hideNav) {
      this.setState({colUno: "col-sm-5"});
      this.setState({colDos: "col-sm-7"});
    }
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
    this.setState({
      // isModalActivo: true,
      // modalComponent: <Ingreso handlerLogin={this.handlerLogin}/>
    });
    
}

resize() {
  this.setState({hideNav: window.innerWidth <= 760});
  if (this.state.hideNav) {
    this.setState({colUno: "col-sm-5"});
    this.setState({colDos: "col-sm-7"});
  }
  else {
    this.setState({colUno: "col-sm-3"});
    this.setState({colDos: "col-sm-9"});
  }
}

handlerCerrarSesion = () => {
  alertify.confirm("Aviso", "¿Realmente desea salir?",
    () => {
      this.setState({
        isAccesado: false,
        isMenuGeneralActivo: false,
        isModalActivo: true,
        componenteActual : <PantallaFondo/>
      })
    },
    function () {
      console.log("accion cancelada");
    });


}

handlerCerrarModal = () => {
  this.setState({
    isModalActivo: false
  }, () => {
    // console.log("Estado del modal activo", this.state.isModalActivo);
  });
}

  //Entrar en session
    handlerLogin = (data) => {
    const me = this;

    axios.post(referencias.login, data)
      .then(function (response) {
        const mensajeError = response.data.error_msg;
        // console.log("response",response/*  */)
        if (response.data.error === false) {    

          //Almacenamiento en session el objeto usuario                    
          sessionStorage.setItem("correo",  JSON.stringify(response.data.correo)  );                             
          sessionStorage.setItem("tipo_usuario",  JSON.stringify(response.data.tipoUsuario)  );                             
          sessionStorage.setItem("id_usuario",  JSON.stringify(response.data.idUsuario)  );                             
          //Asigna valores en caso de que el login fue exitoso.
          console.log("correo",  JSON.stringify(response.data.correo)  );                             
          console.log("id_usuario",  JSON.stringify(response.data.idUsuario)  );                             
          console.log("tipo_usuario",  JSON.stringify(response.data.tipoidUsuario)  );                             
          
          me.correoUsuario= response.data.correo;
          me.setState({isAccesado: true});
          me.setState({ isModalActivo:false  });
          me.setState({componenteActual : <Consultas/> });
          me.setState({componenteActivo : 'consultas' });
        } else {
          console.log("Error IF acceso usuario");
          alertify
            .alert("Aviso", mensajeError, function () {
              // document.getElementById("idUser").value = "";
              // document.getElementById("txtPwd").value = "";
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


handlerAcercaDe = (e) => { 
  this.setState({componenteActual: <Acerca/>});
  this.setState({componenteActivo: 'acerca'});  
}

 handlerCargarVistas = (e) => {   
   const opcion = e.target.id;
   switch (opcion) {
     case "consultas":
       this.setState({componenteActual: <Consultas/>});
       this.setState({componenteActivo: 'consultas'});  
       break;
    case "respuestas":
      this.setState({componenteActual: <Respuestas/>});
      this.setState({componenteActivo: 'respuestas'});  
      break;
    case "basedeDatos":
      this.setState({componenteActual: <Basededatos />});
      this.setState({componenteActivo: 'basedeDatos'});  
      break;
    case "produccion":
      this.setState({componenteActual: <Produccion />});
      this.setState({componenteActivo: 'produccion'}); 
      break;
    case "estadisticas":
        this.setState({componenteActual: <Estadisticas />});
        this.setState({componenteActivo: 'estadisticas'}); 
        break;
    case "bitacora":
        this.setState({componenteActual: <Bitacora />});
        this.setState({componenteActivo: 'bitacora'}); 
        break;
    case "calendario":
        this.setState({componenteActual: <Calendario />});
        this.setState({componenteActivo: 'calendario'}); 
    break;
     default:
       break;
   }
 }
  
  render() { 
    // const componenteActivo = this.state.componenteActual.type.name;
    const compActivo = this.state.componenteActivo;
   const col1 = this.state.colUno;
   const col2 = this.state.colDos;
    return ( 
      <div className="App">
      {
       this.state.isAccesado ?
        <React.Fragment> 
      
          <div className="div-encabezado">
            <Menu usuario={this.correoUsuario}   handlerCerrarSesion ={this.handlerCerrarSesion}  handlerAcercaDe ={this.handlerAcercaDe}/>
            <div className="jumbotron jumbotron-fluid ">
              <h1 className="h1text" >SI-DDIE</h1>
              <hr className="my-4"></hr>
            </div>
          </div>
          <div className="row">
            <div id="col1" className={"col-botonera "+col1}>
            {
                paginas.map((item, i) => (              
                    <Botones key={i} handlerCargarVistas= {this.handlerCargarVistas} id={item.id} etiqueta={item.etiqueta} activo={compActivo} />                    
                ))               
              
            }
            </div>
            <div id="col2" className={"visor "+col2}>
                {this.state.componenteActual}
            </div>
          </div>
        </React.Fragment>
      :
        <React.Fragment>
         {/* {this.componenteContenedor(hideNav, componenteActivo)} */}
        <div className="contModal row">
          <div className="col-12">
            {this.state.isModalActivo && this.state.modalComponent}
          </div>
        </div>
        </React.Fragment>
      }
    </div>
     );
  }
}
 
export default App;
