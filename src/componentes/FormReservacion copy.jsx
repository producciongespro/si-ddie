import React from "react";
import { useForm } from 'react-hook-form';

import horasInicio from "../data/horas-inicio.json";
import horasFin from "../data/horas-fin.json";

export default function FormReservacion(props) {
  var registro  = props.registro;

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
    // alert(JSON.stringify(data));
    props.getDataForm(data);
    e.target.reset();
  };

  return (
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
          <input className="form-control" placeholder="Nombre del funcionario" {...register("nombre", { required: true })} defaultValue={registro.nombre} />
          {/* <input className="form-control" placeholder="Nombre del funcionario" {...register("nombre", { required: true })} />  */}
          {errors.nombre && "Este campo es requerido"}
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12 mt-3">
          <input className="form-control" placeholder="Correo del funcionario" {...register("correo", { required: true })} defaultValue={registro.correo} />
          {/* <input className="form-control" placeholder="Correo del funcionario" {...register("correo", { required: true })} /> */}
          {errors.correo && "Este campo es requerido"}

        </div>
      </div>
      <div className="row">
        <div className="col-sm-12 mt-3">
          <input className="form-control" placeholder="Dirección o departamento" {...register("instancia", { required: true })} defaultValue={registro.instancia} />
          {errors.instancia && "Este campo es requerido"}

        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 mt-3">
          <input className="form-control" placeholder="Asunto" {...register("asunto", { required: true })} defaultValue={registro.asunto} />
          {/* <input className="form-control" placeholder="Asunto" {...register("asunto", { required: true })} /> */}
          {errors.asunto && "Este campo es requerido"}

        </div>
      </div>

      <div className="row">
        <div className="col-sm-6 mt-3">
          <input className="form-control" placeholder="Teléfono" {...register("telefono", { required: true })} defaultValue={registro.telefono} />
          {errors.telefono && "Este campo es requerido"}
        </div>
        <div className="col-sm-6 mt-3">
          <input className="form-control" type="number" placeholder="Cantidad de asistentes" {...register("cantidad", { required: true })} defaultValue={registro.cantidad} />
          {errors.cantidad && "Este campo es requerido y debe ser numérico"}
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12 mt-3">
          <input className="btn btn-outline-info btn-block" value="Actualizar" type="submit" />
        </div>
      </div>
    </form>
  )
}