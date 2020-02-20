
  const obtenerValoresCheck =(nombre)=>{
    let listaAnnos = [];
    const chk  = document.getElementsByName(nombre);
    for (let index = 0; index < chk.length; index++) { 
      if (chk[index].checked ) {
        const poblaciones =  chk[index].id;
        listaAnnos.push(poblaciones);   
      }
       
    }
    return JSON.stringify(listaAnnos);
  }

export default obtenerValoresCheck;