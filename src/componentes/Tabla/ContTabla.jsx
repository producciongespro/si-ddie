import Tabla from "./Tabla";

const confTabla = {
  alterna: true,
  oscura: false,
  indice: true,
  ver: true,
  eliminar: true,
  encabezado: ["Fecha", "Inicio", "Fin", "Solicitante","Dirección/Depto."], //Títulos de tabla (Primera fila encabezado)
  campos: ["fecha", "horainicio", "horafin", "correo","instancia"], // Nombre de los cmapos del json
};

let datos;


const filtrarPorMes = (idMes, array) => {
  let tmpArray = [];
  for (let index = 0; index < array.length; index++) {
    //extrae el mes del campo fecha:
    const mes = array[index].fecha.split("-")[1];
    // console.log(mes);
    //compara el mes extraido del objeto y lo cmpara con el mes asignado en props
    if (parseInt(mes) === idMes) {
      //si se da la condición agrega en el arreglo tempora el objeto
      tmpArray.push(array[index]);
    }
  }
  return tmpArray;
};

export default function ContTabla(props) {

  const obtenerIdItemTabla = (id) => {
    // console.log("ID de Item a eliminar desde ContTabla:", id);
  
    props.obtenerIdItem(id);
 };

 const obtenerItemTabla = (item) => {
  // console.log("Item:", item);
  props.obtenerItem(item);
};
 
 
  const reservasFiltradas = filtrarPorMes(props.idMes, props.array);
  console.log("reservasFiltradas",reservasFiltradas)

  for (let index = 0; index < reservasFiltradas.length; index++) {
    const element = reservasFiltradas[index];
    element.horainicio = element.horainicio.substr(0, 5);
    element.horafin = element.horafin.substr(0, 5);
  }

  console.log("reservasFiltradas",reservasFiltradas)
  // const reservasOrdenadas = ordenarPorInicio (reservasFiltradas, "fecha");
  // console.log("reservasFiltradas",reservasFiltradas);
// console.log("reservasOrdenadas",reservasOrdenadas);
  return (
    <>
    <div className="row">
      <div className="col-12">
        <button
        className="btn btn-regresar"
        onClick={props.handleReservaciones}
        > 👈  Regresar</button>
      </div>
    </div>
    <hr />
    <Tabla
      //Método para obtener el id del registro - se activa con el botón "eliminar" <<< Propiedad no requerida >>> :
      obtenerId={obtenerIdItemTabla}
      // Método para obtner todos los campos del registro - Se activa con el botón "ver" <<<Propiedad no requerida  >>>:
      obtenerItem={obtenerItemTabla}
      //Propiedades requeridas:
      conf={confTabla}

      array={reservasFiltradas}
    />
    </>
  );
}
