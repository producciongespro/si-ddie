import React, {useEffect} from 'react';
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