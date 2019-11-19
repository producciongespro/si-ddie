import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
// import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCog,faHome,faUserAlt,faAddressCard, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class  Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
      // const usuario = <FontAwesomeIcon icon={faAlt} size="2x" />;
      //const usuario = JSON.parse(sessionStorage.getItem("usuario"));
     //nsole.log("datos USUARIO", usuario);
      
        return (
          <React.Fragment>
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
                    <NavDropdown.Item href="#action/1.1"><FontAwesomeIcon icon={faUserAlt} size="1x" /> Usuario: {this.props.usuario}</NavDropdown.Item>
                    <NavDropdown.Item href="#action/1.2"><FontAwesomeIcon icon={faAddressCard} size="1x" /> Acerca de</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/1.3" onClick = {this.props.handlerCerrarSesion} ><FontAwesomeIcon icon={faSignOutAlt} size="1x" /> Salir</NavDropdown.Item>
                  </NavDropdown>
                  {/* <Nav.Link href="#">Acerca de</Nav.Link> */}
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </div>
        </React.Fragment>
          );
    }
}
 
export default Menu;