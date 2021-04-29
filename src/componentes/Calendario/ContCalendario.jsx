import Calendario from './Calendario';


// tamaño de fuente ---> T
// Dos tamaños s, m (medium, large)
const confCalendario= {
    t: "m"
  }

// const obtenerFecha=(fecha)=> {
//     console.log("fecha seleccionada:", fecha);
//     props.obtenerFecha(fecha);
// }

export default function ContCalendario (props) {

    const obtenerIdMes=(idMes)=> {
        //console.log(idMes);
        props.obtenerIdMes(idMes);
    }


    return (
        <div className="row">
            <div className="col-12">
                <Calendario obtenerIdMes={obtenerIdMes} obtenerFecha={props.obtenerFecha} conf={confCalendario} />
            </div>
        </div>
    )
    
}