import React, { useState, useEffect } from "react";

import { filtrarKey } from "gespro-utils/filtrar_array";

// Quitar comentarios en caso de enviar datos al servidor
import { sendData } from "gespro-utils/akiri";

import Calendario from "./Calendario/Calendario";
import GModal from "./Modal/GModal";
import Tabla from './Tabla/Tabla';
import horasInicio from "../data/horas-inicio.json";
import horasFin from "../data/horas-fin.json";
// import { logDOM } from "@testing-library/dom";
import referenciasJson from '../data/referencias.json';



// tamaño de fuente ---> T
// Dos tamaños s, m (medium, large)

var selectHoraInicio = null,
  selectHoraFinal = null,
  filtrofecha = null,
  ocupada = false,
  mensaje = "",
  horas = [
    "07:00",
    "07:30",
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "01:00",
    "01:30",
    "02:00",
    "02:30",
    "03:00",
    "03:30",
    "04:00"
  ];

const referencias = referenciasJson[0];


  //Configuraciones de calendario y de tabla
const confCalendario = {
  t: "m",
};

const confTabla = {
  alterna: true,
  oscura: false,
  indice: false,
  ver: false,
  eliminar: false,
  encabezado: ["Inicia", "Finaliza", "Responsable"], //Títulos de tabla (Primera fila encabezado)
  campos: ["inicio", "fin", "funcionario"]  // Nombre de los cmapos del json

};

//Objeto reserva con fecha, hora de inicio, etc para ser almacenados en BD
var reserva = null;


const obtenerIdMes = () => { };

