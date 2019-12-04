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
            <div className="jumbotron jumbotron-fluid">              
            <h1 className="header-1">Acerca de</h1>
            </div>            
            <hr/>
            <p>Ministerio de Educación Pública de Costa Rica <br />
                Dirección de Recursos Tecnológicos <br />
                Departamento de Gestión y Producción GESPRO <br />
                Desarrolladores: Luis Chacón, Óscar Pérez, Patricia Hernández, Ana Araya <br />
                Derechos reservados ©2019 </p>
        </React.Fragment>
     );
};
}
 
export default Acerca;