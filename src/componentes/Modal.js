import React, { Component } from 'react';
import Registro from './Registro';
import Ingreso from './Ingreso';
import Imagen from './Imagen';
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
    console.log( "Tipo de modal:",  target);    
    this.setState({ tipoModal: target });
  }

  renderContenido = (tipoModal, array) => {
    console.log("tipoModal", tipoModal);
    
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
      case "registro":
        console.log("en registro");
        contenidoHTML = (
          // <h2>Esto es un texto</h2>)
         contenidoHTML = <Registro handlerCerrarModal={this.props.handlerCerrarModal} />)
        break;
      case "ingreso":
        console.log("en ingreso");
        contenidoHTML = (
          // <h2>Esto es un texto</h2>)
          contenidoHTML = <Ingreso handlerCerrarModal={this.props.handlerCerrarModal} />)
        break;
      // case "perfil":
      //   // contenidoHTML = <Perfil handlerMontarTipoModal = {this.handlerMontarTipoModal}   handlerCerrarModal={this.props.handlerCerrarModal}  referencias={referencias} />
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
      //     // contenidoHTML = <GaleriaAvatar handlerMontarTipoModal = {this.handlerMontarTipoModal} referencias={referencias} />
      //     break;
  
      default:
        break;
    }
  
    return contenidoHTML;
  }



  render() { 
    const cerrar = this.props.handlerCerrarModal;
    console.log("cerrar modal", cerrar);
    return ( 
      
      <div>
        <div className="modal fade show element-top" id="modalScreen"   >      
        <div className={modalAncho} role="document">
          <div className="modal-content animated bounceInDown">

            <div className="col-12">
              <Imagen classElement="logoMep" origen= {referencias.img+"logo_mep.png"} />
              {/* <img className="logoMep" src= {referencias.img+"logo_mep.png"} alt=""/> */}
              <button onClick={this.props.handlerCerrarModal} type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className={classModalBody} >
            {console.log("Tipo", this.props.tipo)}
              {  
                
                              
                (this.state.tipoModal==="ingreso")?<Ingreso handlerCerrarModal={this.props.handlerCerrarModal} />:this.renderContenido(this.state.tipoModal)
              }
            </div>

          </div>
        </div>
      </div>

      <div className="modal-backdrop show"></div>
    </div>
     );
  }
}
 
export default Modal;