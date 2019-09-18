import React, { Component } from 'react';
import Boton from './componentes/Boton';
import referenciasJson from './data/referencias.json';

const referencias = referenciasJson[0];
console.log("ruta de imagen", referencias.img);
console.log("version", referencias.version);





class App extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
      <React.Fragment> 
        <div className="jumbotron">
          <h1>SI-DDIE</h1>
          <img src={referencias.img + "logo.png"     } alt="logo"/>
        </div>
        <div className="row">
          <div className="col-4 col-botonera">
          <Boton/>
          </div>
        </div>
        <div className="col-8 visor">

        </div>
     </React.Fragment>
     );
  }
}
 
export default App;
