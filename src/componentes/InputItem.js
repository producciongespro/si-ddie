import React from 'react';

export default function InputItem( props ) {
  
  return (    
        <React.Fragment>
          <label className="font-len" htmlFor={props.nombre}>{props.textlabel}</label>
          {
           props.defaultValor ?
              <input type={props.tipo}  defaultValue={props.defaultValor} className="form-control" id={props.nombre} name={props.nombre} ref={props.referencia} placeholder={props.placeholderText} />
            :
              <input type={props.tipo}  className="form-control" id={props.nombre} name={props.nombre} ref={props.referencia} placeholder={props.placeholderText} />
          }
        </React.Fragment>
  );
}