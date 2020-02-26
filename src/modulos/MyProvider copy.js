import React, { Component } from 'react';
import MyContext from './MyContext';

class MyProvider extends Component {
    state = {
          // user: "ana araya salazar"
        // user: {
        //     correo: "ana.araya.salazar@mep.go.cr",
        //     tipoUsuario: "administrador",
        //     idUsuario: "7"
        //     //Asigna valores en caso de que el login fue exitoso.
        // }
        user: {
          data001: { 
            correo: "ana.araya.salazar@mep.go.cr",
            tipoUsuario: "administrador",
            idUsuario: "7"
        }
      }
    };

    render() {
        return (
            <MyContext.Provider
                value={{
                    user: this.state.user,
                    }}>
                {this.props.children}
                {/* {console.log("ESTADO...",this.state.user['data001'].correo)} */}
                
            </MyContext.Provider>
        );
    }
};
export default MyProvider;