import React, {Fragment} from 'react';
const Credenciales = props => (
  <Fragment>
      <p>Correo Electrónico: {props.correo} </p>
      <p>Tipo Usuario: {props.tipoUsuario}</p>
      <p>Id Usuario: {props.idUsuario}</p>
  </Fragment>
);
export default Credenciales;