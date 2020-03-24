import React from 'react';

function GrupoCheck(props) {
    console.log("************Props de Grupocheck Lista de poblaciones", props.listaPoblacion);
    console.log("*********** Props de GrupoCheck data poblaciones", props.poblacion);
 
    
    var poblacion = JSON.parse(props.poblacion),
        listaPoblacion =  props.listaPoblacion;
    console.log("props.poblacion.length",poblacion.length);
    console.log("props.poblacion",poblacion);
    if(poblacion.length>0){
      console.log("trae información");
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
    }
    else {
      for (let index = 0; index < listaPoblacion.length; index++) {
            listaPoblacion[index].valor = false;
          }
      console.log("población viene VACÍA");
      
    }

    // console.log("poblacion", poblacion);
    
    // var listaPoblacion =  props.listaPoblacion;
    // for (let index = 0; index < listaPoblacion.length; index++) {
    //   for (let i = 0; i < poblacion.length; i++) {
    //     const elementP = poblacion[i].id;               
    //     if(listaPoblacion[index].id === elementP){
    //       listaPoblacion[index].valor = true;
    //       break;
    //     }
    //     else
    //     {
    //       listaPoblacion[index].valor = false;
    //     }
    //   }
    // }
    // console.log("listaPoblacion",listaPoblacion);
    
    
    var Chk = (props)=>{
      // console.log("props.value", prox.value);
      // lista
      
      var tmpChk;
      let encontrado = false;      
      for (let index = 0; index < listaPoblacion.length; index++) {
              tmpChk = <input  
                      type="checkbox" 
                      id={props.idCheck+"_checkbox"}
                      value={props.value}  
                      name={props.name} 
                      defaultChecked={props.chequeado}          
                      onChange={props.handleChangeCheck}
                    />    
      }          
      return tmpChk;
    }
    
    
 
  return (
    
    <div className="row my-2">
      <div className="col-12">
      {
        listaPoblacion.map((item, i) => (
          <div key={"poblacion"+i} className="pretty p-default">
            <Chk  value={item.nombre} name={props.nombre } idCheck={i+1} chequeado={item.valor}  handleChangeCheck={props.handleChange} />              
            <div className="state p-primary">
              <label>{item.nombre}</label>
            </div>
          </div>
        ))
      }

      </div>
    </div>

  )
};
export default GrupoCheck;