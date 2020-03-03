import React from 'react';

function Tabla(props) {
    return (
        <table id="tblNivel" className={props.clase}>
            <thead>
                <tr>
                    <th className="text-center" scope="col">#</th>
                    <th className="text-center" scope="col">Nombre</th>
                    {
                        props.modo === "papelera" &&                    
                        <th className="text-center" scope="col"> Asignatura </th>                        
                    }
                    <th className="text-center" scope="col">Año</th>                                                 
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
                            <tr key={"recurso" + i}>
                                <th scope="row">{i + 1}</th>
                                <td >{item.nombre}</td>
                                {
                                    props.modo === "papelera" &&   
                                    <td className="text-center">
                                            {item.materia}
                                    </td>                                    
                                }
                                <td className="text-center" >{item.anno}</td>
 
                                {
                                    props.modo === "papelera" &&   
                                    <td className="text-center">
                                            <i id={item.id} onClick={props.handleRecuperarRecurso} className="fas fa-recycle"></i>
                                    </td>                                    
                                } 
                                {
                                    props.modo === "visor" &&   
                                     <td>
                                     <i id={item.id} onClick={props.handleShow} className="fas fa-pencil-alt"></i>
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