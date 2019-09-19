import React from 'react';

const Respuestas = () => {
  return ( 
    <React.Fragment>
    <h1>Respuesta o Atención de las consultas</h1>
    <form>
      <div className="form-group">
      <label for="tipo_intervencion">Seleccione la consulta a atender:</label>
        <select className="form-control" id="id_consulta" name="id_consulta">
          <option></option>
          <option>Presencial</option>
          <option>Telefónica</option>
          <option>Correo</option>
        </select>

        <label for="tipo_intervencion">Tipo de intervención:</label>
        <select className="form-control" id="tipo_intervencion" name="tipo_intervencion">
          <option></option>
          <option>Presencial</option>
          <option>Telefónica</option>
          <option>Correo</option>
        </select>

        <label for="tipo_solicitante">Tipo de solicitante:</label>
        <select className="form-control" id="tipo_solicitante" name="tipo_solicitante">
          <option></option>
          <option>Presencial</option>
          <option>Telefónica</option>
          <option>Correo</option>
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
 
export default Respuestas;