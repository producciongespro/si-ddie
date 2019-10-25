import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
// import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCog,faHome,faUserAlt,faOutdent, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class  Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
      // const usuario = <FontAwesomeIcon icon={faAlt} size="2x" />;
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
              <Nav className="mr-auto">
              {/* <Nav.Link href="#home"><FontAwesomeIcon icon={faHome} size="2x" /></Nav.Link>                   */}
                <NavDropdown title={ <FontAwesomeIcon icon={faCog} size="2x" />} id="basic-nav-dropdown">
                  {/* <NavDropdown.Item href="#action/3.2"><FontAwesomeIcon icon={faHome} size="1x" /> Inicio</NavDropdown.Item> */}
                  <NavDropdown.Item href="#action/3.1"><FontAwesomeIcon icon={faUserAlt} size="1x" /> Usuario:</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4"><FontAwesomeIcon icon={faSignOutAlt} size="1x" /> Salir</NavDropdown.Item>
                  
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          </div>
        </React.Fragment>
          );
    }
}
 
export default Menu;