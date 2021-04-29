import Tabla from "./Tabla";

const confTabla = {
  alterna: true,
  oscura: false,
  indice: true,
  ver: true,
  eliminar: true,
  encabezado: ["Fecha", "Inicio", "Fin", "Solicitante"], //Títulos de tabla (Primera fila encabezado)
  campos: ["fecha", "horainicio", "horafin", "funcionario"], // Nombre de los cmapos del json
};

const obtenerItemTabla = (item) => {
  console.log("Item:", item);
};

const obtenerIdItemTabla = (id) => {
  console.log("ID de Item a eliminar:", id);
};

const filtrarPorMes = (idMes, array) => {
  let tmpArray = [];
  for (let index = 0; index < array.length; index++) {
    //extrae el mes del campo fecha:
    const mes = array[index].fecha.split("-")[1];
    console.log(mes);
    //compara el mes extraido del objeto y lo cmpara con el mes asignado en props
    if (parseInt(mes) === idMes) {
      //si se da la condición agrega en el arreglo tempora el objeto
      tmpArray.push(array[index]);
    }
  }
  return tmpArray;
};


const ordenarPorInicio =(array, propiedad )=> {    
  function compare(a, b) {
      if (a[propiedad] < b[propiedad]){
        return -1;
      }
      if (a[propiedad] > b[propiedad]){
        return 1;
      }
      return 0;
    }      
    return array.sort(compare);
}


export default function ContTabla(props) {
  console.log("idMes de sde ContTabla", props.idMes);
  console.log("reservas", props.reservas);
  const reservasFiltradas = filtrarPorMes(props.idMes, props.reservas);
  const reservasOrdenadas = ordenarPorInicio (reservasFiltradas, "inicio");

  return (
    <>
    <div className="row">
      <div className="col-12">
        <button
        className="btn btn-info"
        onClick={props.handleReservaciones}
        >Volver</button>
      </div>
    </div>
    <Tabla
      //Método para obtener el id del registro - se activa con el botón "eliminar" <<< Propiedad no requerida >>> :
      obtenerId={obtenerIdItemTabla}
      // Método para obtner todos los campos del registro - Se activa con el botón "ver" <<<Propiedad no requerida  >>>:
      obtenerItem={obtenerItemTabla}
      //Propiedades requeridas:
      conf={confTabla}
      array={reservasOrdenadas}
    />
    </>
  );
}
