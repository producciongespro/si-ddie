
import mostrarAlerta from '../componentes/Alerta.js';
const axios = require('axios');

function enviar(url, data, cb) {
  console.log("url desde enviar", url);

  console.log("data a enviar", data);
  axios.post(url, data)    
  .then(function (response) {
      mostrarAlerta( "Alerta", response.data['mensaje']);
     cb(response);
  })
  .catch(function (error) {
    console.log("Este es el error en envío",error);       
  })
  .finally(function () {
    console.log("Transacción finalizada");        
  });
};

export default enviar;