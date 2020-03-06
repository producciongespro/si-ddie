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
                                {/* {
                                    props.modo === "papelera" &&   
                                    <td className="text-center">
                                            {item.materia}
                                    </td>                                    
                                } */}
                                <td className="text-center" >{item.tema}</td>
                                {console.log("respuesta", item.id_respuesta)}
                                {/* <td className="text-center" >{item.tipo_respuesta}</td>  */}
                               
                                {item.id_respuesta ?
                                    <td className="text-center" >{item.tipo_respuesta}</td>
                                :
                                    <td className="text-center text-danger" >Pendiente</td>
                                
                                }
 
                                {/* {
                                    props.modo === "papelera" &&   
                                    <td className="text-center">
                                            <i id={item.id} onClick={props.handleRecuperarRecurso} className="fas fa-recycle"></i>
                                    </td>                                    
                                }  */}
                                {
                                    props.modo === "visor" &&   
                                     <td>
                                        {/* <span id={item.id} onClick={props.handleShow}>Borrar<FontAwesomeIcon icon={faCaretDown} size="1x" /></span> */}
                                        <i id={item.id} onClick={props.handleEditarConsulta} className="fas fa-pencil-alt"></i>
                                    </td>

                                }
                                {
                                    props.modo === "visor" &&   
                                    <td className="text-center" >
                                        <i id={item.id} onClick={props.handleEliminarRecurso} className="far fa-trash-alt"></i>
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