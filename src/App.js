import React, {useRef, useState, useEffect}  from 'react';

//componentes

import Ingreso from './componentes/Ingreso';
import Consultas from './componentes/Consultas';
import Basededatos  from './componentes/Basededatos.js';
import Bitacora from './componentes/Bitacora';
import Estadisticas from './componentes/Estadisticas';
import Produccion from './componentes/Produccion.js';
import Respuestas  from './componentes/Respuestas';
import Calendario  from './componentes/Calendario';
import Acerca from './componentes/Acerca';
import MenuBotones from './componentes/MenuBotones';
import Menu from './componentes/Menu';

import MyContext from './modulos/MyContext';

// import Inicio from './componentes/Inicio';


// hojas de estilos
import "./css/master.css";
import  'pretty-checkbox/src/pretty-checkbox.scss';


const componentes = [<Consultas/>,<Respuestas/>, <Basededatos />,<Produccion />,<Estadisticas />,<Bitacora />,<Calendario />, <Acerca/>];

function App() {

  // controla cantidades de columnas segun dispositivo
  const [colUno, setColUno] = useState("col-sm-3");
  const [colDos, setColDos] = useState("col-sm-9");


  const [usuario, setUsuario] = useState({correo:"", idUsuario:"",tipoUsuario:"", isAccesado: false});
  const value = { usuario, setUsuario };
  
  console.log("usuario datos iniciales", usuario)
    
  const [componente, setComponente] = useState(null);

  useEffect(() => {
    //Acción que se ejecuta al montar el componente en el DOM
}, []); 

const handleCargarComponentes = (e) => {    
  // console.log("e.target", e.target);
  
   if ( e.target.tagName.toUpperCase() =='A') { // EXCEPCION para cargar página de créditos
    setComponente( componentes[7] );
  }
  else {
    setComponente( componentes[e.target.value] );  
  }  
  // setComponente( componentes[e.target.value] );
  var btns = document.getElementsByName("botones"); 
  for (var i = 0; i < btns.length; i++) {
      var element = btns[i];
      if (element.value === e.target.value){
        element.classList.add("inactivo","btn", "disabled");
      }
      else {
        element.classList.remove("inactivo","btn", "disabled");
      }
    }
}

   return ( 
    <div className="App">
      <MyContext.Provider value={value}>
      {
        usuario.isAccesado ?
          <React.Fragment>
              <Menu  handleCargarComponentes={handleCargarComponentes}   />
              <div className="row">
                <MenuBotones handleCargarComponentes={handleCargarComponentes}/>  
                {
                  componente !== null ?
                  (
                    <React.Fragment>
                      <div id="col2" className={"visor "+colDos}>
                        {componente}
                      </div>
                    </React.Fragment>
                  ) :
                  (
                    <React.Fragment>
                      <div id="col2" className={"visor "+colDos}>
                        <Consultas/>
                      </div>
                    </React.Fragment>
                  )
                }
              </div>
            </React.Fragment>
          :
          <React.Fragment>
            <Ingreso />
              <div className="contModal row">
                <div className="col-12">              </div>
              </div>
            {console.log("usuario datos posteriores", usuario)}          
          </React.Fragment>
      }
      </MyContext.Provider>
    </div>
  )
}
export default App;
