import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import obtener from '../modulos/obtener';
import OpcionesFin from './OpcionesFin';

import { eliminar } from "gespro-utils/crud_array";

import inputs from "./Form/data/inputs-actualiza.json";
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
  oin = [],
  ofi = [];


export default function FormReservacion(props) {
  oin = props.selectInicio;
  ofi = props.selectFin;
    let valoresDefault = props.valoresDefault;
   
   const[ optsInicio, setOptsInicio] = useState(props.selectInicio)
   const[ optsFin, setOptsFin] = useState(props.selectFin);
   const[ muestraSelects, setMuestraSelects] = useState(true);

  console.log("valores default", valoresDefault);


  console.log("array Valores default", valoresDefault.fecha);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: valoresDefault,
  });

  const valueOfTest = watch('fecha');

  

  useEffect(() => {
    //consider this to be onchange function
    setMuestraSelects(false);
    getDataFecha(valueOfTest);
  }, [valueOfTest]);


  const onSubmit = (data) => {
    props.getDataForm(data);
  };

  const getDataFecha = (fecha) => {
    if (fecha !== valoresDefault.fecha) {
      console.log("entré condicion fecha diferente");
      let consulta = referencias.obtenerfechasreserva + "?fecha='" + fecha + "'";
      console.log("consulta", consulta);
      obtener(consulta, function (datos) {
        console.log("registro con fecha", datos);
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



        console.log("Datos con la fecha", datos);

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

          (posIhf === -1) && (posIhf = horasInicio.length);
          (posFhi === -1) && (posFhi = 1)
          for (let index = posIhi; index < posIhf; index++) {
            objHorasInicio[index].disabled = true;
          };
          for (let index = posFhi + 1; index <= posFhf; index++) {
            objHorasFin[index].disabled = true;
          };
        };
        console.log("objHorasInicio", objHorasInicio);
        console.log("objHorasFin", objHorasFin);
        setOptsInicio(objHorasInicio);
        setOptsFin(objHorasFin);
        oin = objHorasInicio;
        ofi = objHorasFin;
        setMuestraSelects(true);

        // arrayInputs[1].opts = selectInicio;
        // arrayInputs[2].opts = selectFin;
      })
    }
  };

  const msjError = "Item requerido";

  const handleInputChange = (e) => {
    // alert("hola")
    console.log("e.target", e.target);
    // {item.id === "fecha" && console.log("item tipo fecha")}
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">Fecha</span>
        </div>
        <input className="form-control input-ingreso" type="date" placeholder="Fecha" {...register("fecha", { required: true })}/>
        {errors.fecha && <span className="item-required">*</span>}
      </div>
    { muestraSelects
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
                {...register("inicio", { required: true, })}
              >
                <option value="">Seleccione una opción</option>
                {/* {optsInicio.map((opt) => ( */}
                  {oin.map((opt) => (
                  <option key={"opt" + opt.value} value={opt.value} disabled={opt.disabled}>
                    {opt.text}
                  </option>
                ))}
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
                <OpcionesFin inicio = {optsFin}/>
                {/* <option value="">Seleccione una opción</option> */}
                {/* {optsFin.map((opt) => ( */}
                  {/* {ofi.map((opt) => (
                  <option key={"opt" + opt.value} value={opt.value} disabled={opt.disabled}>
                    {opt.text}
                  </option>
                ))} */}
              </select>
            </div>
          </div>
        </div>
      </div>
      : <div className="row"><p>Cargando datos</p></div>
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




  // return <Form getDataForm={getDataForm} array={arrayInputs} valoresDefault={valoresDefault} />
};
