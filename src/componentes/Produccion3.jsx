import React, {useState, useEffect} from 'react';
import { useForm } from 'react-hook-form';
 //https://andyhu92.github.io/react-bootstrap4-form-validation/#/example/basic-usage
//  https://andyhu92.github.io/react-bootstrap4-form-validation/#/api/validation-form

import axios from 'axios';

import mostrarAlerta from './Alerta.js';

import referenciasJson from '../data/referencias.json';
import "../css/form.css";

import LoadingSpinner from './spinner/LoadingSpinner';

const referencias = referenciasJson[0];

  // var poblacion = [],
  //     tablaTiproducto = [],
  //     idUser = sessionStorage.getItem("id_usuario");
      

 

export default function Produccion() {
  // const [loading,setLoading] =useState(true)
  // const load  = loading;

  // var textoSubmit= 'Guardar registro'+ load ? <LoadingSpinner elementClass={"spinner-grow text-light spinner-grow-lg"} /> : <LoadingSpinner elementClass={"d-none"} />
  const { register, handleSubmit, errors } = useForm();
  // const onSubmit = data => console.log(data);
  const onSubmit = (data, e) => {
    console.log(data);
    e.target.reset(); // reset after form submit
  };
  console.log(errors);

  
    return (
      <React.Fragment>
      <div className="row">
        <h1 className="header-1">Producción</h1>
      </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="form-group col-sm-12 ">
                <label className="font-len" htmlFor="tipo_producto">Seleccione el tipo de producto:&nbsp;&nbsp; </label>
                <select name="tipo_producto" ref={register({ required: true })}>
                <option value="1">Revista Conexiones</option>
                <option value="2">Boletín La Ley al Día</option>
                <option value="3">DDIE Informa</option>
                </select>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-sm-12 ">
              <h4  className="font-len" >Tipo de población:</h4>
              <div className="custom-control custom-checkbox custom-control-inline">
                <input type="checkbox" className="custom-control-input" id="docente" name="docente" ref={register} />
                <label className="custom-control-label" htmlFor="docente">Docente</label>
              </div>
              <div className="custom-control custom-checkbox custom-control-inline">
                <input type="checkbox" className="custom-control-input" id="estudiante" name="estudiante" ref= {register({ required: true})}/>
                <label className="custom-control-label" htmlFor="estudiante">Estudiante</label>
                {errors.estudiante && <p>Este campo es requerido</p>}
                {/* {errors.estudiante &&
                  errors.estudiante.type === "required" &&
        "Your input is required"} */}
              </div>
              <div className="custom-control custom-checkbox custom-control-inline">
                <input type="checkbox" className="custom-control-input" id="director" name="director" ref={register} />
                <label className="custom-control-label" htmlFor="director">Director</label>
              </div>
              <div className="custom-control custom-checkbox custom-control-inline">
                <input type="checkbox" className="custom-control-input" id="asesor" name="director" ref={register} />
                <label className="custom-control-label" htmlFor="asesor">Asesor</label>
              </div>
            </div>
          </div>
          <input className="btn btn-block btn-main" type="submit" value="Guardar información"/>
        </form>
      
      </React.Fragment>
    )
}
