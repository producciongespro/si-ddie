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


import Logueo from './componentes/Logueo';
import MyContext from './modulos/MyContext';



// import Ingreso from './componentes/Ingreso';
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
// import Logueo from './componentes/Logueo';

const referencias = referenciasJson[0];

const componentes = [<Consultas/>,<Respuestas/>, <Basededatos />,<Produccion />,<Estadisticas />,<Bitacora />,<Calendario />];

function App() {
  // const [usuario, setUsuario] = useState("ana.araya.salazar@mep.go.cr");
  // const [usuario, setUsuario] = useState({correo:"ana.araya.salazar@mep.go.cr", idUsuario:"7",tipoUsuario:"administrador"});
  
  // estado para controlar si el usuario se ha logueado exitosamente
  const [accesado, setAccesado] = useState(false);
  const [usuario, setUsuario] = useState({correo:"vacío", idUsuario:"",tipoUsuario:"", isAccesado: accesado});
  const value = { usuario, setUsuario };
  
  log("usuario datos iniciales", usuario)
    
  const [componente, setComponente] = useState(null);

    
    
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
      // <div>
      <React.Fragment>
        <MyContext.Provider value={value}>
          <h2>Correo del usuario actual: {usuario['correo']}</h2>
          <h2>Id del usuario actual: {usuario['idUsuario']}</h2>
          <h2>Id del tipo de usuario actual: {usuario['tipoUsuario']}</h2>
          <p>Click para cambiar el usuario</p>
      {/* <div> */}
          <Logueo />
      {/* </div> */}
        </MyContext.Provider>
      </React.Fragment>

      // </div>
      // </div>
          //  <MyProvider> 
              // {/* <Ingreso handlerLogin={handlerLogin}/> */}
      //         {/* <Ingreso /> */}
      //         {/* <Logueo/> */}
      //    {/* <Ingreso mostrarModal={this.handlerMostrarModal} data-tipo="registro" handlerLogin={this.handlerLogin} usuario="usuario" /> */}
      //         {/* <div className="contModal row"> */}
      //           {/* <div className="col-12"> */}
      //             {/* {modalActivo && modalComponent} */}
      //           {/* </div> */}
      //         {/* </div> */}
      //     {/* </MyProvider> */}
      // // </React.Fragment>
    }
    </div>
  )
}
export default App;
