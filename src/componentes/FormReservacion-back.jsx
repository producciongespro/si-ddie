import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import obtener from '../modulos/obtener';

import { eliminar } from "gespro-utils/crud_array";

import "../componentes/Form/css/form.css"
import inputs from "./Form/data/inputs-actualiza.json";
import referenciasJson from '../data/referencias.json';
import horasInicio from "../data/horas-inicio.json";
import horasFin from "../data/horas-fin.json";

const referencias = referenciasJson[0];

const getDataForm = (data) => {
  console.log("Datos a enviar al servidor", data);
};

var 
  arrayInputs = [],
  objHorasInicio = [],
  objHorasFin = [];


export default function FormReservacion(props) {
   let selectI = props.selectInicio,
     selectF = props.selectFin;
    let valoresDefault = props.valoresDefault;
const[ selectInicio, setSelectInicio] = useState(selectI);
const[ selectFin, setSelectFin] = useState(selectF);
const[ muestraInicio, setMuestraInicio] = useState(true);
    console.log("valores default", valoresDefault);
  arrayInputs = inputs;
console.log("arrayInputs", arrayInputs);

  console.log("array Valores default", valoresDefault.fecha);

  arrayInputs[1].opts = selectInicio;
  arrayInputs[2].opts = selectFin;

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
setMuestraInicio(false);
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
        console.log("objHorasInicio",objHorasInicio );
        console.log("objHorasFin", objHorasFin);

        setSelectInicio(objHorasInicio);
        setSelectFin(objHorasFin);
        arrayInputs[1].opts = selectInicio;
        arrayInputs[2].opts = selectFin;
        setMuestraInicio(true);
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


  const JsxSelect = (item, key) => {
    return (

      <div className="input-group mb-3" key={key}>
        { muestraInicio ?

        <div className="input-group-prepend">
          <label
            className={`input-group-text item-negrilla ${errors[item.id] && "item-error"
              }`}
            htmlFor={item.id}
          >
            {item.required && <span className="item-required">*</span>}
            {item.label}
          </label>
        </div>
        <select
          className="custom-select"
          name={item.id}
          id={item.id}
          //ref={register({ required: item.required })}
          {...register(item.id, {
            required: item.required,
          })}
        >
          <option value="">Seleccione una opción</option>
          {item.opts.map((opt) => (
            <option key={"opt" + opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.text}
            </option>
          ))}
        </select>
      </div>
      : <div>Cargando</div>
      
    )
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {arrayInputs.map((item, i) => {
        if (item.control === "input") {
          return JsxInput(item, i);
        }
        if (item.control === "inputfecha") {
          return JsxInputFecha(item, i);
        }
        if (item.control === "select") {
          return JsxSelect(item, i);
        }
      })}

      <br />
      {/* <input className="" type="date" onChange={handleInputChange} /> */}
      <input className="btn btn-outline-info" type="submit" />
    </form>
  );




  // return <Form getDataForm={getDataForm} array={arrayInputs} valoresDefault={valoresDefault} />  
};
