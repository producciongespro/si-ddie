import React, { useState, useEffect, useRef, useContext } from "react";
import { useForm } from 'react-hook-form';
import ContTabla from "./Tabla/ContTabla";
// import ContForm from "./Form/ContForm";
import SalaReuniones from "./SalaReuniones";
import FormReservacion from "./FormReservacion";
import GModal from "./Modal/GModal";

import MyContext from '../modulos/MyContext';

import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.min.css';
import 'alertifyjs/build/css/themes/default.min.css';

import obtener from '../modulos/obtener';
import { sendData } from 'gespro-utils/akiri';

import referenciasJson from '../data/referencias.json';
import horasInicio from "../data/horas-inicio.json";
import horasFin from "../data/horas-fin.json";

const referencias = referenciasJson[0];

var consulta = referencias.consultareserva,
  valoresDefault= {},
  registro = {},
  jsxFormModal = null,
  horas = ["06:30","07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00"];

let idMes;

export default function Reservaciones() {

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearError,
    reset
    // } = useForm();
  } = useForm();


  const onSubmit = (data, e) => {
    alert(JSON.stringify(data));
    e.target.reset();
  };

    //Estados para la navegación
  const [vistaMes, setVistaMes] = useState(null);
  const { usuario, setUsuario } = useContext(MyContext);
  const [cargado, setCargado] = useState(false);
  const [actualizado, setActualizado] = useState(false);
  const [data, setData] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const obtenerIdMes = (mes) => {
    idMes = mes;
    // console.log("idMes", idMes);
  };

  const handleReservaciones = () => {
    setVistaMes(false);
  };

  const handleMes = () => {
    setVistaMes(true);
  }

  useEffect(() => {
    obtener(consulta, function (datos) {
      setCargado(true);
    })
  }, []);

  // useEffect(() => {
  //   obtener(consulta, function (datos) {
  //     setData(datos);
  //   })
  // }, [cargado]);

  useEffect(() => {
    // console.log("vistaMes", vistaMes);
    obtener(consulta, function (datos) {
      setData(datos);
      // console.log("data", data);
      // console.log("propiedades",Object.keys(datos[0])); 
    })
  }, [vistaMes]);

/*
  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ something: '' });
    }
  }, [formState, submittedData, reset]);
  */

  const editarRegistro = (itemEditar) => {
    setActualizado(false);
    // console.log("Item editar", itemEditar);
    registro =  itemEditar;
    console.log("horainicio",registro.horainicio, "horafin",registro.horafin);
    let hi =  registro.horainicio.slice(0, 5);
    let hf = registro.horafin.slice(0, 5);
    console.log("pos horainicio",horasInicio.indexOf(hi),"horas fin pos", horasFin.indexOf(hf));
    // var mydate = new Date(registro.fecha);
    // console.log(mydate.toDateString());
    //  registro.fecha = mydate;
     registro.inicio = horasInicio.indexOf(hi);
     registro.fin = horasFin.indexOf(hf);
     valoresDefault = {
            nombre:registro.nombre,
            asunto:registro.asunto,
            inicio:registro.inicio,
            fin:registro.fin,
            fecha: registro.fecha,     
            correo: registro.correo,
            asunto:registro.asunto ,
            telefono:registro.telefono,
            cantidad:registro.cantidad,
            instancia: registro.instancia
      }

      // validar que la fecha y hora estén disponbiles

      // console.log("registro a enviarse", registro, registro.fin, registro.inicio);
    setActualizado(true);
    handleShow();
  }

  const getDataForm =  (data) => {
//      data.id = registro.id;
//      data.fecha = fecha
//  idUsuario 

console.log("Datos a enviar al servidor", data); 
    
    // handleClose();
  };

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
          obtener(consulta, function (datos) {
            setData(datos);
            setCargado(true);
          });
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


  return (
    <React.Fragment>
      {vistaMes ? (
        cargado
          ? <ContTabla array={data} idMes={idMes} handleReservaciones={handleReservaciones} obtenerIdItem={eliminarRegistro} obtenerItem={editarRegistro} />
          : <p>Actualizando datos </p>

      ) : (
        <SalaReuniones handleMes={handleMes} obtenerIdMes={obtenerIdMes} eliminarElemento={eliminarRegistro} />
      )
      }
      <GModal
        show={show}
        // size="lg"
        handleClose={handleClose}
        title="Reserva de sala"
        footer=""
      >
       {actualizado
        ? <FormReservacion valoresDefault = {valoresDefault} getDataForm={getDataForm} />       
        : <h1>Actualizando datos...</h1>
      }
      </GModal>

    </React.Fragment>
  )
}