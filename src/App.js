import React, {useState, useEffect}  from 'react';

//componentes
import Ingreso from './componentes/Ingreso';
import Consultas from './componentes/Consultas';
import ConsultasVer from './componentes/ConsultasVer';
import Basededatos  from './componentes/Basededatos.js';
import BasededatosVer  from './componentes/BasededatosVer.js';
import Bitacora from './componentes/Bitacora';
import Estadisticas from './componentes/Estadisticas';
import Produccion from './componentes/Produccion.js';
import ProduccionVer from './componentes/ProduccionVer.js';
import Reservaciones  from './componentes/Reservaciones';
import Acerca from './componentes/Acerca';
import MenuBotones from './componentes/MenuBotones';
import Menu from './componentes/Menu';
import Bienvenida from './componentes/Bienvenida';

import MyContext from './modulos/MyContext';
import useCurrentWitdh from './modulos/cambiancho';

// hojas de estilos
import "./css/master.css";
// import  'pretty-checkbox/src/pretty-checkbox.scss';
// import  'pretty-checkbox/src/text.css';


const componentes = [<Consultas/>,<ConsultasVer/>,<Basededatos />,<BasededatosVer/>,<Produccion/>,<ProduccionVer />,<Estadisticas />,<Bitacora />,<Reservaciones />, <Acerca/>];


function App() {
  let width = useCurrentWitdh();
  // controla cantidades de columnas segun dispositivo

  const [colUno, setColUno] = useState("col-sm-3");
  const [colDos, setColDos] = useState("col-sm-9");


  const [usuario, setUsuario] = useState({correo:"", idUsuario:"",tipoUsuario:"",isAccesado: false});
  const value = { usuario, setUsuario };
  
  const [componente, setComponente] = useState(null);

  useEffect(() => {

    if(width <= 760)
         {           
          setColUno("col-sm-4");
          setColDos("col-sm-8");
        }

        else {
          setColUno("col-sm-3");
          setColDos("col-sm-9");
        }
}); 

const handleCargarComponentes = (e) => {     
  // console.log("componentes[e.target] ", componentes[e.target] );
    e.preventDefault();

     if ( e.target.tagName.toUpperCase() ==='A') { // EXCEPCION para cargar página de créditos
    // console.log("entre al if, valor dataset", e.target.dataset.referencia);
     setComponente( componentes[parseInt(e.target.dataset.referencia)] );
    // console.log( "componentes[e.target.dataset.componente]", componentes[e.target.dataset.referencia] );
  }
  else {
    // console.log("componentes[e.target.value] ", componentes[e.target.value] );
    
    setComponente( componentes[e.target.value] );  
  }  
  var btns = document.getElementsByName("botones"); 
  // console.log("btns", btns);
    
  for (var i = 0; i < btns.length; i++) {
      var element = btns[i];
      if (element.id[0] === e.target.id[0]){        
        element.classList.add("inactivo");
      }
      else {
        element.classList.remove("inactivo");
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
              <div className={"row "}>
                <MenuBotones handleCargarComponentes={handleCargarComponentes} col={colUno} />  
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
                        <Bienvenida/>
                      </div>
                    </React.Fragment>
                  )
                }
              </div>
              <div className="row">
                <div className="col offset-sm-3">
                  <hr/>
                    <h6  className=" mt-6 text-center pt-4">Elaborado por Gestión y Producción de Recursos Tecnológicos del<br/>
                    Ministerio de Educación Publica de Costa Rica <br/>
                    Derechos reservados ©2020 </h6>
                </div>
              </div>
            </React.Fragment>
          :
          <React.Fragment>
            <Ingreso />
              <div className="contModal row">
                <div className="col-12"> </div>
              </div>
          </React.Fragment>
      }
      </MyContext.Provider>
    </div>
  )
}
export default App;
