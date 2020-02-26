import React, { useSate} from 'react';
import MyContext from './MyContext';
import { useState } from 'react';

function MyProvider() {
 
  const user = ({
            datos : {
            correo: "ana.araya.salazar@mep.go.cr",
            tipoUsuario: "administrador",
            idUsuario: "7" },
        setUser : () => {}
  });
      
  return (
        <MyContext.Provider
            value={{
                user: user,
                }}>
            {/* {props.children} */}
            {console.log("ESTADO...",user)}            
        </MyContext.Provider>
    );
};
export default MyProvider;