export default function SalaReuniones(props) {
  const [show, setShow] = useState(false);
  const [activaHoraFinal, setActivaHoraFinal] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //Almacena array con objetos (registros) de dia seleccionado
  const [filtrados, setFiltrados] = useState(null);

  //Almacena array con objetos de los usuarios
  const [funcionarios, setFuncionarios] = useState(props.funcionarios);

  var SelectHoraInicio = null,
    SeletHoraFinal = null;

  // console.log("funcionarios",funcionarios);
  const obtenerFecha = (fecha) => {
    // console.log("data", props.data);
    filtrofecha = filtrarKey(props.data, "fecha", fecha.id);
    setFiltrados(filtrofecha);
    console.log("Filtrofecha", filtrofecha);
    handleShow();
    reserva = {
      fecha: fecha.id,
      inicio: "",
      fin: "",
      funcionario: "",
    };
  };

  const handleValidarReserva = () => {
    console.log("reserva", reserva);
    // console.log("filtrados.inicio", filtrados);
    const limite = filtrados.length;
    ocupada = false;
    mensaje = "";

    for (let index = 0; index < limite; index++) {

      //1- Validación si hora de inicio o la hora de fin de reserva del día están ya ocupados
      if (
        reserva.inicio === filtrados[index].inicio ||
        reserva.fin === filtrados[index].fin
      ) {
        ocupada = true;
        mensaje = "La sala está ocupada en ese horario ☠️"
      }

    }

    //2- IMPORTANTE: Falta validar si la hora de inicio y la hora final están en el tango de una reserva ya realizada
    /*
 por ejemplo: si hay una reserva de 8:00 - 10:00
 no debe permitir que se ingrese una reserva de 08:30 -09:30 por ejemlo
 Para ello considero parsear los campos "inicio" y "fin" a integger (parseInt) y ahcer una validación 
 para las horas de la tarde o en su defecto pasarlas a hora militar (por ejmplo 13 en lugar de 1 de la tarde )
*/
    let indiceInicio = horas.indexOf(reserva.inicio);
    let indiceFin = horas.indexOf(reserva.fin);
    if (indiceInicio >= indiceFin) {
      console.log("entré al if");
      ocupada = true;
      mensaje = "Revisar los rangos, porque no son correctos";
      // console.log(mensaje);
    }
    else {
      let array = filtrados;
      const limite = array.length;
      for (let index = 0; index < limite; index++) {
        let elementI = horas.indexOf(array[index].inicio);
        let elementF = horas.indexOf(array[index].fin);
        if (indiceInicio <= elementI && indiceFin <= elementI) {
          ocupada = false;
          // console.log("correcto antes", ocupada);
        }
        else
          if (indiceInicio >= elementF && indiceFin > elementF) {
            ocupada = false;
            // console.log("correcto DISPONIBLE después", ocupada);
          }
          else {
            ocupada = true;
            mensaje = "Revisar las horas, dado que algunas pueden ya estar reservadas"
            // console.log(mensaje, " ", ocupada);
            break;
          };
      };
    };
    if (ocupada) {
      alert(mensaje);
      //TODO: Utilizar alerrtify en lugar de alert
    } else {
      // alert("Reservación realizada de forma satisfactoria ✔️");
      // let url = agregareserva;
      // console.log("reserva", reserva);
      // senData(url, reserva)
      enviarDatos(reserva)
      //Quitar el comentario en import
    }
  };

  const enviarDatos = (reserva) => {
    let url = referencias.agregareserva;
console.log("data reserva", reserva);
    console.log("url", url);
    sendData(url, reserva)
      .then(respuesta => {
         console.log(respuesta);
        if (!respuesta.error) {
          // setShowModal(false);
          alert('Aviso', 'El registro ha sido agregado exitosamente');
          // alertify.alert('Aviso', 'El registro ha sido agregado exitosamente')
          //   .set('onok',
          //     function (closeEvent) {
          //       console.log("Actualizando la información...")
          //       // setCargado(false);
          //       // setShowModal(false);
          //       // setTimeout(() => {
          //       //   setup(function () {
          //       //     settingsTabla();
          //       //     regEditar = {};
          //       //   });
          //       // }, 1000);
          //     })
        }
        else {
          let msjServer;
          if (respuesta.error) {
            msjServer = respuesta.msj;
          }
          else {
            msjServer = "Problemas de conexión con la base de datos. Error 405"
          }
          alert("Error", msjServer);
          // alertify.alert("Error", msjServer);
        }
      })
}

const handleObtenerInicio = (e) => {
  reserva.inicio = e.target.value
};

const handleObtenerfin = (e) => {
  reserva.fin = e.target.value;
};

const handleObtenerFuncionario = (e) => {
  reserva.funcionario = e.target.value;
};

const validaRangoHoras = (hI, hF, array) => {
  console.log("reservaInicio", hI);
  console.log("reservaFinal", hF);
  const limite = array.length;
  var indiceInicio = horas.indexOf(hI);
  var indiceFin = horas.indexOf(hF);
  if (indiceInicio >= indiceFin) {
    ocupada = true;
    mensaje = "Revisar los rangos, porque no son correctos";
    console.log(mensaje);

  }
  else {
    for (let index = 0; index < limite; index++) {
      let elementI = horas.indexOf(array[index].inicio);
      let elementF = horas.indexOf(array[index].fin);
      if (indiceInicio <= elementI && indiceFin <= elementI)
        console.log("correcto antes")
      else
        if (indiceInicio >= elementF && indiceFin > elementF)
          console.log("correcto DISPONIBLE después")
        else
          console.log("incorrecto rango ya ocupados")
    };
  };
};

selectHoraInicio = (
  <>
    <div className="col-sm-6">
      <div className="input-group">
        <select
          onChange={handleObtenerInicio}
          className="form-control"
          id="horaInicio"
          defaultValue=""
        >
          <option value="" disabled>
            Selecciona la fecha inicial
        </option>
          {horasInicio.map((item, i) => (
            <option key={"inicio" + i}
              id={i}
              value={item}
            // disabled="false"
            >
              {item}
            </option>
          ))}
        </select>
      </div>
    </div>
  </>
);

selectHoraFinal = (
  <>
    <div className="col-sm-6">
      <div className="input-group">
        <select
          onChange={handleObtenerfin}
          className="form-control Disabled"
          id="horaInicio"
          defaultValue=""
        >
          <option value="" disabled>
            {" "}Selecciona la fecha final{" "}
          </option>
          {horasFin.map((item, i) => (
            <option
              key={"inicio" + i}
              id={i}
              value={item}
            >
              {item}
            </option>
          ))}
        </select>
      </div>
    </div>
  </>
);

return (
  <>
    <div className="row">
      <div className="col-6">
        <Calendario
          obtenerIdMes={obtenerIdMes}
          obtenerFecha={obtenerFecha}
          conf={confCalendario}
        />
      </div>
    </div>

    <GModal
      show={show}
      handleClose={handleClose}
      title="Reserva de sala"
      footer=""
    >
      <div className="row">
        <div className="col-sm-12">
          <Tabla conf={confTabla} array={filtrados} />
        </div>
      </div>
      <hr />
      <div className="row">
        {selectHoraInicio}
        {selectHoraFinal}

      </div>
      <div className="row">
        <div className="col-sm-12 mt-3">

          <input
            className="form-control"
            placeholder="Nombre del funcionario"
            onChange={handleObtenerFuncionario}
            type="text"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12 mt-3">
          <button
            onClick={handleValidarReserva}
            className="btn btn-outline-info btn-block"
          >
            Guardar
            </button>
        </div>
      </div>
    </GModal>
  </>
);
}
