import React, { Component, useContext } from 'react';
import MyContext from '../modulos/MyContext';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
// import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faUserAlt,faAddressCard, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function Menu(props) {  
  const { usuario, setUsuario } = useContext(MyContext);

  // const llamaCreditos  = (e) => { 
  //   props.handleCargarComponentes()
  //  }
  // console.log("usuario desde MENU",usuario.correo);
  const handlerCerrarSesion = (e) => {    
    var datosUsuario = {
      correo: "",
      idUsuario: "",
      tipoUsuario: "",
      isAccesado : false};
      setUsuario(datosUsuario);
  }

        return (
          <React.Fragment>
                <div className="div-encabezado">
            {/* <Menu usuario={this.correoUsuario}   handlerCerrarSesion ={this.handlerCerrarSesion}  handlerAcercaDe ={this.handlerAcercaDe}/> */}
            
            <div className="container-fluid">            
              <Navbar className="float-right" bg="transparent" expand="lg">
              <Navbar.Brand href="#home">
              {/* <FontAwesomeIcon icon={faCog} size="2x" /> */}
              </Navbar.Brand>
              <div>
                {/* <FontAwesomeIcon icon={faHome} /> */}
              </div>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="dropdown dropleft float-right">
                  <NavDropdown title="Opciones" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/usuario"><FontAwesomeIcon icon={faUserAlt} size="1x" /> Usuario: {usuario.correo}</NavDropdown.Item>
                    <NavDropdown.Item href="#action/creditos" data-referencia="9" onClick={props.handleCargarComponentes}><FontAwesomeIcon icon={faAddressCard} size="1x" /> Créditos</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/salir" onClick = {handlerCerrarSesion} ><FontAwesomeIcon icon={faSignOutAlt} size="1x" /> Salir</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </div>
          <div className="jumbotron jumbotron-fluid ">
              <h1 className="h1text" >SI-DDIE</h1>
              <hr className="my-4"></hr>
            </div>
          </div>
        </React.Fragment>
    );
};