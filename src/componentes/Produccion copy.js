import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import obtener from '../modulos/obtener';
import obtenerValoresCheck from '../modulos/obtenerValoresCheck';
// import CheckBox from '../componentes/CheckBox';

import MyContext from '../modulos/MyContext';
import { eliminar } from "gespro-utils/crud_array";

import mostrarAlerta from './Alerta.js';

import "../css/form.css";
import "../css/pretty-checkbox.min.css";

import referenciasJson from '../data/referencias.json';
import enviar from '../modulos/enviar';

const referencias = referenciasJson[0];

let valoresCheck = [];

export default function Produccion() {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors } } = useForm();

  const valueOfProducto = watch('id_producto');

  const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "setiembre", "octubre", "noviembre", "diciembre"];

  const { usuario, setUsuario } = useContext(MyContext);

  //Estado para controlar la carga del json de productos:
  const [productos, setProductos] = useState(null);

  //Estado que maneja el producto seleccionado por el usuario
  const [producto, setProducto] = useState(false);

  //Estado que carga las poblaciones del json del servidor
  const [poblaciones, setPoblaciones] = useState(null);

  //Cargado se cambia a True cuando se termina la carga de json del servidor
  const [cargado, setCargado] = useState(false);

  //Cargado se cambia a True cuando se termina la carga de json del servidor
  const [otraPoblacion, setOtraPoblacion] = useState(false);

  useEffect(() => {
    (valueOfProducto !== "") && setProducto(true);
  }, [valueOfProducto]);


  const onSubmit = (data, e) => {
    console.log(JSON.stringify(data));
    console.log("valoresCheck", valoresCheck);
    if (valoresCheck) {
      if (valoresCheck.length > 0) {
        data.poblacion = JSON.stringify(valoresCheck);
      }
    };
    data.id_usuario = usuario.idUsuario


    let url = referencias.guardaconsulta + "?tabla_destino=productos";

    console.log("url desde submit", url);
    console.log("data", data);

    enviar(url, data, function (resp) {
      mostrarAlerta("Alerta", resp.data.mensaje);
    });
    setProducto(false);
    setOtraPoblacion(false);
    e.target.reset(); // reset after form submit
  };

  useEffect(() => {
    //Acción que se ejecuta una vez que se monta el componente
    let urlProductos = referencias.consultageneral + "?tabla=tipo_productos",
      urlPoblacion = referencias.consultageneral + "?tabla=productos_poblacion_meta";
    //Carga el primer json:
    obtener(urlProductos, function (data) {
      setProductos(data);
      //Carga el segundo select en el callback del primer "obtner":
      obtener(urlPoblacion, function (data) {
        //Callback del segundo obtener
        setPoblaciones(data);
        //Activa cargado para que meuistre el formulario:
        setCargado(true)
      })
    })
  }, []);


  // const handleSeleccionarProducto = (e) => {
  //   //obtenr el valor de seleccion
  //   parseInt(e.target.value)
  //   setProducto(parseInt(e.target.value));
  // }

  const handleGetCheck = (e) => {
    const item = e.target;

    console.log("item on change=", item.id);
    // console.log(item.checked);
    // console.log(item.name);
    (item.id === "12" && e.target.checked) ? setOtraPoblacion(true) : setOtraPoblacion(false);
    // poblaciones = {"id": chkPoblacion};
    // listaAnnos.push(poblaciones);   
    if (item.checked) {
      //si es vardadero simplemente lo agrega en el array:
      const tmpObj = {
        // nombre: item.name,
        id: item.id,
        // valor: item.checked,
      };
      valoresCheck.push(tmpObj);
      //console.log(valoresCheck);
    } else {
      console.log("entre en falso", item.checked);
      //Si es falso lo busca del array para eliminarlo
      const itemEliminado = eliminar(item.id, valoresCheck);
      //console.log("Objeto eliminado", itemEliminado);
    }

    console.log(valoresCheck);
  };


  return (
    cargado ?
      (
        <div className="col-12">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="header-1">Producción</h1><br />
            <div className="row">
              <div className="form-group col-sm-6 ">

                <label className="item-negrilla font-len" htmlFor="id_producto">Seleccione el tipo de producto:&nbsp;&nbsp;</label>
                <select className="custom-select form-control" defaultValue="" {...register("id_producto", { required: true })} >

                  {/* <label className="font-len" htmlFor="id_producto">Seleccione el tipo de producto:&nbsp;&nbsp;</label>
                <select className="custom-select" defaultValue="" onChange={handleSeleccionarProducto} name="id_producto" ref={register({ required: true })}>
                  {errors.id_producto && <p className="errors">Este campo es requerido</p>} */}
                  <option value="" disabled>Seleccione...</option>
                  {

                    productos.map((item, i) => (
                      <option key={"producto" + i} value={item.id}>{item.tipo}</option>
                    ))
                  }
                </select>
              </div>
              {
                producto &&
                <>

                  {((valueOfProducto > "1" && valueOfProducto < "7") || valueOfProducto === "9") &&
                    <div className="form-group col-sm-6 my-2">

                      <label className="item-negrilla font-len" htmlFor="numero_consecutivo">Número consecutivo:&nbsp;&nbsp;</label>
                      <input type="number" className="form-control" placeholder="Digite el número consecutivo" {...register("numero_consecutivo", { required: true })} />
                      {errors.numero_consecutivo && <p className="item-error">Este campo es requerido</p>}
                      {/* <InputItem placeholderText="Digite el número consecutivo" tipo="number" nombre="numero_consecutivo" textlabel="Número consecutivo" referencia={register({ required: true })} />
                  {errors.numero_consecutivo && <p className="errors">Este campo es requerido</p>} */}
                    </div>
                  }
                  {valueOfProducto === "7" &&
                    <div className="form-group col-sm-6 my-2">

                      <label className="item-negrilla font-len" htmlFor="tema_video_divulgacion">Tema del video":&nbsp;&nbsp;</label>
                      <input type="text" className="form-control" placeholder="Escriba el tema del video" {...register("tema_video_divulgacion", { required: true })} />
                      {errors.tema_video_divulgacion && <p className="item-error">Este campo es requerido</p>}
                      {/* <InputItem tipo="text" placeholderText="Escriba el tema del video" nombre="tema_video_divulgacion" textlabel="Tema del video" referencia={register({ required: true })} />
                  {errors.tema_video_divulgacion && <p className="errors">Este campo es requerido</p>} */}
                    </div>
                  }
                  </>
              }
                  </div>
                  {
                producto &&
                <>
                  {valueOfProducto === "9" &&
                    <div className="row">
                      <div className="form-group col-sm-12 my-2">
                        <label className="item-negrilla font-len" htmlFor="desc_otro">Descripción:&nbsp;&nbsp;</label>
                        <input type="text" className="form-control" placeholder="Describa el tipo de producto" {...register("desc_otro", { required: true })} />
                        {errors.desc_otro && <p className="item-error">Este campo es requerido</p>}
                        {/* <InputItem tipo="text" placeholderText="Describa el tipo de producto" nombre="desc_otro" textlabel="Descripción" referencia={register({ required: true })} />
                  {errors.desc_otro && <p className="errors">Este campo es requerido</p>} */}
                      </div>
                    </div>
                  }
                  {valueOfProducto > "1" &&
                    <div className="row">
                      <div className="form-group col-sm-12 my-2">
                        <p className="font-len" >Población beneficiaria</p>
                        {/* <CheckBox array={poblaciones} nombre="beneficiario" register={register} handleChange={handleChangeCheck} /> */}
                        {poblaciones.map((item, i) => (
                          <div className="custom-control custom-checkbox" key={"chk" + i} >
                            <div className="pretty p-switch p-fill p-smooth">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id={item.id}
                                name={item.nombre}
                                onClick={handleGetCheck}
                              />
                              <div className="state p-success">
                                <label className="custom-control-label"> {item.nombre} </label>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  }
                  {otraPoblacion &&
                    <React.Fragment>

                      <label className="item-negrilla font-len" htmlFor="poblacion_otro">Descripción:&nbsp;&nbsp;</label>
                      <input type="text" className="form-control" placeholder="Escriba el otro tipo de población" {...register("poblacion_otro", { required: true })} />
                      {errors.poblacion_otro && <p className="item-error">Este campo es requerido</p>}
                      {/* <InputItem tipo="text" nombre="poblacion_otro" placeholderText="Escriba el otro tipo de población" textlabel="Descripción" referencia={register({ required: true })} />
                {errors.poblacion_otro && <p className="errors">Este campo es requerido</p>} */}
                    </React.Fragment>
                  }

                  {valueOfProducto === "1" && (
                    <React.Fragment>
                      <div className="row">
                        <div className="form-group col-sm-6 my-2">
                          <label className="item-negrilla font-len" htmlFor="volumen_revista">Volumen:&nbsp;&nbsp;</label>
                          <input type="number" className="form-control" placeholder="No. volumen" {...register("volumen_revista", { required: true })} />
                          {errors.volumen_revista && <p className="item-error">Este campo es requerido</p>}
                          {/* <InputItem tipo="number" nombre="volumen_revista" placeholderText="No. volumen" textlabel="Volumen" referencia={register({ required: true })} />
                    {errors.volumen_revista && <p className="errors">Este campo es requerido</p>} */}
                        </div>
                        <div className="form-group col-sm-6 my-2">
                          <label className="item-negrilla font-len" htmlFor="numero_revista">Número:&nbsp;&nbsp;</label>
                          <input type="number" className="form-control" placeholder="No. revista" {...register("numero_revista", { required: true })} />
                          {errors.numero_revista && <p className="item-error">Este campo es requerido</p>}
                          {/* <InputItem tipo="number" nombre="numero_revista" placeholderText="No. revista" textlabel="Número" referencia={register({ required: true })} />
                    {errors.numero_revista && <p className="errors">Este campo es requerido</p>} */}
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-group col-sm-6 my-2">
                          <label className="item-negrilla font-len" htmlFor="mes_revista">Mes:&nbsp;&nbsp;</label>
                          <select className="custom-select form-control" defaultValue="" {...register("mes_revista", { required: true })} >
                            {/* <label className="font-len" htmlFor="mes_revista">Mes:</label>
                      <select className="custom-select" defaultValue="" onChange={handleMonthSelect} name="mes_revista" id="mes_revista" ref={register({ required: true })}>
                        {errors.mes_revista && <p className="errors">Este campo es requerido</p>} */}
                            <option value="" disabled>Seleccione...</option>
                            {
                              meses.map((label, i) => (
                                <option key={"mes" + label} value={i + 1}>{label}</option>
                              ))}
                          </select>
                        </div>
                        <div className="form-group col-sm-6 my-2">

                          <label className="item-negrilla font-len" htmlFor="anno_revista">Año:&nbsp;&nbsp;</label>
                          <input type="number" className="form-control" placeholder="Digite el año" {...register("anno_revista", { required: true })} />
                          {errors.anno_revista && <p className="item-error">Este campo es requerido</p>}
                          {/* <InputItem tipo="number" nombre="anno_revista" textlabel="Año" placeholderText="Digite el año" referencia={register({ required: true })} />
                      {errors.anno_revista && <p className="errors">Este campo es requerido</p>} */}
                        </div>
                      </div>
                    </React.Fragment>
                  )
                  }
                </>
              }
              <div className="row">
                <div className="form-group col-sm-6">

                  <label className="item-negrilla font-len" htmlFor="cantidad">Cantidad:&nbsp;&nbsp;</label>
                  <input type="number" className="form-control" placeholder="Digite la cantidad" {...register("cantidad", { required: true })} />
                  {errors.cantidad && <p className="item-error">Este campo es requerido</p>}
                  {/* <label className="font-len" htmlFor="cantidad">Cantidad:</label>
                    <input className="form-control" type="number" placeholder="Digite la cantidad" id="cantidad" name="cantidad" ref={register({ required: true })} />
                    {errors.cantidad && <p className="errors">Este campo es requerido</p>} */}
                </div>

                <div className="form-group col-sm-6">
                  <label className="item-negrilla font-len" htmlFor="fecha">Fecha:&nbsp;&nbsp;</label>
                  <input type="date" className="form-control" placeholder="Tema" {...register("fecha", { required: true })} />
                  {errors.fecha && <p className="item-error">Este campo es requerido</p>}
                  {/* <label className="font-len" htmlFor="fecha">Fecha:</label>
                    <input type="date" className="form-control" id="fecha" name="fecha" placeholder="Digite la fecha" ref={register({ required: true })} />
                    {errors.fecha && <p className="errors">Este campo es requerido</p>} */}
                </div>

              </div>
              <hr />
              <div className="row">
                <div className="form-group col-sm-6">
                  <label className="item-negrilla font-len" htmlFor="cantidad_beneficiarios">Cantidad de beneficiarios:&nbsp;&nbsp;</label>
                  <input type="number" className="form-control" placeholder="Digite la cantidad de beneficiarios" {...register("cantidad_beneficiarios", { required: true })} />
                  {errors.cantidad_beneficiarios && <p className="item-error">Este campo es requerido</p>}
                  {/* <label className="font-len" htmlFor="cantidad_beneficiarios">Cantidad de beneficiarios:</label>
                    <input type="number" className="form-control" id="cantidad_beneficiarios" name="cantidad_beneficiarios" placeholder="Digite la cantidad de beneficiarios" ref={register({ required: true })} />
                    {errors.cantidad_beneficiarios && <p className="errors">Este campo es requerido</p>} */}
                </div>
                <hr />
              </div>
              <div className="row">
                <div className="col-md-6 center">
                  <input className="btn btn-block btn-main" type="submit" value="Guardar registro" />
                </div>
              </div>
          </form>
        </div>

      )
      :
      (
          <div>
            <span className="spinner-grow spinner-grow-lg text-danger"></span>
            <span className=""> Cargando datos. Por favor espere...</span>
          </div>

      )

  );
}