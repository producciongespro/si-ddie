import React, {useEffect} from 'react';
import {faFileDownload} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Chart from 'chart.js';

var myChart;
 
const Grafico1 =(props)=> {
    var chartRef = React.createRef();  
    
    useEffect(()=>{
        console.log("Componente");        
        crearGrafico();
    },[])

    const crearGrafico=()=>{
        const ctx = chartRef.current.getContext("2d");
        console.log("contexto", ctx);
        myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: props.array.map(d => d.tipo),
                datasets: [{
                    label: props.titulo,
                    // data: props.array.map(d => d["COUNT(*)"] ),
                    data: props.array.map(d => d["total"] ),
                    backgroundColor: props.coloresGraficos.map(item=>item.fondo),
                    borderColor: props.coloresGraficos.map(item=>item.borde),
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }

  function downloadImage() {
    /* set new title */
    myChart.options.title.text = 'New Chart Title';
    myChart.update({
       duration: 0
    });
    // or, use
    // chart_variable.update(0);
 
    /* save as image */
    var link = document.createElement('a');
    link.href = myChart.toBase64Image();
    link.download = 'myImage.png';
    link.click();
 
    /* rollback to old title */
    myChart.options.title.text = 'Chart Title';
    myChart.update({
       duration: 0
    });
    // or, use
    // chart_variable.update(0);
 };

    
    return(
      <React.Fragment>
        <button className="btn-success btn-sm float-right" onClick={downloadImage}>
        <FontAwesomeIcon icon={faFileDownload} size="1x" /> Descargar imagen
        </button>
        <hr/>
        <canvas ref={chartRef}> </canvas>
        </React.Fragment>
    )
}

export default Grafico1;