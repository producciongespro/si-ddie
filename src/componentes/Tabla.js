import React from 'react';
// import {faPlus,faEye,faCaretDown} from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '@fortawesome/fontawesome-free/css/all.min.css';

function Tabla(props) {
    return (
        <table id="tblVer" className={props.clase}>
            <thead>
                <tr>
                    <th  scope="col">#</th>
                    <th  scope="col">Intervención</th>
                    {/* {
                        props.modo === "papelera" &&                    
                        <th className="text-center" scope="col">Tipo solicitante </th>                        
                    } */}
                    <th  scope="col">Tema</th>                                                 
                    <th  scope="col">Respuesta</th>  
                    {
                        props.modo === "visor" &&                    
                        <th   scope="col"> Editar </th>
                    }
                    {
                        props.modo === "visor" &&                    
                        <th  scope="col"> Eliminar </th>
                    }
                    {
                        props.modo === "papelera" &&                    
                        <th  scope="col"> Recuperar </th>                        
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
                                            {item.tipo_intervencion}  
                                            {/* revisar */}
                                    {/* </td>                                     */}
                                {/* // }  */}
                                <td  >{item.tema}</td>                               
                                {item.id_respuesta ?
                                    <td  >{item.tipo_respuesta}</td>
                                :
                                    <td className="text-danger" >Pendiente</td>
                                
                                }
 
                                {
                                    props.modo === "papelera" &&   
                                    <td >
                                            <i id={item.id} onClick={props.handleRecuperar} className="fas fa-recycle fas-editar"></i>
                                    </td>                                    
                                } 
                                {
                                    props.modo === "visor" &&   
                                     <td >
                                        {/* <span id={item.id} onClick={props.handleShow}>Borrar<FontAwesomeIcon icon={faCaretDown} size="1x" /></span> */}
                                        <i id={item.id} onClick={props.handleEditarConsulta} className="fas fa-pencil-alt fas-editar"></i>
                                    </td>

                                }
                                {
                                    props.modo === "visor" &&   
                                    <td>
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