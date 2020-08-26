// import React, {useEffect} from 'react';
import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import Chart from 'chart.js';


 
const Grafico1 =(props)=> {
    var chartRef = React.createRef();
   
    
    useEffect(()=>{
        console.log("Componente");        
        crearGrafico();
    },[])

    const crearGrafico=()=>{
        const ctx = chartRef.current.getContext("2d");
        console.log("contexto", ctx);
    
    const downloadImage = (chart_variable)  => {
            /* set new title */
            chart_variable.options.title.text = 'New Chart Title';
            chart_variable.update({
               duration: 0
            });
            // or, use
            // chart_variable.update(0);
         
            /* save as image */
            var link = document.createElement('a');
            link.href = chart_variable.toBase64Image();
            link.download = 'myImage.png';
            link.click();
         
            /* rollback to old title */
            chart_variable.options.title.text = 'Chart Title';
            chart_variable.update({
               duration: 0
            });
            // or, use
            // chart_variable.update(0);
    };


var myChart = new Chart(ctx, {
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

    return(
        <canvas ref={chartRef} />
    )
}

export default Grafico1;