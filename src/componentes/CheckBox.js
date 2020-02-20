import React from 'react';


export default function CheckBox( props ) {
  
  return (    
    props.array.map((item, i)=>(
          <div  key={"chk"+i} className="custom-control custom-checkbox custom-control-inline">
            {(item.id==='12')
            ?
            <input type="checkbox" className="custom-control-input"  placeholder={item.nombre} id={item.id} name={props.nombre} ref={props.register} onChange={props.handleChange}/>
            :
              <input type="checkbox" className="custom-control-input"  placeholder={item.nombre} id={item.id} name={props.nombre} ref={props.register}/>
            }           
            <label className="custom-control-label" htmlFor={item.id} >{item.nombre}</label>
         </div>
    ))
      
      
       
  );
}