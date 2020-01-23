import React, { Component } from 'react';

class Acerca extends Component {
    constructor(props) {
      super(props);
           // If you want to use the reset state function, you need to have a reference to the ValidationForm component
          //If your React < 16.3, check https://reactjs.org/docs/refs-and-the-dom.html#callback-refs
  
      this.state = { 
      };
    }
    render() { 
        return (
        <React.Fragment>          
            <h1 className="header-1">Créditos</h1>       
            <hr/>
            <p className="acercade text-center">Ministerio de Educación Pública de Costa Rica <br />
                Dirección de Recursos Tecnológicos en Educación<br />
                Departamento de Gestión y Producción - GESPRO <br /><br />
                Desarrolladores: <br />
                Patricia Hernández, Ana Araya, <br />
                Luis Chacón, Óscar Pérez<br /><br />
                <hr/>
                Derechos reservados ©2020 </p>
            {/* <div className="acercade"><img className="img-fluid" src={fondo} alt="imagen de créditos"/></div> */}
        </React.Fragment>
     );
};
}
 
export default Acerca;