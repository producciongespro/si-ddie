import React, { Component } from 'react';

//componentes
import Boton from './componentes/Boton';
import Consultas from './componentes/Consultas';
import Basededatos  from './componentes/Basededatos';
import Bitacora from './componentes/Bitacora';
import Estadisticas from './componentes/Estadisticas';
import Produccion from './componentes/Produccion';
import Respuestas  from './componentes/Respuestas';

//CSS
// import './css/animate.css';
import "./css/master.css";

//json

import referenciasJson from './data/referencias.json';
import paginas from './data/paginas.json';

const referencias = referenciasJson[0];
console.log("ruta de imagen", referencias.img);
console.log("version", referencias.version);


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      componenteActual : <Consultas/>
    }
  }

 handlerCargarVistas = (e) => {
   console.log("e.target.id",e.target.id);
   
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
    return ( 
      <React.Fragment> 
        <div className="jumbotron jumbotron-fluid ">
          <h1 className="h1text" >SI-DDIE</h1>
          <hr className="my-4"></hr>
          {/* <img src={referencias.img + "logo.png"     } alt="logo"/> */}
        </div>

        <div className="row">
          <div className="col-4 col-botonera">
            {              
              paginas.map((item,i) => (
                
              <Boton key={i} handlerCargarVistas= {this.handlerCargarVistas} id={item.id} etiqueta={item.etiqueta}/>
            ))
          }
            
            
          </div>
          <div className="col-8 visor">
            {
                this.state.componenteActual
            }
          </div>
        </div>
     </React.Fragment>
     );
  }
}
 
export default App;
