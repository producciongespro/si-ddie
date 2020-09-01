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
                <p className="acercade text-center">
                    Departamento de Gestión y Producción - GESPRO <br /><br />
                    Desarrolladores: <br />
                    Patricia Hernández <br/>
                    Ana Araya<br />
                    Luis Chacón <br/>
                    Óscar Pérez<br /></p>
        </React.Fragment>
     );
};
}
 
export default Acerca;