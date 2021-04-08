import React, { useState,useEffect} from "react";
import dias from "./dias.json";
import meses from "./meses.json";
import referenciasJson from '../../data/referencias.json';

import obtener from '../../modulos/obtener';

import { filtrarId } from "gespro-utils/filtrar_array";
import "./celda_dias.css";

const referencias = referenciasJson[0];

export default function CeldasDias(props) {
  const [reservado,setReservado] = useState(false);
  const [data, setData] = useState(null);

  let mesMontado = filtrarId(meses, props.idMes);
  console.log("mesMontado", mesMontado);
  var consecutivo = [];
  var datada= "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur doloribus dolor iusto explicabo, velit dolorem fugit natus quod amet, sunt nam, et reiciendis ipsa vero deserunt debitis. Veniam, esse sequi.";
  const claseTamano = "cal-" + props.conf.t;

  var consulta = referencias.consultafechareserva + "?fecha='2021-04-19'";
console.log("consulta", consulta);
  useEffect(() => {
    obtener(consulta, function (datos) {
      setData(datos);
      console.log("Datos por fecha", datos);
    })
  }, []);


  const handleSelecFecha = (e) => {
    let celda = e.target;
    const seleccion= {
      "id": celda.id,
      "dia": celda.dataset.dia,
      "mes": celda.dataset.mes.split("-")[1],
      "anno": celda.dataset.mes.split("-")[0]
    }

    props.obtenerFecha(seleccion);
  };

  const crearGrilla = () => {
    let contDia = 1;
    for (let index = 0; index < 39; index++) {
      if (index >= mesMontado.inicio) {
        if (contDia <= mesMontado.maximo) {
          consecutivo.push(contDia);
        } else {
          consecutivo.push(0);
        }
        contDia++;
      } else {
        consecutivo.push(0);
      }
    }
    //        console.log(consecutivo);
  };

  const dataDia = (fecha) => {
    console.log("Fecha", fecha);

    //  let tmpCelda = ( )
     }

  const jsxCelda = (item, i) => {
    console.log("item Celdas", item);
    let claseCelda = null;
    if (props.hoy.dia === item && props.hoy.mes === parseInt(mesMontado.id)) {
      claseCelda = "celda-hoy";
    } else {
      claseCelda = "celda";
    }

    let tmpCelda = (
      <div
        key={"grid" + i}
        tabIndex="2"
        data-dia={item}
        data-mes={mesMontado.renderMes}
        id={mesMontado.renderMes + item}
        onClick={handleSelecFecha}
        onKeyPress={handleSelecFecha}
        className={claseCelda + " " + claseTamano}
        role="button"
        ref={props.agregarRefs}
      >
        {item}
        {reservado && dataDia(mesMontado.renderMes + item)}
      </div>
    );

    let tmpCeldaCero = (
      <div
        key={"grid" + i}
        tabIndex="2"
        data-dia={item}
        data-mes={mesMontado.renderMes}
        id={mesMontado.renderMes + "0" + item}
        onClick={handleSelecFecha}  
        onKeyPress={handleSelecFecha}      
        className={claseCelda + " " + claseTamano}
        role="button"
        ref={props.agregarRefs}
      >
        {item}
        {reservado && datada}
      </div>
    );

    return item <= 9 ? tmpCeldaCero : tmpCelda;
  };

  crearGrilla();

  return (
    <div className="contenedor fondo-calendario">
      <div className="row">
        {dias.map((item) => (
          <div key={"dia" + item.id} className={"fila-dias " + claseTamano}>
            {item.nombre}
          </div>
        ))}
      </div>
      <div className="row">
        {consecutivo.map((item, i) =>
          item > 0 ? (
            jsxCelda(item, i)
          ) : (
            <div key={"grid" + i} className="celda-des"></div>
          )
        )}
      </div>
    </div>
  );
}
