import React, {useState, useEffect} from 'react';
import Tabla2 from '../componentes/Tabla2';

import referenciasJson from '../data/referencias.json';
import contenidosJson from '../data/contenidos_bitacora.json';

const referencias = referenciasJson[0];
const contenidos = contenidosJson;

function Bitacora (props) {
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
                          <Tabla2 array={datosJson} contenidos={contenidos} clase="table table-striped sombreado" modo="bitacora" />
                        
                     ) :
                     (
                        <span>Por favor espere...</span>
                     )
                }

                
        </React.Fragment>
    )
    
}


export default Bitacora;