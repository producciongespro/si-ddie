import React from 'react';

function GrupoCheck(props) {
    // console.log("************Props de Grupocheck Lista de poblaciones", props.listaPoblacion);
    // console.log("*********** Props de GrupoCheck data poblaciones", props.poblacion);
    var poblacion = JSON.parse(props.poblacion);

    console.log("poblacion", poblacion);
    
    var listaPoblacion =  props.listaPoblacion;
    for (let index = 0; index < listaPoblacion.length; index++) {
      for (let i = 0; i < poblacion.length; i++) {
        const elementP = poblacion[i].id;               
        if(listaPoblacion[index].id === elementP){
          listaPoblacion[index].valor = true;
          break;
        }
        else
        {
          listaPoblacion[index].valor = false;
        }
      }
      
      
    }
    console.log("listaPoblacion",listaPoblacion);
    
    
    var Chk = (props)=>{
      // console.log("props.value", prox.value);
      // lista
      
      var tmpChk;
      let encontrado = false;      
      for (let index = 0; index < listaPoblacion.length; index++) {
        // <h1>Hola</h1>
        //console.log("listaAnnos[index]",listaAnnos[index]);
        //console.log("props.value",props.value);               
        // if (listaPoblacion[index].id === props.value) {
        //   encontrado = true
        //   tmpChk = <input  
        //               type="checkbox" 
        //               value={props.value}  
        //               name={props.name} 
        //               defaultChecked={true}                
        //             />
        // } else {         
        //     if (encontrado !== true) {
              tmpChk = <input  
                      type="checkbox" 
                      value={props.value}  
                      name={props.name} 
                      defaultChecked={props.chequeado}                
                    />
        //     }
        // }        
      }          
      return tmpChk;
    }
    
    
 
  return (
    
    <div className="row my-2">
      <div className="col-12">    
      {
        // (props.nivel === 2) &&
        // (
          listaPoblacion.map((item, i) => (
            <div key={"poblacion"+i} className="pretty p-default">
              <Chk  value={item.nombre} name={props.nombre } chequeado={item.valor} />              
              <div className="state p-primary">
                <label>{item.nombre}</label>
              </div>
            </div>
          ))
        // )
      }

      </div>
    </div>

  )
};
export default GrupoCheck;