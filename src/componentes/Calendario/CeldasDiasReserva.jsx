import React, { useState, useEffect } from "react";

import dias from "./dias.json";
import meses from "./meses.json";
import referenciasJson from '../../data/referencias.json';

import obtener from '../../modulos/obtener';

import { filtrarId } from "gespro-utils/filtrar_array";
import "./celda_dias.css";
import { isJSDoc } from "typescript";

const referencias = referenciasJson[0];
var arregloEventos = [{}];


export default function CeldasDias(props) {
  const [data, setData] = useState(null);

  let mesMontado = filtrarId(meses, props.idMes);
  console.log("mesMontado", mesMontado);
  for (let index = 0; index < parseInt(mesMontado.maximo) + 1; index++) {
    arregloEventos[index] = [];
  }
  var consecutivo = [];
  // arregloEventos = [];

  const claseTamano = "cal-" + props.conf.t;

  async function obtenerDatos(cb) {
   
    // // 1 Consultas       
    let response1 = await fetch(urlIngresos);
    tmpIngresos = await response1.json()

       
    // 2 Intervención
    let response2 = await fetch(urlTipoIngresos);
    tipoIngresos = await response2.json();

    // 6 Eliminados
    let response6 = await fetch(urlEliminadosIngresos);
    tmpEliminados = await response6.json();

    cb();   
  };

  const cargaDatos = ()=>{
    let mes = props.idMes;
    (parseInt(mes) < 10) && (mes = "0" + mes);

    var consulta = referencias.consultafechareserva + "?mes=" + mes;
    obtener(consulta, function (datos) {
      setData(datos);
      var arregloDiario = [];

      var elementFechaAnt = null;
      var j = 0;
      for (let index = 0; index < datos.length; index++) {
        const element = datos[index];
        const elementFecha = datos[index].fecha;
        (index === 0) && (elementFechaAnt = datos[index].fecha);

        if (elementFechaAnt === elementFecha) {
          arregloDiario[j] = element;
          j++;
          if (index === datos.length - 1) {
            const indice = parseInt(elementFecha.slice(elementFecha.length - 2, elementFecha.length + 1));
            arregloEventos[indice] = arregloDiario;
          }
        }
        else {
          const indice = parseInt(elementFechaAnt.slice(elementFechaAnt.length - 2, elementFechaAnt.length + 1));
          arregloEventos[indice] = arregloDiario;
          elementFechaAnt = elementFecha;
          if (index === datos.length - 1) {
            const indice = parseInt(elementFecha.slice(elementFecha.length - 2, elementFecha.length + 1));
            console.log("indice", indice);
            arregloDiario[j] = element;
            arregloEventos[indice] = arregloDiario;
          }
          else {
            j = 0;
            arregloDiario = [];
            arregloDiario[j] = element;
            j++
          }
        }
      }
      console.log("arregloEventos 8", arregloEventos[8][0]);
      // console.log("Object.keys(arregloEventos)",Object.keys(arregloEventos));
    });
  }

  useEffect(() => {
   cargaDatos();
  }, [mesMontado]);

  const handleSelecFecha = (e) => {
    let celda = e.currentTarget;
    const seleccion = {
      "id": celda.id,
      "dia": celda.dataset.dia,
      "mes": celda.dataset.mes.split("-")[1],
      "anno": celda.dataset.mes.split("-")[0]
    }

    props.obtenerFecha(seleccion);
  };

  const crearGrilla = () => {
    let contDia = { dia: 1, arreglo: [1, 2, 3, 4, 5] };
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
    console.log(consecutivo);
    console.log(arregloEventos[8][0]);
  };

  const dataDia = (item) => {
    let i = parseInt(item);
    console.log("arregloEventos datadia", arregloEventos[item][0]);
    //  console.log("Object.keys(arregloEventos)",Object.keys(arregloEventos));
    return item
  };

  const jsxCelda = (item, i) => {
    // cargaEventos(item)
    // console.log("item Celdas", item);
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
