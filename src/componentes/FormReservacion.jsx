import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import obtener from '../modulos/obtener';
import Opciones from './Opciones';

import referenciasJson from '../data/referencias.json';
import horasInicio from "../data/horas-inicio.json";
import horasFin from "../data/horas-fin.json";

const referencias = referenciasJson[0];

const getDataForm = (data) => {
  console.log("Datos a enviar al servidor", data);
};

var
  objHorasInicio = [],
  objHorasFin = [],
  defaultInicio = "",
  defaultFin = ""
//  const[ defaultFin;


export default function FormReservacion(props) {
  var valoresDefault = props.valoresDefault,
    registro = props.valoresDefault,
    fechaDefault = valoresDefault.fecha.split("-").reverse().join("/");

  // console.log("valores Default", registro);
  // console.log("fecha con split",fechaDefault);

  const [cambiaFecha, setCambiaFecha] = useState(false);
  const [optsInicio, setOptsInicio] = useState(props.selectInicio)
  const [optsFin, setOptsFin] = useState(props.selectFin);
  const [muestraSelects, setMuestraSelects] = useState(true);
  defaultInicio = registro.inicio;
  defaultFin = registro.fin;


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nombre: registro.nombre,
      asunto: registro.asunto,
      inicio: defaultInicio,
      fin: defaultFin,
      fecha: registro.fecha,
      correo: registro.correo,
      asunto: registro.asunto,
      telefono: registro.telefono,
      cantidad: registro.cantidad,
      instancia: registro.instancia
    }
  });

  const valueOfTest = watch('fecha');


  useEffect(() => {
    setMuestraSelects(true);
    getDataFecha(valueOfTest);
  }, [valueOfTest]);


  const onSubmit = (data) => {
    let enviarDatos = true;
    // const horasVC = ["07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00"];
    // const indiceInicio = horasVC.indexOf(optsInicio[data.inicio]),
    // indiceFin = horas.indexOf(reserva.fin);
    // console.log(JSON.stringify(data));
    // console.log("optsFin", optsFin[data.fin].disabled);
    if (data.fin < data.inicio){
      alert("La hora final es mayor que inicial, por favor revisar");
      enviarDatos = false
    }
    if (optsFin[data.fin].disabled || optsInicio[data.inicio].disabled) {
        optsInicio[data.inicio].disabled && alert("Revisar la hora de inicio porque no está disponible");
        optsFin[data.fin].disabled && alert("Revisar la hora final porque no está disponible");
        (optsFin[data.fin].disabled && optsInicio[data.inicio].disabled) && alert("Revisar las horas, porque no están disponibles");
        enviarDatos = false;

    }
    enviarDatos && props.getDataForm(data);
  };

  const getDataFecha = (fecha) => {
 
    // console.log("inicio", defaultInicio);
    if (fecha !== valoresDefault.fecha) {
      setMuestraSelects(false)
      // console.log("entré condicion fecha diferente");
      let consulta = referencias.obtenerfechasreserva + "?fecha='" + fecha + "'";
      // console.log("consulta", consulta);
      obtener(consulta, function (datos) {
        // console.log("registro con fecha", datos);
        for (let index = 0; index < horasInicio.length; index++) {
          const element1 = horasInicio[index],
            element2 = horasFin[index];
          let indice = index.toString();
          objHorasInicio[index] =
          {
            text: element1,
            value: indice,
            disabled: false
          };
          objHorasFin[index] =
          {
            text: element2,
            value: indice,
            disabled: false
          }
        };
        // console.log("Datos con la fecha", datos);

        let array = datos;
        // console.log("array filtrado por fecha", array);
        for (let index = 0; index < array.length; index++) {
          const element = array[index];
          let hi = element.horainicio.slice(0, 5),
            hf = element.horafin.slice(0, 5),
            posIhi = horasInicio.indexOf(hi),
            posIhf = horasInicio.indexOf(hf),
            posFhi = horasFin.indexOf(hi),
            posFhf = horasFin.indexOf(hf);
          
          // Construcción objeto para select Horas Inicio
          (posIhf === -1) && (posIhf = horasInicio.length - 1); //si hora final es -1 entonces es 4 y debe colocarse en última posición
          if (posIhi === posIhf)
            objHorasInicio[posIhi].disabled = true
          else
            for (let index = posIhi; index < posIhf; index++) {
              console.log("index horas inicio", index);
              objHorasInicio[index].disabled = true;
            };
          
          // Construcción objeto  para select Horas Fin
          (posFhi === -1) && (posFhi = 0)
          if (posFhf === posFhi + 1)
            objHorasFin[posFhf].disabled = true
          else
            for (let index = posFhi + 1; index <= posFhf; index++) {
              objHorasFin[index].disabled = true;
            };
        };
        // console.log("objHorasInicio", objHorasInicio);
        // console.log("objHorasFin", objHorasFin);
        setOptsInicio(objHorasInicio);
        setOptsFin(objHorasFin);
        setMuestraSelects(true);
      })
    }
  };

  const msjError = "Item requerido";

  const handlerEventClick = (e) => { setCambiaFecha(true) }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {
        cambiaFecha === false
          ?
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Fecha: {fechaDefault}   </span> <button onClick={handlerEventClick}>Cambiar fecha</button>
            </div>
          </div>
          :
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Fecha</span>
            </div>
            <input className="form-control" type="date" placeholder="Fecha" {...register("fecha", { required: true })} />
            {errors.fecha && <span className="item-required">*</span>}
          </div>
      }
      {
        muestraSelects === true
          ?
          <div className="row">
            <div className="col-6">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Hora inicio</span>
                  </div>
                  <select
                    className="custom-select"
                    {...register("inicio", { required: true })}
                  >
                    <Opciones opciones={optsInicio} />
                  </select>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Hora Fin</span>
                  </div>
                  <select
                    className="custom-select"
                    {...register("fin", { required: true, })}
                  >
                    <Opciones opciones={optsFin} />
                  </select>
                </div>
              </div>
            </div>
          </div>
          : <div className="row"><p>Cargando</p></div>
      }

      <div className="row">
        <div className="col-sm-12 mt-3">
          <div className="input-group mb-3 input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">Nombre</span>
            </div>
            <input className="form-control" placeholder="Nombre del funcionario" {...register("nombre", { required: true })} />
            {errors.nombre && "Este campo es requerido"}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12 mt-3">
          <div className="input-group mb-3 input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">Correo</span>
            </div>
            <input className="form-control" placeholder="Correo del funcionario" {...register("correo", { required: true })} />
            {errors.correo && "Este campo es requerido"}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12 mt-3">
          <div className="input-group mb-3 input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">Instancia</span>
            </div>
            <input className="form-control" placeholder="Dirección o departamento" {...register("instancia", { required: true })} />
            {errors.instancia && "Este campo es requerido"}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 mt-3">
          <div className="input-group mb-3 input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">Asunto</span>
            </div>
            <input className="form-control" placeholder="Asunto" {...register("asunto", { required: true })} />
            {errors.asunto && "Este campo es requerido"}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-6 mt-3">
          <div className="input-group mb-3 input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">Teléfono</span>
            </div>
            <input className="form-control" placeholder="Teléfono" {...register("telefono", { required: true })} />
            {errors.telefono && "Este campo es requerido"}
          </div>
        </div>
        <div className="col-6 mt-3">
          <div className="input-group mb-3 input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">Cantidad</span>
            </div>
            <input className="form-control" type="number" placeholder="Cantidad de asistentes" {...register("cantidad", { required: true })} />
            {errors.cantidad && "Este campo es requerido y debe ser numérico"}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12 mt-3">
          <input className="btn btn-outline-info btn-block" type="submit" />
        </div>
      </div>
    </form>
  );
};
