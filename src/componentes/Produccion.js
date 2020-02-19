import React, {useState, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import obtener from '../modulos/obtener';
import CheckBox from '../componentes/CheckBox';
import InputItem from '../componentes/InputItem';

import axios from 'axios';

import mostrarAlerta from './Alerta.js';

import "../css/form.css";

import referenciasJson from '../data/referencias.json';
import enviar from '../modulos/enviar';

const referencias = referenciasJson[0];

var idUser = sessionStorage.getItem("id_usuario");


export default function Form1() {
    const { register, handleSubmit, errors } = useForm();

    //Estado para controlar la carga del json de productos:
    const [productos, setProductos] = useState(null);
    
    //Estado que maneja el producto seleccionado por el usuario
    const [producto, setProducto] = useState(null);

    //Estado que carga las poblaciones del json del servidor
    const [poblaciones, setPoblaciones] = useState(null);

    //Cargado se cambia a True cuando se termina la carga de json del servidor
    const [cargado, setCargado] = useState(false);


    // const onSubmit = data => console.log(data);
    const onSubmit = (data, e) => {
      console.log("DATA", data);
      
      if(data.id_producto !== "1"){
        for (let index = 1; index < 9 ; index++) {
          const element = data["poblacion_"+ index];
          data["poblacion_"+ index] = +element;                                
        }
      }
      let url = referencias.guardaconsulta+"?tabla_destino=productos";
      console.log("url desde submit", url);
      
      enviar(url, data, function (msj) { console.log(msj);
        });
      setProducto(0);
      e.target.reset(); // reset after form submit

    };
    console.log(errors);


    useEffect(() => {
        //Acción que se ejecuta una vez que se monta el componente
        console.log("Componente montado");
        let urlProductos= referencias.consultageneral+"?tabla=tipo_productos",
            urlPoblacion = referencias.consultageneral+"?tabla=productos_poblacion_meta";
        //Carga el primer json:
        obtener(urlProductos, function (data) {
            console.log("datos", data);
            setProductos(data);
            //Carga el segundo select en el callback del primer "obtner":
            obtener(urlPoblacion, function (data) {  
                //Callback del segundo obtener
                console.log("Poblaciones", data);
                setPoblaciones(data);
                //Activa cargado para que meuistre el formulario:
                 setCargado(true)
            })

           
        })
    }, []);


    const handleSeleccionarProducto =(e)=>{
        //obtenr el valor de seleccion
        console.log("id del producto seleccionado", e.target.value);
        parseInt(e.target.value)
        setProducto(parseInt(e.target.value));
        
    }

    return (        
            cargado ?                    
      (
        <div className="col-12">
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="form-group col-sm-6 ">
              <label className="font-len" htmlFor="id_producto">Seleccione el tipo de producto:&nbsp;&nbsp;</label>
            <select className="custom-select"  defaultValue="0" onChange={handleSeleccionarProducto} name="id_producto" ref={register({required: true})}>
            <option value="0" disabled>Seleccione...</option>
               {
                  
                   productos.map((item,i)=>(
                   <option key={"producto"+i} value={item.id}>{item.tipo}</option>
                   ))
               }
            </select>
          </div>
          {producto === 4 &&
              <React.Fragment>
                <InputItem  elementClass= "col-sm-6 my-2 form-group"  tipo="number" nombre= "numero_consecutivo" textlabel="Número consecutivo"  referencia={register({required: true})}/>
              </React.Fragment>
              }
              {producto === 7 &&
                <React.Fragment>
                  <InputItem  elementClass= "col-sm-6 my-2 form-group"  tipo="text" nombre= "tema_video_divulgacion" textlabel="Tema del video"  referencia={register({required: true})} />
                </React.Fragment>
              }   
        </div>   
        {producto > 1 && 
          <div className="row">
            <div className="form-group col-sm-12 my-2">
              <CheckBox  array={poblaciones} register={register}  />
            </div>
          </div> }
        {
        producto === 1 && (
          <div className="row">
            <InputItem  elementClass= "col-sm-3 my-2 form-group"  tipo="number" nombre= "volumen_revista" textlabel="Volumen"  referencia={register({required: true})} />
            <InputItem  elementClass= "col-sm-3 my-2 form-group"  tipo="number" nombre= "numero_revista"  textlabel="Número"   referencia={register({required: true})} />
            <InputItem  elementClass= "col-sm-3 my-2 form-group"  tipo="number" nombre= "mes_revista"     textlabel="Mes"      referencia={register({required: true})}  />
            <InputItem  elementClass= "col-sm-3 my-2 form-group"  tipo="number" nombre= "anno_revista"    textlabel="Año"      referencia={register({required: true})}  />
          </div>
          )
        }
        <div className="row">
          <div className="form-group col-sm-6">
            <label className="font-len" htmlFor="cantidad">Cantidad:</label>
            <input className="form-control" type="number" placeholder="cantidad" id="cantidad" name="cantidad" ref={register({required: true})} />
          </div>

          <div className="form-group col-sm-6">
            <label className="font-len" htmlFor="fecha">Fecha:</label>
            <input  type="date" className="form-control" id="fecha" name="fecha" placeholder="fecha" ref={register({required: true})} />
          </div>
          
        </div>
        <hr/>
        <div className="row">
          <div className="form-group col-sm-6">
            <label className="font-len" htmlFor="cantidad_beneficiarios">Cantidad de beneficiarios:</label>
            <input type="number" className="form-control" id="cantidad_beneficiarios" name="cantidad_beneficiarios" placeholder="Cantida de beneficiarios" ref={register({required: true})} />
          </div>
          <hr/>
        </div>

        <div className={"form-group d-none"}>
            <input type="text" className="form-control" name="id_usuario" id="id_usuario" defaultValue ={idUser} ref={register}/>    
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