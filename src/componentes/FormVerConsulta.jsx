import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';


export default function FormVerConsulta(props) {
  var itemEditar = props.datos,
    tipoIntervencion = props.tipoIntervencion,
    tipoSolicitante = props.tipoSolicitante,
    idSolicitud = props.idSolicitud,
    tipoRespuesta = props.tipoRespuesta;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors } } = useForm({
      defaultValues: {
        id_solicitante: props.datos.id_solicitante
      }
    });

  const valueOfSolicitante = watch('id_solicitante');

  // console.log("datos", props.datos);
  useEffect(() => {

  }, [valueOfSolicitante]);

  useEffect(() => {
    itemEditar.id_solicitante = itemEditar.id_solicitante;
  });
  // const valueOfIngreso = watch('id_ingreso');
  // console.log("watch id_solicitante", watch('id_solicitante'));

  const onSubmit = (data, e) => {
    // console.log("enviando...", JSON.stringify(data));
    props.handlerEnviarEdicion(data)
  }

  const valor = () => {
    // colocar por el valor por defecto al campo respuesta 
    let valor = "";
    itemEditar.id_respuesta !== null ? (valor = itemEditar.id_respuesta) : valor = "";
    return valor
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="form-group col-sm-6 ">
          <label className="item-negrilla font-len" htmlFor="id_intervencion">Tipo de intervención:&nbsp;&nbsp;</label>
          <select className="custom-select form-control" defaultValue={itemEditar.id_intervencion} {...register("id_intervencion", { required: true })} >
          {errors.id_intervencion && <p className="item-error">Este campo es requerido</p>}
            <option value="" disabled>Seleccione...</option>
            {
              tipoIntervencion.map((item, i) => (
                <option key={"intervencion" + i} value={item.id}>{item.tipo}</option>
              ))
            }
          </select>
        </div>
        <div className="form-group col-sm-6 ">
          <label className="item-negrilla font-len" htmlFor="id_solicitante">Tipo de solicitante:&nbsp;&nbsp;</label>
          <select className="custom-select form-control" defaultValue={itemEditar.id_solicitante} {...register("id_solicitante", { required: true })} >
          {errors.id_solicitante && <p className="item-error">Este campo es requerido</p>}
            <option value="" disabled>Seleccione...</option>
            {
              tipoSolicitante.map((item, i) => (
                <option key={"solicitante" + i} value={item.id}>{item.tipo}</option>
              ))
            }
          </select>
        </div>
      </div>
      {valueOfSolicitante === "5" &&
        <div className="row">
          <div className="form-group col-sm-12">
            <label className="item-negrilla font-len" htmlFor="solicitante_otro">Descripción:&nbsp;&nbsp;</label>
            <input type="text" className="form-control" placeholder="Escriba el otro tipo de solicitante" {...register("solicitante_otro", { required: true })} defaultValue={itemEditar.solicitante_otro} />
            {errors.solicitante_otro && <p className="item-error">Este campo es requerido</p>}
          </div>
        </div>
      }
      <div className="row">
        <div className="form-group col-sm-6 ">
          <label className="item-negrilla font-len" htmlFor="id_solicitud">Tipo de solicitud:&nbsp;&nbsp;</label>
          <select className="custom-select form-control" defaultValue={itemEditar.id_solicitud}  {...register("id_solicitud", { required: true })} >
          {errors.id_solicitud && <p className="item-error">Este campo es requerido</p>}
            <option value="" disabled>Seleccione...</option>
            {
              idSolicitud.map((item, i) => (
                <option key={"solicitud" + i} value={item.id}>{item.tipo}</option>
              ))
            }
          </select>
        </div>
        <div className="form-group col-sm-6">
          <label className="item-negrilla font-len" htmlFor="fecha_solicitud">Fecha:&nbsp;&nbsp;</label>
          <input type="date" className="form-control" defaultValue={itemEditar.fecha_solicitud} placeholder="Digite la fecha" {...register("fecha_solicitud", { required: true })} />
          {errors.fecha_solicitud && <p className="item-error">Este campo es requerido</p>}
        </div>
      </div>
      <div className="row">
        <div className="form-group col-sm-12">
          <label className="item-negrilla font-len" htmlFor="tema">Tema:&nbsp;&nbsp;</label>
          <input type="text" className="form-control" defaultValue={itemEditar.tema} placeholder="Tema" {...register("tema", { required: true })} />
          {errors.tema && <p className="item-error">Este campo es requerido</p>}
        </div>
      </div>
      <h4 className="header-1">Atención a la consulta</h4>
      <div className="row">
        <div className="form-group col-sm-6 ">
          <label className="item-negrilla font-len" htmlFor="id_respuesta">Tipo de respuesta:&nbsp;&nbsp;</label>
          <select className="custom-select form-control" defaultValue={valor()} {...register("id_respuesta")} >
          {errors.id_respuesta && <p className="item-error">Este campo es requerido</p>}
            <option value="" disabled>Seleccione...</option>
            {
              tipoRespuesta.map((item, i) => (
                <option key={"solicitud" + i} value={item.id}>{item.tipo}</option>
              ))
            }
          </select>
        </div>
        <div className="form-group col-sm-6">
          <label className="item-negrilla font-len" htmlFor="fecha_respuesta">Fecha:&nbsp;&nbsp;</label>
          <input type="date" className="form-control" defaultValue={itemEditar.fecha_respuesta} placeholder="Digite la fecha" {...register("fecha_respuesta")} />
          {errors.fecha_respuesta && <p className="item-error">Este campo es requerido</p>}
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12 mt-3">
          <input className="btn btn-main" type="submit" value="Guardar"></input>
        </div>
      </div>
    </form >
  )
}