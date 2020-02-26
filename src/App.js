import React, {useState, useEffect}  from 'react';

//componentes

// import Botones from './componentes/Botones';
import Inicio from './componentes/Inicio';
import Consultas from './componentes/Consultas';
import Basededatos  from './componentes/Basededatos.js';
import Bitacora from './componentes/Bitacora';
import Estadisticas from './componentes/Estadisticas';
import Produccion from './componentes/Produccion.js';
import Respuestas  from './componentes/Respuestas';
import Calendario  from './componentes/Calendario';
// import Acerca  from './componentes/Acerca';
import MenuBotones from './componentes/MenuBotones';

import Ingreso from './componentes/Ingreso';
import MyProvider from './modulos/MyProvider';
// import PantallaFondo from './componentes/PantallaFondo';

//Librerias
import alertify from 'alertifyjs';
import axios from 'axios';


//CSS
// import './css/animate.css';
import "./css/master.css";
import  'pretty-checkbox/src/pretty-checkbox.scss';

import referenciasJson from './data/referencias.json';
import paginas from './data/paginas.json';

const referencias = referenciasJson[0];

const componentes = [<Consultas/>,<Respuestas/>, <Basededatos />,<Produccion />,<Estadisticas />,<Bitacora />,<Calendario />];

function App() {
    
    const [componente, setComponente] = useState(null);

    // estado para controlar si el usuario se ha logueado exitosamente
    const [accesado, setAccesado] = useState(false);
    
    // controla cantidades de columnas segun disponsitivo
    const [colUno, setColUno] = useState("col-sm-3");
    
    const [colDos, setColDos] = useState("col-sm-9");

    // controla si el modal está activo, o sea está en modo de registro
    const [modalActivo, setModalActivo]= useState(false);


      // const [hideNav, setHideNav] = useState(window.innerWidth <= 760);

    var correoUsuario="";

  useEffect(() => {
    //Acción que se ejecuta una vez que se monta el componente
    // if (!hideNav) {
    //   setColUno("col-sm-5");
    //   setColDos("col-sm-7");
    // }
    // window.addEventListener("resize", resize.bind(this));
    // resize();
    // this.setState({
      // isModalActivo: true,
      // modalComponent: <Ingreso handlerLogin={this.handlerLogin}/>
       
    // })
}, []); 

// function resize() {
//   setHideNav(window.innerWidth <= 760);
//   if(hideNav) {
//     setColUno("col-sm-5");
//     setColDos("col-sm-7");
//   }
//   else {
//     setColUno("col-sm-3");
//     setColDos("col-sm-9");
//   }
// }

const handleCargarComponentes = (e) => {   
  //  const opcion = e.target.id;
    console.log(e.target.value);    
    setComponente( componentes[e.target.value] );
  }

  // const handlerLogin = (user, password) => {
  //   //    console.log("user desde app", user);
  //   //    console.log("pass desde app", password);   
  //   let data = {
  //     "usuario": user,
  //     "clave": password
  //   }
  // }
    // handlerLogin = (data) => {
      const handlerLogin = (data) => {
      // const me = this;
  
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
            
            correoUsuario= response.data.correo;
            setAccesado(true);
            setModalActivo(false);
            // me.setState({componenteActual : <Consultas/> });
            // me.setState({componenteActivo : 'consultas' });
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




  return ( 
    <div className="App">
    {
      accesado ?
        <React.Fragment>
          <div className="App">
            <div className="row">
              <div id="col1" className={"col-botonera "+colUno}>
                  <MenuBotones handleCargarComponentes={handleCargarComponentes} />
              </div>
              <div id="col2" className={"visor "+colDos}>
              {
                componente !== null ?
                (
                  componente
                ) :
                (
                  <Consultas/>
                )
                }
              </div>
            </div>
          </div>
        </React.Fragment>
      :
      <React.Fragment>
          <MyProvider>
              {/* <Ingreso handlerLogin={handlerLogin}/> */}
              <Ingreso />
              {/* <Record/> */}
         {/* <Ingreso mostrarModal={this.handlerMostrarModal} data-tipo="registro" handlerLogin={this.handlerLogin} usuario="usuario" /> */}
              <div className="contModal row">
                <div className="col-12">
                  {/* {modalActivo && modalComponent} */}
                </div>
              </div>
          </MyProvider>
      </React.Fragment>
    }
    </div>
  )
}
export default App;
