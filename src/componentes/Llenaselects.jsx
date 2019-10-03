import React, { Component } from 'react';

class Llenaselects extends Component {
    constructor(props) {
      super(props);
      this.state = { 
       }
    }
  

    render () {
        // <select sefaultValue={'DEFAULT'}  className="form-control"  name="consultas">              
        // <option  disabled value="DEFAULT">Seleccione la opción</option>
        // <Llenaselects estado={this.state.tipo_intervencion} dato={this.state.consulta} />
        var idconsulta = this.props.idintervencion,  //id de la consulta seleccionada
             esta2 = this.props.estado, //tabla 
             nombre = esta2.tipo;
        console.log("IdConsulta", idconsulta);
        console.log("estado ", esta2);
        
        
        let optionItems =   esta2.map((item) => {
                if (item.id === idconsulta) {
                return <option  key={item.id} value='DEFAULT'>{item.id} - {item.tipo}   </option> 
            }
                 return <option key={item.id} value={item.id}>{item.id} - {item.tipo}   </option>;
          });

         return (
        <div>
              <select defaultValue={'DEFAULT'} className="form-control"  name={nombre}>
               {optionItems}
              </select>
        </div>
        )
   }
}

export default Llenaselects;