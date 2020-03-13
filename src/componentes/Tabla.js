import React from 'react';
// import {faPlus,faEye,faCaretDown} from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '@fortawesome/fontawesome-free/css/all.min.css';

function Tabla(props) {
    return (
        <table id="tblVer" className={props.clase}>
            <thead>
                <tr>
                    <th className="text-center" scope="col">#</th>
                    <th className="text-center" scope="col">Intervención</th>
                    {/* {
                        props.modo === "papelera" &&                    
                        <th className="text-center" scope="col">Tipo solicitante </th>                        
                    } */}
                    <th className="text-center" scope="col">Tema</th>                                                 
                    <th className="text-center" scope="col">Respuesta</th>  
                    {
                        props.modo === "visor" &&                    
                        <th  className="text-center" scope="col"> Editar </th>
                    }
                    {
                        props.modo === "visor" &&                    
                        <th className="text-center" scope="col"> Eliminar </th>
                    }
                    {
                        props.modo === "papelera" &&                    
                        <th className="text-center" scope="col"> Recuperar </th>                        
                    }
                    
                </tr>
            </thead>
            <tbody>
                {
                    props.array !== null &&
                    (
                        props.array.map((item, i) => (
                            <tr key={"item" + i}>
                                <th scope="row">{i + 1}</th>
                                <td >{item.tipo_intervencion}</td>
                                {
                                    props.modo === "papelera" &&   
                                    <td className="text-center">
                                            {item.tipo_intervencion}  
                                            {/* revisar */}
                                    </td>                                    
                                }
                                <td className="text-center" >{item.tema}</td>                               
                                {item.id_respuesta ?
                                    <td className="text-center" >{item.tipo_respuesta}</td>
                                :
                                    <td className="text-center text-danger" >Pendiente</td>
                                
                                }
 
                                {
                                    props.modo === "papelera" &&   
                                    <td className="text-center">
                                            <i id={item.id} onClick={props.handleRecuperar} className="fas fa-recycle"></i>
                                    </td>                                    
                                } 
                                {
                                    props.modo === "visor" &&   
                                     <td className="text-center">
                                        {/* <span id={item.id} onClick={props.handleShow}>Borrar<FontAwesomeIcon icon={faCaretDown} size="1x" /></span> */}
                                        <i id={item.id} onClick={props.handleEditarConsulta} className="fas fa-pencil-alt fas-editar"></i>
                                    </td>

                                }
                                {
                                    props.modo === "visor" &&   
                                    <td className= "text-center" >
                                        <i id={item.id} onClick={props.handleEliminarConsulta} className="far fa-trash-alt fas-editar"></i>
                                    </td>
                                }                                                                  
                                        
                                

                            </tr>
                        ))
                    )
                }
            </tbody>
        </table>
    )
}

export default Tabla;