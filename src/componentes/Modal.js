import React, { Component } from 'react';
// import Perfil from './Perfil';
import Registro from './Registro';
// import { AcercaDe, Preguntas, Ayuda, Creditos } from "./Estaticos";
// import GaleriaAvatar from './GaleriaAvatar/GaleriaAvatar';
import referenciasJSON from '../data/referencias.json';
const referencias = referenciasJSON[0];



const classModalBody = "modal-body "; // Se agrega "modal-body large cuando carga un pdf"
const modalAncho = "modal-dialog"; // clase que contiene el tamaño del modal
var contenidoHTML = "prueba";


class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {tipoModal : props.tipo  }
  }


  handlerMontarTipoModal = (e) => {
    const target = e.target.dataset.tar;
    console.log( "Tiupo de modal:",  target);    
    this.setState({ tipoModal: target });
  }

  renderContenido = (tipoModal, array) => {
    switch (tipoModal) {
      case "txt":
        contenidoHTML = (
          <h2>Esto es un texto</h2>
        )
        break;
      // case "video":
      //   contenidoHTML = (
      //     <h2>Esto es un video</h2>
      //   )
      //   break;
      // case "registro":
      //       // contenidoHTML = <Registro handlerCerrarModal={this.props.handlerCerrarModal} />
      //   break;
  
      // case "perfil":
      //   contenidoHTML = <Perfil handlerMontarTipoModal = {this.handlerMontarTipoModal}   handlerCerrarModal={this.props.handlerCerrarModal}  referencias={referencias} />
      //   break;
  
      // case "acerca":
      //   contenidoHTML = <AcercaDe />
      //   break;
  
      // case "preguntas":
      //   contenidoHTML = <Preguntas />
      //   break;
  
      // case "ayuda":
      //   contenidoHTML = <Ayuda />
      //   break;
  
      // case "creditos":
      //   contenidoHTML = <Creditos />
      //   break;

      // case "galeria":
      //     contenidoHTML = <GaleriaAvatar handlerMontarTipoModal = {this.handlerMontarTipoModal} referencias={referencias} />
      //     break;
  
      default:
        break;
    }
  
    return contenidoHTML;
  }



  render() { 
    return ( 
      <div>
      <div className="modal fade show  element-top" id="modalScreen"   >
        <div className={modalAncho} role="document">
          <div className="modal-content animated bounceInDown">

            <div className="col-12 text-right">
              <button onClick={this.props.handlerCerrarModal} type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className={classModalBody} >
              {
                this.renderContenido(this.state.tipoModal, this.props.info, this.props.handlerCerrarModal )
              }
            </div>

          </div>
        </div>
      </div>

      <div className="modal-backdrop fade show"></div>
    </div>
     );
  }
}
 
export default Modal;



