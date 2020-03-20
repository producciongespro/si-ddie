import React from 'react';

function GrupoCheck(props) {
    //console.log("************Props de Grupocheck", props.nivel); 
    console.log("************Props de Grupocheck Lista de poblaciones", props.listaPoblacion);
    console.log("*********** Props de GrupoCheck data poblaciones", props.poblacion);
    
    // var listaAnnos =  props.listaAnnos.split(',');
    var listaAnnos =  props.listaPoblacion;
    console.log("listaAnnos",listaAnnos);
    
    
    var Chk = (props)=>{
      // var tmpChk;
      // let encontrado = false;      
      // for (let index = 0; index < listaAnnos.length; index++) {
      //   //console.log("listaAnnos[index]",listaAnnos[index]);
      //   //console.log("props.value",props.value);               
      //   if (listaAnnos[index] === props.value) {
      //     encontrado = true
      //     tmpChk = <input  
      //                 type="checkbox" 
      //                 value={props.value}  
      //                 name={props.name} 
      //                 defaultChecked={true}                
      //               />
      //   } else {         
      //       if (encontrado !== true) {
      //         tmpChk = <input  
      //                 type="checkbox" 
      //                 value={props.value}  
      //                 name={props.name} 
      //                 defaultChecked={false}                
      //               />
      //       }
      //   }        
      // }          
      // return tmpChk;
    }
    
    
 
  return (
    <div className="row my-2">
      <div className="col-12">    
      {
        <h1>Poblacion</h1>
      //   (props.nivel === 2) &&
      //   (
      //     annosPrimaria.map((item, i) => (
      //       <div key={"primaria"+i} className="pretty p-default">
      //         <Chk  value={item.nombre} name={props.nombre }  />              
      //         <div className="state p-primary">
      //           <label>{item.nombre}</label>
      //         </div>
      //       </div>
      //     ))
      //   )
      // }
      // {
      //   (props.nivel === 3) &&
      //   (
      //     annosSecundaria.map((item, i) => (
      //       <div key={"secundaria"+i} className="pretty p-default">
      //         <Chk  value={item.nombre} name={props.nombre }  />                            
      //         <div className="state p-primary">
      //           <label>{item.nombre}</label>
      //         </div>
      //       </div>
      //     ))
      //   )
      }
      </div>
    </div>

  )
}


export default GrupoCheck;