import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';


// context con los datos del usuario
import MyContext from '../modulos/MyContext';
import { sendData } from 'gespro-utils/akiri';

//Librerias
import alertify from 'alertifyjs';
import axios from 'axios';

import referenciasJson from '../data/referencias.json';
const referencias = referenciasJson[0];

export default function Loguin() {
  // const { register, handleSubmit, errors, clearError } = useForm();

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  // const onSubmit = data => console.log(data);

  // console.log(watch("example")); // watch input value by passing the name of it


  const [loading, setLoading] = useState(false);
  const { usuario, setUsuario } = useContext(MyContext);

  const enviarDatos = (data) => {
    // console.log("data desde sendatas", data);

    var datosUsuario = {
      correo: data.correo,
      idUsuario: data.idUsuario,
      tipoUsuario: data.tipoUsuario,
      fecha: "",
      isAccesado: true
    };
    // console.log("usuario LOGUEO", usuario);
    // console.log("usuario nuevo", datosUsuario);
    setUsuario(datosUsuario);
  }

  
  const onSubmit = (data) => {
    var mensajeError = "";
    // console.log("referencias.login", referencias.login);
    // console.log("data", data);
    sendData(referencias.login, data)
    .then(response => {
      response.error && (mensajeError = response.error_msg);
      // console.log("response",response, "mensajeError",mensajeError)
      if (!response.error) {
        enviarDatos(response);
      } else {
        console.log("Error IF acceso usuario");
        alertify
          .alert("Aviso", mensajeError, function () {
          });
      }
      
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="textos control-group form-group mt-2">

        <div className="row">
          <div className="form-group col-sm-12">
            <input className="form-control input-ingreso" type="text" placeholder="Digite el correo electrónico" {...register("correo", { required: true})}/>
            {errors.correo && <p className="errors">Este campo es requerido</p>} 
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <input className="form-control input-ingreso" type="password" placeholder="Digite la contraseña" {...register("claveEncriptada", { required: true})}/>
            {errors.claveEncriptada && <p className="errors">Este campo es requerido</p>}
          </div>
          <br />
        </div>

        <div className="row">
          <div className="col-md-12 pt-4">
            {/* <input className="btn btn-ingreso float-right" type="submit"/> */}
            <input className="btn btn-ingreso float-right" type="submit" value="Enviar"></input>
          </div>
        </div>

      </div>
    </form>
  );
}
