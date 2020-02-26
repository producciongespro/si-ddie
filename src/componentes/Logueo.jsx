import React, {Fragment} from 'react';
import Credenciales from './Credenciales';
import MyContext from '../modulos/MyContext';

const Logueo = () => (
    
  <MyContext.Consumer>
      {context => (
          <Fragment>
              <h4>Login-credenciales: </h4>
              {Object.keys(context.user).map(id => (
                  <Credenciales
                   correo={context.user[id].correo}
                   tipoUsuario={context.user[id].tipoUsuario}
                   idUsuario={context.user[id].idUsuario}
                  />
              ))}
          </Fragment>
      )}
  </MyContext.Consumer>
);

export default Logueo;