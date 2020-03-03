import React, { Component, useState, useContext } from 'react';
import { useForm } from 'react-hook-form';


// context con los datos del usuario
import MyContext from '../modulos/MyContext';

import {ValidationForm, TextInput} from 'react-bootstrap4-form-validation';
import LoadingSpinner from './spinner/LoadingSpinner';


//Librerias
import alertify from 'alertifyjs';
import axios from 'axios';

import referenciasJson from '../data/referencias.json';
const referencias = referenciasJson[0];

export default function Loguin() {
  const { register, handleSubmit, errors, clearError } = useForm();

  const [loading, setLoading] = useState(false);
  const { usuario, setUsuario } = useContext(MyContext);

  const sendDatas = (data) => {         
    // console.log("data desde sendatas", data);
     
    var datosUsuario = {
      correo: data.correo,
      idUsuario: data.idUsuario,
      tipoUsuario: data.tipoUsuario,
      isAccesado : true};
      // console.log("usuario LOGUEO", usuario);
      // console.log("usuario nuevo", datosUsuario);
      setUsuario(datosUsuario);

  }

  const onSubmit = (data, e) => {
    e.preventDefault();
    axios.post(referencias.login, data)
      .then(function (response) {
        const mensajeError = response.data.error_msg;
        // console.log("response",response/*  */)
        if (response.data.error === false) {
          sendDatas(response.data);
        } else {
          console.log("Error IF acceso usuario");
          alertify
            .alert("Aviso", mensajeError, function () {
            });
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => {
        // me.setState({
        //   ajaxOcupado: false
        // })
      });

  }

      return (
        <React.Fragment>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="textos control-group form-group mt-2">
              <div className="row">
                <div className="form-group col-sm-12">
                  <input className="form-control input-ingreso" type="text" placeholder="Digite el correo electrónico" id="correo" name="correo" ref={register({required: true})} value="ana.araya.salazar@mep.go.cr"/><br />
                  {errors.correo && <p className="errors">Este campo es requerido</p>}
                </div>
              </div>

              <div className="row">
                  <div className="col-12">
                    <input className="form-control input-ingreso" type="password" placeholder="Digite la contraseña" id="claveEncriptada" name="claveEncriptada" ref={register({required: true})} value='a' /><br />
                    {errors.claveEncriptada && <p className="errors">Este campo es requerido</p>} </div>
              </div>
              <br/>
            </div>
            <div className="row">
              <div className="col-md-12">
                <input className="btn btn-ingreso float-right" type="submit" value="Guardar registro" />
              </div>
            </div>
        </form>
        </React.Fragment>
      );
}
