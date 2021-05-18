import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';

import obtener from '../modulos/obtener';

import MyContext from '../modulos/MyContext';

import mostrarAlerta from './Alerta.js';

// import "../css/form.css";

import enviar from '../modulos/enviar';

import referenciasJson from '../data/referencias.json';
const referencias = referenciasJson[0];

export default function Basededatos() {

  // const { register, handleSubmit, errors, clearError } = useForm();
  const { usuario, setUsuario } = useContext(MyContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors } } = useForm();

  //Estado para controlar la carga del json de ingresos:
  const [ingreso, setIngreso] = useState(null);

  //Estado que maneja el ingreso seleccionado por el usuario
  const [ingresoSel, setIngresoSel] = useState(null);

  //Estado que maneja el mes seleccionado por el usuario
  const [mesSel, setMesSel] = useState(null);

  //Cargado se cambia a True cuando se termina la carga de json del servidor
  const [cargado, setCargado] = useState(false);

  const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "setiembre", "octubre", "noviembre", "diciembre"];

  const onSubmit = (data, e) => {
    
    // console.log(JSON.stringify(data));
    
    data.id_usuario =  usuario.idUsuario

     console.log("data", data);

    let url = referencias.guardaconsulta + "?tabla_destino=ingresos";

    enviar(url, data, function (resp) {
      // console.log("resp", resp);
      mostrarAlerta("Alerta", resp.data.mensaje);
    });
    setIngresoSel(0);
    e.target.reset(); // reset after form submit
  };
  // console.log("errors", errors);


  useEffect(() => {
    // moment.locale('es');
    let urlIngreso = referencias.consultageneral + "?tabla=tipo_ingreso";
    //Carga el primer json:
    obtener(urlIngreso, function (data) {
      setIngreso(data);
      setCargado(true);
    })
  }, []);


  const valueOfIngreso = watch('id_ingreso');


  // const handleSeleccionarIngreso = (e) => {
  //   //obtenr el valor de seleccion
  //   // clearError();
  //   console.log("Select ingreso", e);
  //   setIngresoSel(parseInt(e));
  // }

  const handleMonthSelect = (e) => {
    let mesActual = parseInt(e.target.value);
    setMesSel(mesActual);
  }

  return (
    cargado ?
      (
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="header-1">Base de datos</h1>
          <div className="row">
            <div className="form-group col-sm-6 ">
              <label className="item-negrilla font-len" htmlFor="id_ingreso">Nuevo ingreso:&nbsp;&nbsp;</label>
              <select className="custom-select form-control" defaultValue="" {...register("id_ingreso", { required: true })} >
              {errors.id_ingreso && <p className="item-error">Este campo es requerido</p>}
                <option value="" disabled>Seleccione...</option>
                {
                  ingreso.map((item, i) => (
                    <option key={"ingreso" + i} value={item.id}>{item.tipo}</option>
                  ))
                }
              </select>
            </div>
            <div className="form-group col-sm-6 my-2">
              <label className="item-negrilla font-len" htmlFor="descriptor">Descriptor:&nbsp;&nbsp;</label>
              <input type="number" className="form-control" placeholder="Descriptor" {...register("descriptor", { required: true })} />
              {errors.descriptor && <p className="item-error">Este campo es requerido</p>}
            </div>
          </div>

          {valueOfIngreso === "3" &&
            <div className="row">
              <div className="form-group col-sm-6">
                <label className="item-negrilla font-len" htmlFor="mes">Mes:&nbsp;&nbsp;</label>
                <select className="custom-select form-control" defaultValue="" onChange={handleMonthSelect} name="mes" id="mes" {...register("mes", { required: true })}>
                  {errors.mes && <p className="item-error">Este campo es requerido</p>}
                  <option value="" disabled>Seleccione...</option>
                  {
                    meses.map((label, i) => (
                      <option key={"mes" + label} value={i + 1}>{label}</option>
                    ))}
                </select>
              </div>
              <div className="col-sm-6 form-group">
                <label className="item-negrilla font-len" htmlFor="anno">Año:&nbsp;&nbsp;</label>
                <input type="number" className="form-control" placeholder="Escriba el año" {...register("anno", { required: true })} />
                {errors.anno && <p className="item-error">Este campo es requerido</p>}
              </div>
            </div>
          }

          { (valueOfIngreso === "8" || valueOfIngreso === "9") &&
            <div className="row">
              <div className="col-sm-6 form-group">
                <label className="item-negrilla font-len" htmlFor="registro">Número de registro:&nbsp;&nbsp;</label>
                <input type="text" className="form-control" placeholder="Número" {...register("registro", { required: true })} />
                {errors.registro && <p className="item-error">Este campo es requerido</p>}
              </div>
              <div className="form-group col-sm-6 my-2">
                <label className="item-negrilla font-len" htmlFor="nota">Ingrese las notas:</label>
                <textarea className="form-control" placeholderText="Ingrese las notas" {...register("nota", { required: true })} />
                {errors.nota && <p className="item-error">Este campo es requerido</p>}
              </div>
            </div>
          }
          {valueOfIngreso === "8" &&
            <div className="row">
              <div className="form-group col-sm-6">

                <label className="item-negrilla font-len" htmlFor="modificado_reg_antiguo">Número de registro antiguo:</label>
                <input type="text" className="form-control" placeholder="Número de registro antiguo" {...register("modificado_reg_antiguo", { required: true })} />
                {errors.modificado_reg_antiguo && <p className="item-error">Este campo es requerido</p>}
              </div>
              <div className="form-group col-sm-6 my-2">
                <p><label className="item-negrilla font-len" htmlFor="modificado_datos_corregidos">Ingrese los datos corregidos:</label> </p>
                <textarea className="form-control" {...register("modificado_datos_corregidos", { required: true })} />
                {errors.modificado_datos_corregidos && <p className="item-error">Este campo es requerido</p>}
              </div>
            </div>
          }
          <div className="row">
            <div className="form-group col-sm-6 my-2">

              <label className="item-negrilla font-len" htmlFor="portada">Portada:</label>
              <input type="text" className="form-control" placeholder="Portada" {...register("portada", { required: true })} />
              {errors.portada && <p className="item-error">Este campo es requerido</p>}
            </div>
            <div className="form-group col-sm-6 my-2">

              <label className="item-negrilla font-len" htmlFor="texto_completo">Texto completo:</label>
              <input type="number" className="form-control" placeholder="No. del texto" {...register("texto_completo", { required: true })} />
              {errors.texto_completo && <p className="item-error">Este campo es requerido</p>}
            </div>
          </div>

          <div className="row">
            <div className="form-group col-sm-6 my-2">

              <label className="item-negrilla font-len" htmlFor="enlace">Enlace:</label>
              <input type="number" className="form-control" placeholder="Número..." {...register("enlace", { required: true })} />
              {errors.enlace && <p className="item-error">Este campo es requerido</p>}
            </div>
            <div className="form-group col-sm-6 my-2">

              <label className="item-negrilla font-len" htmlFor="fecha">Fecha:</label>
              <input type="date" className="form-control" placeholder="Número..." {...register("fecha", { required: true })} />
              {errors.fecha && <p className="item-error">Este campo es requerido</p>}
            </div>
          </div>
          <div className={"form-group d-none"}>

          </div>
          <div className="row">
            <div className="col-md-4 center">
              <input className="btn btn-block btn-main" type="submit" value="Guardar registro" />
            </div>
          </div>
        </form>
      )
      :
      (

        <div>
          <span className="spinner-grow spinner-grow-lg text-danger"></span>
          <span className=""> Cargando datos. Por favor espere...</span>
        </div>
      )

  )
}
