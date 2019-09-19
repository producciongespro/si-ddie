import React, { Component } from 'react';
import axios from 'axios';
import referenciasJson from '../data/referencias.json';


const referencias = referenciasJson[0];

// var solicitante = []; // array de solicitante de la BD

class Consultas extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      solicitante : []
     }
  }

componentDidMount() {
  //Obtener datos
  let cons = 'SELECT * FROM `tipo_solicitante`';
  let url= referencias.consultageneral+"?consulta="+cons+"";
  console.log("URL",url);
  
  // url: "form.php?user=Peter&password=foobar",
  // '../server/consultar_asesorias.php?id_CE=x&correo='+correo+'&tipo_usr='+ tipoUsuario; 
  // axios.get(referencias.consultageneral+"'consulta=",
  axios.get(url
    //   {params: 
    //     {
    //       consulta: 'SELECT * FROM `tipo_solicitante`'
    //     }
    // }
    )
    .then(res => {
      const persons = res.data;
      this.setState({ persons });
    })

    // .then(function (response) {

    //   console.log("tipo de solicitante:",  response.data);       
    //   const limite = response.data.length;
    //   for (let index = 0; index < limite; index++) {
    //     solicitante.push(response.data[index].nombre);
    //   }
    //   console.log("Solicitantes:", solicitante);
    // })
    .catch(function (error) {
      console.log("error",error)
    })
    .finally(function () {
      //console.log("fin obtener paises");
    });
}

  render() { 
    return (
      <React.Fragment>
      <h1>Consultas</h1>
      <form>
        <div className="form-group">
          <label for="tipo_intervencion">Tipo de intervención:</label>
          <select className="form-control" id="tipo_intervencion" name="tipo_intervencion">
            <option></option>
            <option>Presencial</option>
            <option>Telefónica</option>
            <option>Correo</option>
          </select>

          {/*<label for="tipo_solicitante">Tipo de solicitante:</label>
           <select className="form-control" id="tipo_solicitante" name="tipo_solicitante">
            <option></option>
            <option>Presencial</option>
            <option>Telefónica</option>
            <option>Correo</option>
          </select> */}
          <label for="tipo_solicitante">Tipo de solicitante:</label>
          <select className="form-control"  id="tipo_solicitante" name="tipo_solicitante">
          {
            this.state.solicitante.map((item) => (
              <option key={item.id} value={item.id}>  {item.tipo}   </option>
            ))
          }
          </select>

          <label for="tipo_solicitud">Tipo de solicitud:</label>
          <select className="form-control" id="tipo_solicitud" name="tipo_solicitud">
            <option></option>
            <option>Presencial</option>
            <option>Telefónica</option>
            <option>Correo</option>
          </select>

        </div>
        <div className="form-group">
          <label for="tema">Tema:</label>
          <input type="text" className="form-control" id="tema" name="tema" />
        </div>
        <div className="form-group">
          <label for="fecha_solicitud">Fecha solicitud:</label>
          <input type="date" className="form-control" id="fecha_solicitud" name="fecha_solicitud" />
        </div>
        <br />
        <h2>Atención a la consulta</h2>
        <hr />
        <label for="respuesta">Tipo de respuesta:</label>
          <select className="form-control" id="respuesta" name="respuesta">
            <option></option>
            <option>Presencial</option>
            <option>Telefónica</option>
            <option>Correo</option>
          </select>
        <div className="form-group">
          <label for="fecha_respuesta">Fecha de respuesta:</label>
          <input type="date" className="form-control" id="fecha_respuesta" name="fecha_respuesta" />
        </div>

        <button type="submit" id="btnEnviar" className="btn btn-primary">Enviar</button>
      </form>
    </React.Fragment>
      );
  }
}
 
export default Consultas;