import React from 'react';


export default function InputItem( props ) {
  console.log("entré"); 
  return (    
        <div className={props.elementClass}>
          <label className="font-len" htmlFor={props.nombre}>{props.textlabel}</label>
          <input type={props.tipo}  className="form-control" id={props.nombre} name={props.nombre} ref={props.referencia} />
          {/* {errors[props.nombre] && 'Last name is required'} */}
        </div>
  );
}