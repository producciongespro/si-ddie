import React, { Component } from 'react';

//componentes
import Logueo from './componentes/Logueo';
// import Ingreso from './componentes/Ingreso';
import Modal from './componentes/Modal';
import Boton from './componentes/Boton';
import Consultas from './componentes/Consultas';
import Basededatos  from './componentes/Basededatos';
import Bitacora from './componentes/Bitacora';
import Estadisticas from './componentes/Estadisticas';
import Produccion from './componentes/Produccion';
import Respuestas  from './componentes/Respuestas';
import Menu from './componentes/Menu';

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
import { cpus } from 'os';

const referencias = referenciasJson[0];
console.log("ruta de imagen", referencias.img);
console.log("version", referencias.version);


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      componenteActual : <Consultas/>, 
      colUno : "col-sm-3",
      colDos: "col-sm-9",
      hideNav: window.innerWidth <= 760,

      isAccesado: false,
      isModalActivo: true,
      isBotoneraDerechaActiva: false,
      isMenuGeneralActivo: false,
      modalComponent: "",
      typeContent: "",
      ajaxOcupado: false
    }
  };

componentDidMount() {
    if (!this.state.hideNav) {
      this.setState({colUno: "col-sm-5"});
      this.setState({colDos: "col-sm-7"});
    }
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
    this.setState({
      isModalActivo: true,
      // typeContent: "ingreso",
      isMenuGeneralActivo: false,
      modalComponent: <Modal handlerCerrarModal={this.handlerCerrarModal} tipo={"ingreso"} />
    });
}

resize() {
  this.setState({hideNav: window.innerWidth <= 760});
  // console.log("ancho menor de 760?",this.state.hideNav);
  if (this.state.hideNav) {
    this.setState({colUno: "col-sm-5"});
    this.setState({colDos: "col-sm-7"});
  }
  else {
    this.setState({colUno: "col-sm-3"});
    this.setState({colDos: "col-sm-9"});
  }
}

//modal
handlerMostrarModal = (e) => {
  e.preventDefault();
  const tipo = e.target.dataset.tipo;
  console.log("TIPO ", tipo);
  this.setState({
    isModalActivo: true,
    typeContent: tipo,
    isMenuGeneralActivo: false,
    modalComponent: <Modal handlerCerrarModal={this.handlerCerrarModal} tipo={tipo} />
  });
}

handlerCerrarModal = () => {
  this.setState({
    isModalActivo: false
  }, () => {
    console.log("Estado del modal activo", this.state.isModalActivo);
  });
}


handlerMenuGeneral = () => {
  if (this.state.isMenuGeneralActivo) {
    this.setState({ isMenuGeneralActivo: false });
  } else {
    this.setState({ isMenuGeneralActivo: true });
  }
}
//fin 

  //Entrar en session
  handlerLogin = (user, password) => {
    //    console.log("user desde app", user);
    //    console.log("pass desde app", password);   
    const me = this;
    let data = {
      "usuario": user,
      "clave": password
    }
    console.log("DAta", data ); 
    //console.log("**ref", referencias.login);
    this.setState({ ajaxOcupado: true });

    axios.post(referencias.login, data)
      .then(function (response) {
        //console.log(response.data);
        const mensajeError = response.data.error_msg;
        if (response.data.error === false) {          
          //Almacenamiento en session el objeto usuario          
          sessionStorage.setItem("usuario",  JSON.stringify(response.data)  );                             
          me.setState({
            isAccesado: true
          })          

        } else {
          console.log("Error IF acceso usuario");
          alertify
            .alert(referencias.version, mensajeError, function () {
              document.getElementById("idUser").value = "";
              document.getElementById("txtPwd").value = "";
            });
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => {
        me.setState({
          ajaxOcupado: false
        })
      });

  }


 handlerCargarVistas = (e) => {
  //  console.log("e.target.id",e.target.id);
   
   const opcion = e.target.id;
   switch (opcion) {
     case "consultas":
       this.setState({componenteActual: <Consultas/>});
       break;
    case "respuestas":
      this.setState({componenteActual: <Respuestas/>});
      break;
    case "basedeDatos":
      this.setState({componenteActual: <Basededatos />});
      break;
    case "produccion":
      this.setState({componenteActual: <Produccion />});
      break;
    case "estadisticas":
        this.setState({componenteActual: <Estadisticas />});
        break;
    case "bitacora":
        this.setState({componenteActual: <Bitacora />});
        break;
     default:
       break;
   }
 }
  
  render() { 
    const componenteActivo = this.state.componenteActual.type.name;
    // const hideNav = this.state.componenteActual.hideNav;
    // const componenteActual = this.state.componenteActual;
    // console.log("activo", componenteActivo);
   const col1 = this.state.colUno;
   const col2 = this.state.colDos;
    return ( 
      <div className="App">
      {
        <React.Fragment> 

         <div className="div-encabezado">
           <Menu />
           <div className="jumbotron jumbotron-fluid ">
             <h1 className="h1text" >SI-DDIE</h1>
             <hr className="my-4"></hr>
           </div>
         </div>
         <div className="row">
           <div id="col1" className={"col-botonera "+col1}>
           {
               paginas.map((item, i) => (              
                   <Boton key={i} handlerCargarVistas= {this.handlerCargarVistas} id={item.id} etiqueta={item.etiqueta} activo={componenteActivo} />                    
               ))               
             
           }
           </div>
           <div id="col2" className={"visor "+col2}>
               {this.state.componenteActual}
           </div>
         </div>
         {/* {this.componenteContenedor(hideNav, componenteActivo)} */}
       <div className="contModal row">
                <div className="col-12">
                  {console.log("this.state.isModalActivo",this.state.isModalActivo)}
                  {console.log("this.state.modalComponent", this.state.modalComponent)}
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
