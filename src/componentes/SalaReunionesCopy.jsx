import React, { useState, useEffect, useRef } from "react";
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.min.css';
import 'alertifyjs/build/css/themes/default.min.css';

import Calendario from "./Calendario/Calendario";
import GModal from "./Modal/GModal";
import Tabla from './Tabla/Tabla';
import obtener from '../modulos/obtener';

import { filtrarKey } from "gespro-utils/filtrar_array";
import { sendData } from 'gespro-utils/akiri';


import horasInicio from "../data/horas-inicio.json";
import horasFin from "../data/horas-fin.json";

import referenciasJson from '../data/referencias.json';

// tamaño de fuente ---> T
// Dos tamaños s, m (medium, large)

var selectHoraInicio = null,
  selectHoraFinal = null,
  fechaseleccionada = null,
  filtrofecha = null,
  ocupada = false,
  mensaje = "",
  datos = null,
  horas = ["07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00"],
  horasVC = ["07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00"];

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
  campos: ["horainicio", "horafin", "funcionario"]  // Nombre de los cmapos del json
};

//Objeto reserva con fecha, hora de inicio, etc para ser almacenados en BD
var reserva = null;


const obtenerIdMes = () => { };

export default function SalaReuniones(props) {
  const [show, setShow] = useState(false);
  const [activaHoraFinal, setActivaHoraFinal] = useState(false);
  const [data, setData] = useState(null);
  const [cargado, setCargado] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Almacena array con objetos (registros) de dia seleccionado
  const [filtrados, setFiltrados] = useState(null);

  const refHoraInicio = useRef(null);
  const refHoraFinal = useRef(null);
  const refFuncionario = useRef(null);

  var consulta = referencias.consultareserva,
    SelectHoraInicio = null,
    SeletHoraFinal = null;



  useEffect(() => {
    obtener(consulta, function (datos) {
      setData(datos);
      setCargado(true);
    })
  }, []);


  const obtenerFecha = (fecha) => {
    // console.log("data", data);
    fechaseleccionada = fecha;
    filtrofecha = filtrarKey(data, "fecha", fecha.id);
    for (let index = 0; index < filtrofecha.length; index++) {
      // eliminar milisegundos de los campos alias de 12 horas, tipo time  08:30:00 a 08:30
      const element1 = filtrofecha[index].horainicio;
      const element2 = filtrofecha[index].horafin;
      let cadena1 = element1.slice(0, 5);
      let cadena2 = element2.slice(0, 5);
      filtrofecha[index].horainicio = cadena1;
      filtrofecha[index].horafin = cadena2;        
    }
    
    console.log("filtrado", filtrofecha);

    setFiltrados(filtrofecha);
    setCargado(true);
    handleShow();
    reserva = {
      fecha: fecha.id,
      inicio: "",
      fin: "",
      funcionario: "",
    };
  };

  const handleValidarReserva = () => {
    const limite = filtrados.length;
    ocupada = false;
    mensaje = "";
    console.log("reserva", reserva);
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

    let indiceInicio = horas.indexOf(reserva.inicio);
    let indiceFin = horas.indexOf(reserva.fin);
    if (indiceInicio >= indiceFin) {
      ocupada = true;
      mensaje = "Revisar los rangos, porque no son correctos";
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
      enviarDatos(reserva)
    }
  };

  const enviarDatos = (reserva) => {
    let url = referencias.agregareserva;
    // console.log("data reserva", reserva);
    // reserva
    // console.log("url", url);
    let hora = reserva.inicio;
    let indice = horas.indexOf(hora);
    reserva.inicio = horasVC[indice];
    // console.log("De 24 inicio:",horasVC[indice]);
    hora = reserva.fin;
    indice = horas.indexOf(hora);
    reserva.fin = horasVC[indice];
    // console.log("De 24 final:",horasVC[indice]);
    
    sendData(url, reserva)
      .then(respuesta => {
        // console.log(respuesta);
        if (!respuesta.error) {
          alertify.alert('Aviso', 'El registro ha sido agregado exitosamente');
          setCargado(false);
          actualizaDatos();
        }
        else {
          let msjServer;
          if (respuesta.error) {
            msjServer = respuesta.msj;
          }
          else {
            msjServer = "Problemas de conexión con la base de datos. Error 405"
          }
          alertify.alert("Error", msjServer);
        }
      })
  }

  const actualizaDatos = () => {
    obtener(consulta, function (datas) {
      setData(datas);
      filtrofecha = filtrarKey(datas, "fecha", fechaseleccionada.id);
      for (let index = 0; index < filtrofecha.length; index++) {
        // eliminar milisegundos del campo time
        const element1 = filtrofecha[index].horainicio;
        const element2 = filtrofecha[index].horafin;
        let cadena1 = element1.slice(0, 5);
        let cadena2 = element2.slice(0, 5);
        filtrofecha[index].horainicio = cadena1;
        filtrofecha[index].horafin = cadena2;        
      }
      // console.log("filtrofecha", filtrofecha);
      setFiltrados(filtrofecha);
      setCargado(true);
      if (refHoraInicio.current) {
        refHoraInicio.current.value = "";
      }
      if (refHoraFinal.current) {
        refHoraFinal.current.value = "";
      }
      if (refFuncionario.current) {
        refFuncionario.current.value = "";
      }
    });
  }

  const handleObtenerInicio = (e) => {
    reserva.inicio = e.target.value;
  };

  const handleObtenerfin = (e) => {
    reserva.fin = e.target.value;
  };

  const handleObtenerFuncionario = (e) => {
    reserva.funcionario = e.target.value;
  };

  selectHoraInicio = (
    <>
      <div className="col-sm-6">
        <div className="input-group">
          <select
            onChange={handleObtenerInicio}
            className="form-control"
            id="horaInicio"
            ref={refHoraInicio}
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
            ref={refHoraFinal}
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
     <Calendario
          obtenerIdMes={obtenerIdMes}
          obtenerFecha={obtenerFecha}
          conf={confCalendario}
        />
      <GModal
        show={show}
        handleClose={handleClose}
        title="Reserva de sala"
        footer=""
      >
        <div className="row">
          <div className="col-sm-12">
            {cargado
              ? <Tabla conf={confTabla} array={filtrados} />
              : <p>Actualizando datos </p>
            }
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
              ref={refFuncionario}
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
