import React from 'react';

export default function InputItem( props ) {
  return (    
        <React.Fragment>
          <label className="font-len" htmlFor={props.nombre}>{props.textlabel}</label>
          <input type={props.tipo}  className="form-control" id={props.nombre} name={props.nombre} ref={props.referencia} placeholder={props.placeholderText} />
        </React.Fragment>
  );
}