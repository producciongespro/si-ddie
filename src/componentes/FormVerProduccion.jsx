import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import GrupoCheck from './GrupoCheck';
import obtenerValoresCheck from '../modulos/obtenerValoresCheck';

import "../css/form.css";
import "../css/pretty-checkbox.min.css";

export default function FormVerProduccion(props) {
  var itemEditar = props.datos,
    productos = props.productos,
    poblaciones = props.poblaciones;

  console.log("registro a editar EN FORM", itemEditar);
  const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "setiembre", "octubre", "noviembre", "diciembre"];

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors } } = useForm({
      defaultValues: {
        id_producto: props.datos.id_producto
      }
    });

  const [otraPoblacion, setOtraPoblacion] = useState(false);

  const valueOfProducto = watch('id_producto');
  // console.log("valueOfProducto",valueOfProducto);
  // console.log("datos", props.datos);
  useEffect(() => {

  }, [valueOfProducto]);

  useEffect(() => {
    itemEditar.id_producto = itemEditar.id_producto;
  });

  const onSubmit = (data, e) => {
    console.log("enviando...", JSON.stringify(data));

    let arrayPoblacion = obtenerValoresCheck("beneficiario");
    console.log("arrayPoblación", arrayPoblacion);
    let datos = data;
    datos.poblacion = arrayPoblacion;

    e.target.reset(); // reset after form submit
    props.handlerEnviarEdicion(datos);
    setOtraPoblacion(false);
  }



  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="form-group col-sm-6 ">
          <label className="item-negrilla font-len" htmlFor="id_producto">Seleccione el tipo de producto:&nbsp;&nbsp;</label>
          <select className="custom-select form-control" defaultValue={itemEditar.id_producto}  {...register("id_producto", { required: true })} >
            <option value="" disabled>Seleccione...</option>
            {
              productos.map((item, i) => (
                <option key={"producto" + i} value={item.id}>{item.tipo}</option>
              ))
            }
          </select>
        </div>
        {((valueOfProducto > "1" && valueOfProducto < "7") || valueOfProducto === "9") &&
          // {((productoSel > 1 && productoSel < 7) || productoSel === 8) &&
          <div className="form-group col-sm-6 my-2">
            <label className="item-negrilla font-len" htmlFor="numero_consecutivo">Número consecutivo:&nbsp;&nbsp;</label>
            {/* <input type="number" className="form-control" defaultValor={itemEditar.numero_consecutivo} placeholder="Digite el número consecutivo" {...register("numero_consecutivo", { required: true })} /> */}
            <input type="number" className="form-control" defaultValue={itemEditar.numero_consecutivo} placeholder="Digite el número consecutivo" {...register("numero_consecutivo", { required: true })} />
            {errors.numero_consecutivo && <p className="item-error">Este campo es requerido</p>}
          </div>
        }
        {valueOfProducto === "7" &&

          <div className="form-group col-sm-6 my-2">
            <label className="item-negrilla font-len" htmlFor="tema_video_divulgacion">Tema del video":&nbsp;&nbsp;</label>
            <input type="text" className="form-control" defaultValue={itemEditar.tema_video_divulgacion} placeholder="Escriba el tema del video" {...register("tema_video_divulgacion", { required: true })} />
            {errors.tema_video_divulgacion && <p className="item-error">Este campo es requerido</p>}
          </div>
        }
      </div>
      {valueOfProducto === "8" &&
        <div className="row">
          <div className="form-group col-sm-12 my-2">
            <label className="item-negrilla font-len" htmlFor="desc_otro">Descripción:&nbsp;&nbsp;</label>
            <input type="text" className="form-control" defaultValor={itemEditar.desc_otro} placeholder="Describa el tipo de producto" {...register("desc_otro", { required: true })} />
            {errors.desc_otro && <p className="item-error">Este campo es requerido</p>}
          </div>
        </div>
      }
      {(valueOfProducto > 1) &&
        <div className="row">
          <div className="form-group col-sm-12 my-2">
            <p className="font-len" >Población beneficiaria</p>
            <GrupoCheck nombre="beneficiario" listaPoblacion={poblaciones} poblacion={itemEditar.poblacion} handleChange={props.handleGetCheck} />
          </div>
        </div>}

      {otraPoblacion &&
        <React.Fragment>
          <label className="item-negrilla font-len" htmlFor="poblacion_otro">Descripción:&nbsp;&nbsp;</label>
          <input type="text" className="form-control" defaultValue={itemEditar.poblacion_otro} placeholder="Escriba el otro tipo de población" {...register("poblacion_otro", { required: true })} />
          {errors.poblacion_otro && <p className="item-error">Este campo es requerido</p>}
        </React.Fragment>
      }
      {valueOfProducto === "1" && (
        <React.Fragment>
          <div className="row">
            <div className="form-group col-sm-6 my-2">
              <label className="item-negrilla font-len" htmlFor="volumen_revista">Volumen:&nbsp;&nbsp;</label>
              <input type="number" className="form-control" defaultValue={itemEditar.volumen_revista} placeholder="No. volumen" {...register("volumen_revista", { required: true })} />
              {errors.volumen_revista && <p className="item-error">Este campo es requerido</p>}
            </div>
            <div className="form-group col-sm-6 my-2">
              <label className="item-negrilla font-len" htmlFor="numero_revista">Número:&nbsp;&nbsp;</label>
              <input type="number" className="form-control" defaultValue={itemEditar.numero_revista} placeholder="No. revista" {...register("numero_revista", { required: true })} />
              {errors.numero_revista && <p className="item-error">Este campo es requerido</p>}
            </div>
          </div>
          <div className="row">
            <div className="form-group col-sm-6 my-2">
              <label className="item-negrilla font-len" htmlFor="mes_revista">Mes:&nbsp;&nbsp;</label>
              <select className="custom-select form-control" defaultValue={itemEditar.mes} {...register("mes_revista", { required: true })} >
                <option value="" disabled>Seleccione...</option>
                {
                  meses.map((label, i) => (
                    <option key={"mes" + label} value={i + 1}>{label}</option>
                  ))}
              </select>
            </div>
            <div className="form-group col-sm-6 my-2">
              <label className="item-negrilla font-len" htmlFor="anno_revista">Año:&nbsp;&nbsp;</label>
              <input type="number" className="form-control" defaultValue={itemEditar.anno_revista} placeholder="Digite el año" {...register("anno_revista", { required: true })} />
              {errors.anno_revista && <p className="item-error">Este campo es requerido</p>}
            </div>
          </div>
        </React.Fragment>
      )
      }
      <div className="row">
        <div className="form-group col-sm-6">
          <label className="item-negrilla font-len" htmlFor="cantidad">Cantidad:&nbsp;&nbsp;</label>
          <input type="number" className="form-control" defaultValue={itemEditar.cantidad} placeholder="Digite la cantidad" {...register("cantidad", { required: true })} />
          {errors.cantidad && <p className="item-error">Este campo es requerido</p>}
        </div>
        <div className="form-group col-sm-6">
          <label className="item-negrilla font-len" htmlFor="fecha">Fecha:&nbsp;&nbsp;</label>
          <input type="date" className="form-control" defaultValue={itemEditar.fecha} placeholder="Tema" {...register("fecha", { required: true })} />
          {errors.fecha && <p className="item-error">Este campo es requerido</p>}
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="form-group col-sm-6">
          <label className="item-negrilla font-len" htmlFor="cantidad_beneficiarios">Cantidad de beneficiarios:&nbsp;&nbsp;</label>
          <input type="number" className="form-control" defaultValue={itemEditar.cantidad_beneficiarios} placeholder="Digite la cantidad de beneficiarios" {...register("cantidad_beneficiarios", { required: true })} />
          {errors.cantidad_beneficiarios && <p className="item-error">Este campo es requerido</p>}
        </div>
        <hr />
      </div>
      <div className="row">
        <div className="col-md-6 center">
          <input className="btn btn-block btn-main" type="submit" value="Guardar registro" />
        </div>
      </div>

    </form >
  )
}