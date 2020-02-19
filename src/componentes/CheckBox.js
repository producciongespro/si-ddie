import React from 'react';


export default function CheckBox( props ) {
  
  return (    
    // <option defaultValue="0" disabled>Escoja...</option>
    props.array.map((item, i)=>(
          //  <span  key={"chk"+i}>
          //       <input type="checkbox" placeholder={item.nombre} name={item.nombre} ref={props.register} /> 
          //       {item.nombre}
          //  </span>
          <div  key={"chk"+i} className="custom-control custom-checkbox custom-control-inline">
            <input type="checkbox" className="custom-control-input"  placeholder={item.nombre} id={"poblacion_"+item.id} name={"poblacion_"+item.id} ref={props.register}/>
            <label className="custom-control-label" htmlFor={"poblacion_"+item.id} >{item.nombre}</label>
         </div>
    ))
      
      
       
  );
}