import React, { Component } from 'react';
import Llamacalendario from './Llamacalendario';

class Calendario extends Component {
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
            <Llamacalendario />
        </React.Fragment>
     );
};
}
 
export default Calendario;