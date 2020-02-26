import React from 'react';

// set the defaults
const MyContext = React.createContext({
    usuario : {
      correo: "",
      idUsuario: "",
      tipoUsuario: "",
      isAccesado: false},
    setUsuario : () => {}
});

export default MyContext;
