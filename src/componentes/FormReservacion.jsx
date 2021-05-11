import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import obtener from '../modulos/obtener';

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
  // arrayInputs = [],
  objHorasInicio = [],
  objHorasFin = [];


export default function FormReservacion(props) {
  let optsInicio = props.selectInicio,
    optsFin = props.selectFin,
    valoresDefault = props.valoresDefault;
  // const[ selectInicio, setSelectInicio] = useState(selectI);
  // const[ selectFin, setSelectFin] = useState(selectF);
  // const[ muestraInicio, setMuestraInicio] = useState(true);

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

  const JsxInput = (item, key) => {
    return (
      <div className="form-group" key={key}>
        <label
          className={`item-negrilla ${errors[item.id] && "item-error"}`}
          htmlFor={item.id}
        >
          {item.required && <span className="item-required">*</span>}
          {item.label}
        </label>
        <input
          // onInput={item.type === "range" ? handleGetValue : undefined}
          type={item.type}
          className="form-control"
          id={item.id}
          name={item.id}
          placeholder={item.placeholder}
          maxLength={item.maxLength}
          disabled={item.disabled}
          min={item.min}
          max={item.max}
          step={item.step}
          defaultValue={item.defaultValue && item.defaultValue}
          {...register(item.id, {
            required: item.required,
            maxLength: item.max
          })}
        />
      </div>
    );
  };

  const JsxInputFecha = (item, key) => {
    return (
      <div className="form-group" key={key}>
        <label
          className={`item-negrilla ${errors[item.id] && "item-error"}`}
          htmlFor={item.id}
        >
          {item.required && <span className="item-required">*</span>}
          {item.label}
        </label>
        <input
          type={item.type}
          className="form-control"
          id={item.id}
          name={item.id}
          placeholder={item.placeholder}
          defaultValue={item.defaultValue && item.defaultValue}
          {...register(item.id, {
            required: item.required,
          })}
        />
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">Fecha</span>
        </div>
        <input className="form-control input-ingreso" type="date" placeholder="Fecha" {...register("fecha", { required: true })} />
        {errors.fecha && <span className="item-required">*</span>}
      </div>

      <div className="row">
        <div className="col-6">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <div class="input-group-prepend">
                <span class="input-group-text">Hora inicio</span>
              </div>
              <select
                className="custom-select"
                {...register("inicio", { required: true, })}
              >
                <option value="">Seleccione una opción</option>
                {optsInicio.map((opt) => (
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
              <div class="input-group-prepend">
                <span class="input-group-text">Hora Fin</span>
              </div>
              <select
                className="custom-select"
                {...register("fin", { required: true, })}
              >
                <option value="">Seleccione una opción</option>
                {optsFin.map((opt) => (
                  <option key={"opt" + opt.value} value={opt.value} disabled={opt.disabled}>
                    {opt.text}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12 mt-3">
          <div class="input-group mb-3 input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">Nombre</span>
            </div>
            <input className="form-control" placeholder="Nombre del funcionario" {...register("nombre", { required: true })} />
            {errors.nombre && "Este campo es requerido"}
          </div>
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
          <div class="input-group mb-3 input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">Instancia</span>
            </div>
            <input className="form-control" placeholder="Dirección o departamento" {...register("instancia", { required: true })} />
            {errors.instancia && "Este campo es requerido"}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 mt-3">
          <div class="input-group mb-3 input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">Asunto</span>
            </div>
            <input className="form-control" placeholder="Asunto" {...register("asunto", { required: true })} />
            {errors.asunto && "Este campo es requerido"}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-6 mt-3">
          <div class="input-group mb-3 input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">Teléfono</span>
            </div>
            <input className="form-control" placeholder="Teléfono" {...register("telefono", { required: true })} />
            {errors.telefono && "Este campo es requerido"}
          </div>
          </div>
          <div className="col-6 mt-3">
            <div class="input-group mb-3 input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">Cantidad</span>
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
