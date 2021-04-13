import React, { useState, useEffect } from "react";

import Tabla from '../Tabla/Tabla';

import dias from "./dias.json";
import meses from "./meses.json";
import referenciasJson from '../../data/referencias.json';

import obtener from '../../modulos/obtener';

import { filtrarId } from "gespro-utils/filtrar_array";
import "./celda_dias.css";
import { isJSDoc } from "typescript";

const referencias = referenciasJson[0];
var arregloEventos = [{}],
   consecutivo = [];
   const confTabla = {
    alterna: true,
    oscura: false,
    indice: false,
    ver: false,
    eliminar: false,
    encabezado: ["Inicia", "Finaliza", "Responsable"], //Títulos de tabla (Primera fila encabezado)
    campos: ["inicio", "fin", "funcionario"]  // Nombre de los cmapos del json
  };


export default function CeldasDias(props) {
  const [data, setData] = useState(null);
  
  //Bandera que indica que la solicitud y retorno de datos están resueltos
  const [datosListos, setDatosListos] = useState(false);

  let mesMontado = filtrarId(meses, props.idMes);
  // console.log("mesMontado", mesMontado);
  for (let index = 0; index < parseInt(mesMontado.maximo) + 1; index++) {
    arregloEventos[index] =  []
  }

  const claseTamano = "cal-" + props.conf.t;

  const cargaDatos = () => {
    //crea un arreglo con las reservaciones diarias

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
            // console.log("indice", indice);
            arregloEventos[indice] = element;
          }
          else {
            j = 0;
            arregloDiario = [];
            arregloDiario[j] = element;
            j++
          }
        }
      };
      crearGrilla(arregloEventos);
    });
  }

  const crearGrilla = (array) => {
    consecutivo = [];
    let contDia = 1;
    for (let index = 0; index < 39; index++) {
      let dataDia = { dia: 0, eventos: [] };
      if (index >= mesMontado.inicio) {
        if (contDia <= mesMontado.maximo) {
          dataDia.dia = contDia;
          dataDia.eventos = array[contDia];
          consecutivo.push(dataDia);
        } else {
          consecutivo.push(dataDia);
        }
        contDia++;
      } else {
        consecutivo.push(dataDia);
      }
    }
    console.log("consecutivo", consecutivo);
    setDatosListos(true);
  };

   useEffect(() => {
    for (let index = 0; index < parseInt(mesMontado.maximo) + 1; index++) {
      arregloEventos[index] =  []
    }
    setDatosListos(false);
    cargaDatos();
   }, [mesMontado]);

   useEffect(() => {
    consecutivo = [];
    cargaDatos();
   },[]);


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

  const jsxCelda = (item, i) => {
    let reservaciones = false;
    let eventos = item.eventos;
    // console.log("item Celdas", item);
    // console.log("eventos",item.eventos);
    // console.log("largo",item.eventos.length);
    if (eventos.length> 0) {
      reservaciones = true;
    }
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
        {item.dia}
        {reservaciones &&
          < >
          {/* <p>inicio fin  Funcionario</p>
          {eventos.map((item, i) =>
           <p>{item.inicio}{item.fin}{item.funcionario} </p>  
            )}
            */}
            <Tabla conf={confTabla} array={eventos} />
        
        </>
        }
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
      > {item.dia}
      </div>
    );

    return item.dia <= 9 ? tmpCeldaCero : tmpCelda;
  };

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
        {datosListos 
        ?
        <>
        {consecutivo.map((item, i) =>
          item.dia > 0 ? (
            jsxCelda(item, i)
          ) : (
            <div key={"grid" + i} className="celda-des"></div>
          )
        )}
        </>
        :    
        <>
          <div>Cargando datos...</div>
        </>
      }
      </div>
    </div>
  );
}
