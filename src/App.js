import React, {useState, useEffect}  from 'react';

//componentes
// import Ingreso from './componentes/Ingreso';
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
// import PantallaFondo from './componentes/PantallaFondo';

//Librerias
// import alertify from 'alertifyjs';
// import axios from 'axios';


//CSS
// import './css/animate.css';
import "./css/master.css";
import  'pretty-checkbox/src/pretty-checkbox.scss';



const componentes = [<Consultas/>,<Respuestas/>, <Basededatos />,<Produccion />,<Estadisticas />,<Bitacora />,<Calendario />];

function App() {
    const [componente, setComponente] = useState(null);
    const [accesado, setAccesado] = useState(false)
      const [colUno, setColUno] = useState("col-sm-3");
      const [colDos, setColDos] = useState("col-sm-9");
      // const [hideNav, setHideNav] = useState(window.innerWidth <= 760);


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
      <React.Fragment>
         <Login mostrarModal={this.handlerMostrarModal} data-tipo="registro" handlerLogin={this.handlerLogin} usuario="usuario" />
              <div className="contModal row">
                <div className="col-12">
                  {this.state.isModalActivo && this.state.modalComponent}
                </div>
              </div>
      </React.Fragment>
    }
    </div>
  )
}
export default App;
