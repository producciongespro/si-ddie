import React, { useState, useEffect, useRef, useContext } from "react";
import { useForm } from 'react-hook-form';

import MyContext from '../modulos/MyContext';

import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.min.css';
import 'alertifyjs/build/css/themes/default.min.css';

import ContCalendario from "./Calendario/ContCalendario";

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
  formulario = null,
  horas = ["07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00"],
  horasVC = ["07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00"];

const referencias = referenciasJson[0];


const confTabla = {
  alterna: true,
  oscura: false,
  indice: false,
  ver: false,
  eliminar: true,
  encabezado: ["Inicia", "Finaliza", "Solicitante", "Direccion/Depto"], //Títulos de tabla (Primera fila encabezado)
  campos: ["horainicio", "horafin", "nombre", "instancia"]  // Nombre de los cmapos del json
};

//Objeto reserva con fecha, hora de inicio, etc para ser almacenados en BD
var reserva = null;


// const obtenerIdMes = () => { };

export default function SalaReuniones(props) {

  const { usuario, setUsuario } = useContext(MyContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearError,
    reset
  } = useForm();

  const onSubmit = (data, e) => {
    // alert(JSON.stringify(data));
    reserva = data;
    formulario = e.target;
    handleValidarReserva(e);
  };


  // console.log("usuario", usuario.idUsuario);
  // console.log("correo", usuario.correo);

  const [show, setShow] = useState(false);
  const [verMensual, setVerMensual] = useState(false);
  // const [activaHoraFinal, setActivaHoraFinal] = useState(false);
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
    SeletHoraFinal = null,
    jsxFormModal = null;



  useEffect(() => {
    obtener(consulta, function (datos) {
      setData(datos);
      setCargado(true);
    })
  }, []);

  const eliminarRegistro = (idBorrar) => {
    // console.log("Id del elemento a borrar", idBorrar);
    let url = referencias.cambiaBorradoReserva;
    let regEliminar = {
      id_usuario: usuario.idUsuario,
      id_registro: idBorrar,
      valor_borrado: 1
    }
    // console.log("registro", regEliminar);
    // console.log("url", url);

    sendData(url, regEliminar)
      .then(respuesta => {
        // console.log("respuesta.error", respuesta.error);
        if (!respuesta.error) {
          // console.log("entré if");
          alertify.alert('Aviso', 'El registro ha sido eliminado exitosamente');
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
  };

  const obtenerFecha = (fecha) => {
    // console.log("fecha", fecha);
    fechaseleccionada = fecha;
    // console.log("fechaseleccionada",fechaseleccionada);
    filtrofecha = filtrarKey(data, "fecha", fecha.id);
    // console.log("filtrofecha largo", filtrofecha.length);
    for (let index = 0; index < filtrofecha.length; index++) {
      // eliminar milisegundos de los campos alias de 12 horas, tipo time  08:30:00 a 08:30
      const element1 = filtrofecha[index].horainicio;
      const element2 = filtrofecha[index].horafin;
      let cadena1 = element1.slice(0, 5);
      let cadena2 = element2.slice(0, 5);
      filtrofecha[index].horainicio = cadena1;
      filtrofecha[index].horafin = cadena2;
    }

    setFiltrados(filtrofecha);
    setCargado(true);
    handleShow();
    reserva = {};
    reserva.fecha = fecha.id;
    // reserva = {
    //   fecha: fecha.id,
    //   inicio: "",
    //   fin: "",
    //   correo: "",
    //   asunto: "",
    //   instancia: "",
    //   nombre: "",
    //   cantidad: "",
    //   nombre: "",
    //   telefono: "",
    //   idUsuario: usuario.idUsuario
    // };
  };

  const handleValidarReserva = (e) => {
    // toma la posición en horas del valor de reserva inicio y fin
    // para trabajar con la posición y no con el valor
    const indiceInicio = horas.indexOf(reserva.inicio),
      indiceFin = horas.indexOf(reserva.fin);

    ocupada = false;
    mensaje = "";

    // revisa que el hora final no sea menor que el inicio
    if (indiceInicio >= indiceFin) {
      ocupada = true;
      mensaje = "Revisar los rangos, porque no son correctos";
    }
    else {
      const limite = filtrados.length;
      for (let index = 0; index < limite; index++) {
        const elementI = horas.indexOf(filtrados[index].horainicio),
          elementF = horas.indexOf(filtrados[index].horafin);

        if (reserva.inicio === filtrados[index].horainicio || reserva.fin === filtrados[index].horafin) {
          ocupada = true;
          mensaje = "La sala está ocupada en ese horario ☠️";
          break;
        }

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
      alertify.alert("⚠ Aviso", mensaje);
    } else {
      enviarDatos(reserva);
      e.target.reset();
    }
  };

  const enviarDatos = (reserva) => {
    let url = referencias.agregareserva;

    // reserva
    // console.log("url", url);

    // reserva.fecha = fecha.id;
    reserva.idUsuario = usuario.idUsuario;

    let hora = reserva.inicio;
    let indice = horas.indexOf(hora);
    reserva.inicio = horasVC[indice];
    // console.log("De 24 inicio:",horasVC[indice]);
    hora = reserva.fin;
    indice = horas.indexOf(hora);
    reserva.fin = horasVC[indice];
    // reserva.fin = "hola";

    reserva.fecha = fechaseleccionada.id;
    reserva.idUsuario = usuario.idUsuario;
    console.log("data reserva", reserva);

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
      // console.log("datas", datas, "fechaseleccionada", fechaseleccionada.id);
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
    });
  }


  const handlerVistaMensual = (e) => {
    setVerMensual(!verMensual);
  };

  jsxFormModal = (
    <>
      <div className="row">
        <div className="col-sm-12">
          {cargado
            ? <Tabla conf={confTabla} array={filtrados} obtenerId={eliminarRegistro} />
            : <p>Actualizando datos </p>
          }
        </div>
      </div>
      <hr />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-sm-3 offset-sm-9 float-right mb-3">
            <input className="btn btn-outline-info btn-block" type="reset" />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <div className="input-group">
              <select
                className="form-control"
                {...register("inicio")}
                defaultValue=""
              >
                <option value="" disabled>
                  Selecciona la hora inicial
                  </option>
                {horasInicio.map((item, i) => (
                  <option key={"inicio" + i}
                    id={i}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="input-group">
              <select
                className="form-control"
                {...register("fin")}
                defaultValue=""
              >
                <option value="" disabled>
                  {" "}Selecciona la hora final{" "}
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
        </div>
        <div className="row">
          <div className="col-sm-12 mt-3">
            <input className="form-control" placeholder="Nombre del funcionario" {...register("nombre", { required: true })} />
            {errors.nombre && "Este campo es requerido"}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 mt-3">
            <input className="form-control" placeholder="Correo del funcionario" {...register("correo", { required: true })} />
            {errors.correo && "Este campo es requerido"}

          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 mt-3">
            <input className="form-control" placeholder="Dirección o departamento" {...register("instancia", { required: true })} />
            {errors.instancia && "Este campo es requerido"}

          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 mt-3">
            <input className="form-control" placeholder="Asunto" {...register("asunto", { required: true })} />
            {errors.asunto && "Este campo es requerido"}

          </div>
        </div>

        <div className="row">
          <div className="col-sm-6 mt-3">
            <input className="form-control" placeholder="Teléfono" {...register("telefono", { required: true })} />
            {errors.telefono && "Este campo es requerido"}
          </div>
          <div className="col-sm-6 mt-3">
            <input className="form-control" type="number" placeholder="Cantidad de asistentes" {...register("cantidad", { required: true })} />
            {errors.cantidad && "Este campo es requerido y debe ser numérico"}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 mt-3">
            <input className="btn btn-outline-info btn-block" type="submit" />
          </div>
        </div>
      </form>
    </>
  );

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <button className="btn btn-info" onClick={props.handleMes}>
              Reservas por mes
          </button>
          </div>
        </div>
      </div>
      <ContCalendario
        obtenerIdMes={props.obtenerIdMes}
        volverCalendario={props.volverCalendario}
        obtenerFecha={obtenerFecha}
      />

      <GModal
        show={show}
        // size="lg"
        handleClose={handleClose}
        title="Reserva de sala"
        footer=""
      >
        {jsxFormModal && jsxFormModal}
      </GModal>
    </>
  );
}
