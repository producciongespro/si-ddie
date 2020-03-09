import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';


function Modalc(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
console.log("props de datos", props.datos);

  return (
      <>
      {/* <Button variant="primary" onClick={handleShow}>
        Abrir Modal
        </Button> */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edición</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">Nombre del recurso</span>
            </div>
            <input type="text" className="form-control" placeholder="Nombre" aria-label="Username" aria-describedby="basic-addon1" />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.handleClose}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={props.handleClose}>
              Guardar Cambios
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      );
    }
    
  export default Modalc;