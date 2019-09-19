import React from 'react';

const Produccion = () => {
  return ( 
    <React.Fragment>
      <h1>Producción</h1>
      <form>
        <div className="form-group">
        <label for="tipo_producto">Seleccione el tipo de producto:</label>
          <select className="form-control" id="tipo_producto" name="tipo_producto">
            <option></option>
            <option>Revista conexiones</option>
            <option>Boletín La ley al día</option>
            <option>Listado de últimas adqusiciones</option>
            <option>DDIE Informa</option>
            <option>Recomendaciones DDIE</option>
          </select>
        </div>
        <div className="form-group">
          <label for="cantidad">Cantidad:</label>
          <input type="number" className="form-control" id="cantidad" name="cantidad" />
        </div>
        <button type="submit" id="btnEnviar" className="btn btn-primary">Enviar</button>
      </form>
    </React.Fragment>
  );
}
 
export default Produccion;