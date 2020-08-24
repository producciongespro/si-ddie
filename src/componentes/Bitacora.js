import React, {useState, useEffect} from 'react';
import config from '../config';
import Tabla from '../componentes/Tabla';


function Bitacora (props) {
    const [datosJson, setDataJson ] = useState(null);

    useEffect(()=>{
        //console.log("props.idTipoUsuario",props.idTipoUsuario);
        
    let urlAPI=config.servidor+"obtener_bitacora2.php?tabla="+props.idTipoUsuario;        
        obtener(urlAPI);
    },[]);

    useEffect(()=>{
        console.log("datosJson",datosJson);        
    })

    async function obtener (urlAPI) {
        let response = await fetch(urlAPI);                
        setDataJson(await response.json());               
    }

    return (
        <React.Fragment>
                <div className="alert alert-primary" role="alert">
                    Admin/Bitácora
                </div>
                {
                    datosJson !==null ?
                    (                    
                        <Tabla array={datosJson} clase="table table-striped" modo="bitacora" />
                    ) :
                    (
                        <span>Por favor espere...</span>
                    )
                }

                
        </React.Fragment>
    )
    
}


export default Bitacora;