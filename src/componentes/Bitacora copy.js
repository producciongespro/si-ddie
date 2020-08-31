import React, {useState, useEffect} from 'react';
import Tabla2 from './Tabla2';

import referenciasJson from '../data/referencias.json';
import contenidosJson from '../data/contenidos_bitacora.json';

const referencias = referenciasJson[0];
const contenidos = contenidosJson;

export default function Bitacora() {

    const [datosJson, setDatosJson ] = useState(null);
    const [posts, setPosts ] = useState(null);
    const [loading, setDatosJson ] = useState(null);
    const [datosJson, setDatosJson ] = useState(null);
    const [datosJson, setDatosJson ] = useState(null);

    
  async function obtener() {
    var url = referencias.consultabitacora;
    let resp = null;
    
    resp = await fetch(url);
    setDatosJson(await resp.json());
  }

  useEffect(() => {
    obtener();
  }, []);

    useEffect(()=>{
        console.log("datosJson",datosJson);    
        console.log("contenidos",contenidos)    
    })


    return (
        <React.Fragment>
                <div className="alert alert-primary" role="alert">
                    Admin/Bitácora
                </div>
                {
                     datosJson !==null ?
                     (                    
                        //   <Tabla array={datosJson} clase="table table-striped" modo="bitacora" />
                          <Tabla2 array={datosJson} contenidos={contenidos} clase="table table-striped sombreado"/>
                        
                     ) :
                     (
                        <span>Por favor espere...</span>
                     )
                }

                
        </React.Fragment>
    )
    
};