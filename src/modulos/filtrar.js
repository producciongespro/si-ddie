function filtrar (array, llave, valor ) {    
    
    //console.log("*********Filtro por criterio llave", llave);    
    //console.log("******Valor de la llave", valor );    
    console.log("ARRAY ORIGINAL (PARA FILTRAR)", array);         

    
    if (array.length > 0) {
        const limite = array.length;
        var tmpData = [];
        for (let index = 0; index < limite; index++) { 
            //TODO Esta validación se debe quitar ya que hace menos eficiente el filtrado
            //Pero para ello sedebe indexar el campo materia en recursos
                
                    if ( parseInt( array[index][ llave ]) === valor  ) {
                        tmpData.push(array[index]);
                    }              
                }
                //  else {
                //     if ( array[index][ llave ] === valor  ) {
                //         tmpData.push(array[index]);
                //     }              
                // }

                
        }                 
    //console.log("Arreglo retornado", tmpData);    
    return tmpData;
}

export default filtrar;