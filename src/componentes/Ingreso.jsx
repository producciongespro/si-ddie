import React, { Component } from 'react';
import Logueo from './Logueo';
import Recuperar from './Recuperar';
import  Registro from './Registro';

import Imagen from './Imagen';
// import referenciasJSON from '../data/referencias.json';

import logo from '../images/logo_mep.png'

// librerías
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

// const referencias = referenciasJSON[0];

const classModalBody = "modal-body "; // Se agrega "modal-body large cuando carga un pdf"
const modalAncho = "modal-dialog"; // clase que contiene el tamaño del modal
// var contenidoHTML = "prueba";


class Ingreso extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: 'ingresar'
      // tipoModal : props.tipo  
    }
  }

  render() { 
    return ( 
      
      <div>
        <div className="modal fade show element-top" id="modalScreen"   >      
        <div className={modalAncho} role="document">
          <div className="modal-content animated bounceInDown">

            <div className="col-12 col-logo">
              {/* <Imagen classElement="logoMep" origen= {referencias.img+"logo_mep.png"} /> */}
              <Imagen classElement="logoMep" origen= {logo} />
              {/* <button onClick={this.props.handlerCerrarModal} type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button> */}
            </div>
            <div className={classModalBody} >
              <Tabs activeKey={this.state.key} onSelect={key => this.setState({ key })} transition={false} id="noanim-tab">
                <Tab className="" eventKey="ingresar" title="Ingresar">
                  <Logueo handlerLogin={this.props.handlerLogin} />
                </Tab>
                <Tab className="" eventKey="inscribir" title="Inscribirse">
                  {/* <Registro handlerCerrarModal={this.props.handlerCerrarModal}/> */}
                  <Registro/>
                </Tab>
                <Tab className="" eventKey="recuperar" title="Recuperar contraseña">
                  <Recuperar />
                </Tab>
              </Tabs>
            </div>

          </div>
        </div>
      </div>

      <div className="modal-backdrop show"></div>
    </div>
     );
  }
}
 
export default Ingreso;