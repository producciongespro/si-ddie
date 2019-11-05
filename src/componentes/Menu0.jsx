import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {ValidationForm, TextInputGroup} from 'react-bootstrap4-form-validation';
// import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCog, faUserAlt, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class  Menu0 extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
      // const usuario = <FontAwesomeIcon icon={faAlt} size="2x" />;
        return (
          <React.Fragment>
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-6">
                    <ValidationForm onSubmit={this.handleSubmit} onErrorSubmit={this.handleErrorSubmit}
                        ref={this.formRef}
                        immediate={this.state.immediate}
                        setFocusOnError={this.state.setFocusOnError}
                        defaultErrorMessage = {
                          { required : "Este campo es requerido",
                          min : "El número debe ser mayor a 0",
                          max : "El número debe ser menor igual a 20"}
                        }
                        >
                        <div className="form-group inline">
                          <label htmlFor="amount">Amount</label>
                          <TextInputGroup name="amount" id="amount" required 
                              prepend={<span className="input-group-text">$</span>}/>
                      </div>
                    </ValidationForm>
                  </div>
            <div className="col-sm-6">
              <Navbar className="float-right" bg="transparent" expand="lg">
                <Navbar.Brand href="#home">
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="mr-auto">
                    <NavDropdown title={ <FontAwesomeIcon icon={faCog} />} id="basic-nav-dropdown">
                      <NavDropdown.Item href="#action/3.1"><FontAwesomeIcon icon={faUserAlt} size="1x" /> Usuario:</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="#action/3.4"><FontAwesomeIcon icon={faSignOutAlt} size="1x" /> Salir</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="#">Acerca de</Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            </div>

          </div>
        
</div>        
        </React.Fragment>
          );
    }
}
 
export default Menu0;