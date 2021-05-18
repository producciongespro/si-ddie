import React, {useEffect} from 'react';
import { useForm } from 'react-hook-form';

export default function FormVerBD(props) {
  let itemEditar = props.datos,
      meses = props.meses,
      id = props.datos.id_ingreso,
      tipoIngresos = props.tipoIngresos,
      handleMonthSelect = props.handleMonthSelect;
  // datos ={itemEditar} meses = {meses} handlerEnviarEdicion = {handlerEnviarEdicion} />
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors } } = useForm({
       defaultValues: {
         id_ingreso: props.datos.id_ingreso
      }
    });

 const valueOfIngreso = watch('id_ingreso');

 useEffect(() => {
      // valueOfIngreso;
    }, [valueOfIngreso]);

    useEffect(() => {
      itemEditar.id_ingreso =  itemEditar.id_ingreso;
    });
  // const valueOfIngreso = watch('id_ingreso');
  // console.log("watch id_ingreso", watch('id_ingreso'));

  const onSubmit = (data, e) => {
    // console.log("enviando...",JSON.stringify(data));
    props.handlerEnviarEdicion(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="form-group col-sm-6 ">
          <label className="item-negrilla font-len" htmlFor="id_ingreso">Ingreso:&nbsp;&nbsp;</label>
          <select className="custom-select form-control" {...register("id_ingreso", { required: true })} >
            {errors.id_ingreso && <p className="errors">Este campo es requerido</p>}
            <option value="" disabled>Seleccione...</option>
            {
              tipoIngresos.map((item, i) => (
                <option key={"ingreso" + i} value={item.id}>{item.tipo}</option>
              ))
            }
          </select>
        </div>
        <div className="form-group col-sm-6 my-2">
          <label className="item-negrilla font-len" htmlFor="descriptor">Descriptor:&nbsp;&nbsp;</label>
          <input type="number" className="form-control" placeholder="Descriptor" {...register("descriptor", { required: true })} defaultValue={itemEditar.descriptor} />
          {errors.descriptor && <p className="item-error">Este campo es requerido</p>}
        </div>
      </div>
      {valueOfIngreso === "3" &&
        <div className="row">
          <div className="col-sm-6">
            <label className="item-negrilla font-len" htmlFor="mes">Mes:&nbsp;&nbsp;</label>
            <select className="custom-select form-control" defaultValue="" onChange={handleMonthSelect} name="mes" id="mes" {...register("mes", { required: true })} defaultValue={itemEditar.mes} >
              {errors.mes && <p className="item-error">Este campo es requerido</p>}
              <option value="" disabled>Seleccione...</option>
              {
                meses.map((label, i) => (
                  <option key={"mes" + label} value={i + 1}>{label}</option>
                ))}
            </select>
          </div>
          <div className="col-sm-6">
            <label className="item-negrilla font-len" htmlFor="anno">Año:&nbsp;&nbsp;</label>
            <input type="number" className="form-control" placeholder="Escriba el año" {...register("anno", { required: true })} defaultValue={itemEditar.anno} />
            {errors.anno && <p className="item-error">Este campo es requerido</p>}
          </div>
        </div>
      }
      {(valueOfIngreso === "8" || valueOfIngreso === "9") &&
        <div className="row">
          <div className="form-group col-sm-6 my-2">
            <label className="item-negrilla font-len" htmlFor="registro">Número de registro:&nbsp;&nbsp;</label>
            <input type="text" className="form-control" placeholder="Número" {...register("registro", { required: true })} defaultValue={itemEditar.registro} />
            {errors.registro && <p className="item-error">Este campo es requerido</p>}
          </div>
          <div className="form-group col-sm-6 my-2">
            <label className="item-negrilla font-len" htmlFor="nota">Ingrese las notas:</label>
            <textarea className="form-control" placeholderText="Ingrese las notas" {...register("nota", { required: true })} defaultValue={itemEditar.nota} />
            {errors.nota && <p className="item-error">Este campo es requerido</p>}
          </div>
        </div>
      }
      {valueOfIngreso === "8" &&

        <div className="row">
          <div className="form-group col-sm-6 my-2">
            <label className="item-negrilla font-len" htmlFor="modificado_reg_antiguo">Número de registro antiguo:</label>
            <input type="text" className="form-control" placeholder="Número de registro antiguo" {...register("modificado_reg_antiguo", { required: true })} defaultValue={itemEditar.modificado_reg_antiguo} />
            {errors.modificado_reg_antiguo && <p className="item-error">Este campo es requerido</p>}
          </div>
          <div className="form-group col-sm-6 my-2">
            <p><label className="item-negrilla font-len" htmlFor="modificado_datos_corregidos">Ingrese los datos corregidos:</label> </p>
            <textarea className="form-control" {...register("modificado_datos_corregidos", { required: true })} defaultValue={itemEditar.modificado_datos_corregidos} />
            {errors.modificado_datos_corregidos && <p className="item-error">Este campo es requerido</p>}
          </div>

        </div>

      }
      <div className="row">
        <div className="form-group col-sm-6 my-2">
          <label className="item-negrilla font-len" htmlFor="portada">Portada:</label>
          <input type="text" className="form-control" placeholder="Portada" {...register("portada", { required: true })} defaultValue={itemEditar.portada} />
          {errors.portada && <p className="item-error">Este campo es requerido</p>}
        </div>
        <div className="form-group col-sm-6 my-2">
          <label className="item-negrilla font-len" htmlFor="texto_completo">Texto completo:</label>
          <input type="number" className="form-control" placeholder="No. del texto" {...register("texto_completo", { required: true })} defaultValue={itemEditar.texto_completo} />
          {errors.texto_completo && <p className="item-error">Este campo es requerido</p>}
        </div>
      </div>

      <div className="row">
        <div className="form-group col-sm-6 my-2">
          <label className="item-negrilla font-len" htmlFor="enlace">Enlace:</label>
          <input type="number" className="form-control" placeholder="Número..." {...register("enlace", { required: true })} defaultValue={itemEditar.enlace} />
          {errors.enlace && <p className="item-error">Este campo es requerido</p>}
        </div>
        <div className="form-group col-sm-6 my-2">
          <label className="item-negrilla font-len" htmlFor="fecha">Fecha:</label>
          <input type="date" className="form-control" placeholder="Número..." {...register("fecha", { required: true })} defaultValue={itemEditar.fecha} />
          {errors.fecha && <p className="item-error">Este campo es requerido</p>}
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12 mt-3">
        <input className="btn btn-main" type="submit" value="Guardar"></input>
        </div>
      </div>
    </form>
  )
}