import React, { useState, useEffect, useRef, useContext } from "react";
import { useForm } from 'react-hook-form';
import ContTabla from "./Tabla/ContTabla";
import SalaReuniones from "./SalaReuniones";
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
    arrayDatos = null, 
    registro = {    };

let idMes;

export default function Reservaciones() {

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearError,
    reset
  } = useForm();

  const onSubmit = (data, e) => {
   alert(JSON.stringify(data));
   e.target.reset();
    // reserva = data;
    // formulario = e.target;
    // handleValidarReserva(e);
  };


    //Estados para la navegación
    const [vistaMes, setVistaMes] = useState(null); 
    const { usuario, setUsuario } = useContext(MyContext);
    const [cargado, setCargado] = useState(false);
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

  const handleMes = ()=> {
    setVistaMes(true);
  } 

useEffect(() => {
  obtener(consulta, function (datos) {
    arrayDatos = datos;
    setCargado(true);
    // console.log("data", arrayDatos);
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
      console.log("data", data);
    })
  }, [vistaMes]);

  const editarRegistro = (itemEditar) => {
    console.log("Item editar", itemEditar);
    registro = {};
    console.log("registro ANTES", registro);
    registro = itemEditar;
    console.log("registro.telefono",registro.telefono);
    handleShow();
    console.log("registro", registro);

  }

  const JsxFormModal = () => {
    return (
      <>
        <form onSubmit={handleSubmit(onSubmit)}>
        {/* <div className="row">
            <div className="col-sm-3 offset-sm-9 float-right mb-3">
              <input className="btn btn-outline-info btn-block" type="reset" />
            </div>
          </div> */}
          <div className="row">
            <div className="col-sm-6">
              <div className="input-group">
                <select
                  className="form-control"
                  {...register("inicio")}
                  defaultValue={registro.inicio}
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
                  defaultValue={registro.fin}
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
              <input className="form-control" placeholder="Nombre del funcionario" {...register("nombre", { required: true })}  defaultValue={registro.nombre} />
              {errors.nombre && "Este campo es requerido"}
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 mt-3">
              <input className="form-control" placeholder="Correo del funcionario" {...register("correo", { required: true })}  defaultValue={registro.correo}/>
              {errors.correo && "Este campo es requerido"}

            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 mt-3">
              <input className="form-control" placeholder="Dirección o departamento" {...register("instancia", { required: true })} defaultValue={registro.instancia}/>
              {errors.instancia && "Este campo es requerido"}

            </div>
          </div>

          <div className="row">
            <div className="col-sm-12 mt-3">
              <input className="form-control" placeholder="Asunto" {...register("asunto", { required: true })} defaultValue={registro.asunto}/>
              {errors.asunto && "Este campo es requerido"}

            </div>
          </div>

          <div className="row">
            <div className="col-sm-6 mt-3">
              <input className="form-control" placeholder="Teléfono" {...register("telefono", { required: true })} defaultValue={registro.telefono} />
              {errors.telefono && "Este campo es requerido"}
            </div>
            <div className="col-sm-6 mt-3">
              <input className="form-control" type="number" placeholder="Cantidad de asistentes" {...register("cantidad", { required: true })} defaultValue={registro.cantidad}/>
              {errors.cantidad && "Este campo es requerido y debe ser numérico"}
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 mt-3">
              <input className="btn btn-outline-info btn-block" value="Actualizar" type="submit"/>
            </div>
          </div>
        </form>
      </>
    );
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
            arrayDatos = datos;
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
      ?<ContTabla array={data} idMes={idMes}  handleReservaciones={handleReservaciones} obtenerIdItem={eliminarRegistro} obtenerItem={editarRegistro} />
      : <p>Actualizando datos </p>
    
  ) : (
    <SalaReuniones handleMes={handleMes} obtenerIdMes={obtenerIdMes} eliminarElemento={eliminarRegistro}/>
  )
}
  <GModal
        show={show}
        // size="lg"
        handleClose={handleClose}
        title="Reserva de sala"
        footer=""
      >
        {JsxFormModal()}
  </GModal>

 </React.Fragment>
   )
}