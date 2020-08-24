import React, {useState, useEffect} from 'react';
import Tabla from '../componentes/Tabla';

import referenciasJson from '../data/referencias.json';

const referencias = referenciasJson[0];


function Bitacora (props) {
    const [datosJson, setDatosJson ] = useState(null);

    
  async function obtener() {
    var url = referencias.consultabitacora;
    let resp = null;
    
    resp = await fetch(url);
    setDatosJson(await resp.json());
  }

    useEffect(()=>{
        obtener();
    },[]);

    useEffect(()=>{
        console.log("datosJson",datosJson);        
    })


    return (
        <React.Fragment>
                <div className="alert alert-primary" role="alert">
                    Admin/Bitácora
                </div>
                {
                    // datosJson !==null ?
                    // (                    
                    //      <Tabla array={datosJson} clase="table table-striped" modo="visor" />
                        
                    // ) :
                    // (
                        <span>Por favor espere...</span>
                    // )
                }

                
        </React.Fragment>
    )
    
}


export default Bitacora;