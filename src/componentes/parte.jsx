class Produccion extends Component {
  constructor(props) {
    super(props);
         // If you want to use the reset state function, you need to have a reference to the ValidationForm component
        //If your React < 16.3, check https://reactjs.org/docs/refs-and-the-dom.html#callback-refs
    this.formRef = React.createRef();

    this.state = { 
      id_producto : "",
      id_usuario : "",
      cantidad1   : "",
      fecha      : "",
      cantidad_beneficiarios : "",
      numero_consecutivo : "",
      tema_video_divulgacion  : "",
      volumen_revista : "",
      numero_revista : "",
      mes_revista : "",
      anno_revista : "",
      poblacion_1 : false,
      poblacion_2 : false,
      poblacion_3 : false,
      poblacion_4 : false,
      poblacion_5 : false,
      poblacion_6 : false,
      poblacion_7 : false,
      poblacion_8 : false,

      tipo_productos : [],
      productos_poblacion_meta : [],
      arreglo_poblacion : [],

      alertaActiva : false,
      loading: false, 
      classSuccess : false,
      classRevista : false,
      verConsecutivo : false,
      verTemaVideo : false,
    
      immediate:true,   //estado de validación del form
      setFocusOnError:true,
      clearInputOnReset:false
    };
  }

  componentDidMount( ) {
    this.obtenerJson("tipo_productos");
    this.obtenerJson("productos_poblacion_meta");
  }


  obtenerJson = (tabla) => {
    me = this;
   let url= referencias.consultageneral+"?tabla=" + tabla;
   axios.get(url)
      .then(res => {     
        me.setState({ [tabla] : res.data  }); 
        const limite = res.data.length;
        // console.log("LIMITE TABLA", limite);
        
      if (tabla === 'productos_poblacion_meta') {
        for (let index = 0; index < limite; index++) {
          let componente = "poblacion_"+(index+1);
          var obj = {[componente]:false }
          poblacion.push(obj);
        }
      }
      }
      )
      .catch(function (error) {
        console.log("error",error)
      })
      .finally(function () {
      });      
  }

  handleSubmit = (e, producto) => {
      e.preventDefault();

      for (let index = 1; index < 9 ; index++) {
        const element = producto["poblacion_"+ index];
        producto["poblacion_"+ index] = +element;                                
      };
      me = this;
      me.excluyeCampos(producto);
      let url = referencias.guardaconsulta+"?tabla_destino=productos";
      console.log("referencia",url);
      
       this.setState({ loading: true }, () => {
        axios.post(referencias.guardaconsulta+"?tabla_destino=productos", producto)    
          .then(function (response) {
            // console.log("response.data",response.data);
             me.setState({loading: false});   
             mostrarAlerta( "Alerta", response.data['mensaje']);
             if(!response.data['error']){
              me.resetDatos();
              // me.resetForm(); 
             }
          })
          .catch(function (error) {
            console.log("Este es el error en envío",error);       
          })
          .finally(function () {
            console.log("Transacción finalizada");        
          });
        });

  }

  // excluyeCampos = (obj) => {
  //   console.log("paquete para tabla producto", obj);
  //   for (const prop in obj) {
  //     // console.log(`obj.${prop} = ${obj[prop]}`);
  //     if(`${obj[prop]}`=== ''){
  //       console.log("prop", prop);
        
  //       console.log("borrado porque está vacío");        
  //       console.log(`obj.${prop} = ${obj[prop]}`);
  //       // delete `${obj[prop]}`;
  //       delete obj[prop];
  //     }
  //   }
  // }

  excluyeCampos = (obj) => {
    for (const prop in obj) {
      if(obj[prop]=== ''){
        delete obj[prop];
      }
    }
  } 

  resetDatos = () => {
    me = this;
    me.setState(() => ({
        id_producto : "",
        id_usuario : "",
        cantidad1   : "",
        fecha      : "",
        cantidad_beneficiarios : "",
        numero_consecutivo : "",
        tema_video_divulgacion  : "",
        volumen_revista : "",
        numero_revista : "",
        mes_revista : "",
        anno_revista : "",
        poblacion_1 : false,
        poblacion_2 : false,
        poblacion_3 : false,
        poblacion_4 : false,
        poblacion_5 : false,
        poblacion_6 : false,
        poblacion_7 : false,
        poblacion_8 : false,

        classSuccess : false,
        verConsecutivo : false,
        verTemaVideo : false,
        classRevista : false
      })
    );
    me.resetForm(); 
  }

  handleErrorSubmit = (e,formData, errorInputs) => {
      console.log("handleErrorSubmit", errorInputs)
  }

  resetForm = () => {
        // me = this;
        let formRef = this.formRef.current;
        formRef.resetValidationState(this.state.clearInputOnReset);
  }

  activarDatos = (value) => {
    //ojo limpiar el valor si no es 5, en caso de más de un registro
    // console.log("Target obtener Poblacion", e.target.value);
    this.setState({ classSuccess: true });
    this.setState({ verConsecutivo: false });
    this.setState({ verTemaVideo: false });

    // switch (e.target.value) {
    switch (value) {
      case '1':
        this.setState({ classSuccess: false });
        this.setState({ classRevista: true });
      break;
      case '4':
        this.setState({ verConsecutivo: true });
      break;      
      case '7':
        this.setState({ verTemaVideo: true });
      break;      
      default:
        break;
    }
    // this.obtenerDatosForm(e);    
  }

  handleChange = (e, value) => {
    
    
    if (e.target.name === 'id_producto')
    {
      // this.activarDatos(e)
      this.activarDatos(value)
    }
    this.setState({
        [e.target.name]: value
    })
}

 render() { 
    const loading  = this.state.loading;
    const classSuccess  = this.state.classSuccess;
    const verConsecutivo = this.state.verConsecutivo;
    const verTemaVideo = this.state.verTemaVideo;
    const classRevista = this.state.classRevista;
    return (
      <React.Fragment>
        <ValidationForm onSubmit={this.handleSubmit} onErrorSubmit={this.handleErrorSubmit}
                        // ref={this.formRef}
                        immediate={this.state.immediate}
                        setFocusOnError={this.state.setFocusOnError}
                        defaultErrorMessage = {
                          { required : "Este campo es requerido",
                          min : "El número debe ser mayor a 0",
                          max : "El número debe ser menor igual a 20"}
                        }
                        >
          <h1 className="header-1">Producción</h1>
          <hr/>
          <div className="row">
            <div className="form-group col-sm-6 ">
              <label className="font-len" htmlFor="tipo_producto">Seleccione el tipo de producto:</label>
              <SelectGroup key="selectproducto" name="id_producto" id="id_producto"
                          value={this.state.id_producto} 
                          required 
                          errorMessage="Por favor seleccione un tipo de solicitante."
                          onChange={this.handleChange}>

                <option  disabled value="">Seleccione la opción</option>
                {
                    this.state.tipo_productos.map((item) => (
                    <option key={"producto"+ item.id}  value={item.id}>{item.tipo}   </option>
                  ))
                }
              </SelectGroup>
            </div>
            <div className="col-sm-6  my-2 form-group">
              <div className={(verTemaVideo? "":" d-none")}>
                <label className="font-len" htmlFor="tema_video_divulgacion">Tema del video:</label>
                <TextInput type="text" className="form-control" id="tema_video_divulgacion" name="tema_video_divulgacion" value={this.state.tema_video_divulgacion} onChange={this.handleChange}/>
              </div>

              <div className={(verConsecutivo? "":" d-none")}>
                <label className="font-len" htmlFor="numero_consecutivo">Número consecutivo:</label>
                <TextInput  type="number" className="form-control" id="numero_consecutivo" name="numero_consecutivo" value={this.state.numero_consecutivo} onChange={this.handleChange}/>
              </div>
            </div>
          </div>
          
          <div className={"row"+ (classRevista?"":" d-none")}>  
            <div className="col-sm-3  my-2 form-group">
                <label className="font-len" htmlFor="volumen_revista">No. volumen:</label>
                <TextInput type="number" className="form-control" id="volumen_revista" name="volumen_revista" value={this.state.volumen_revista} onChange={this.handleChange}/>
            </div>
            <div className="col-sm-3  my-2 form-group">
                <label className="font-len" htmlFor="numero_revista">Número:</label>
                <TextInput type="number" className="form-control" id="numero_revista" name="numero_revista" value={this.state.numero_revista} onChange={this.handleChange}/>
            </div>
            <div className="col-sm-3  my-2 form-group">
                <label className="font-len" htmlFor="mes_revista">Mes:</label>
                <TextInput type="number" className="form-control" id="mes_revista" name="mes_revista" value={this.state.mes_revista} onChange={this.handleChange}/>
            </div>
            <div className="col-sm-3  my-2 form-group">
                <label className="font-len" htmlFor="anno_revista">Año:</label>
                <TextInput type="number" className="form-control" id="anno_revista" name="anno_revista" value={this.state.anno_revista} onChange={this.handleChange}/>
            </div>
          </div>

            <div className="row">
              <div className={"col-sm-12 my-2" + (classSuccess? "":" d-none")}>
                <p className="font-len">Población meta: </p>
                <div className="form-group custom-control custom-checkbox">
                {
                  this.state.productos_poblacion_meta.map((item => ( 
                    // <div className="pretty p-default p-curve">
                    
                        <Checkbox key={"kpoblacion"+ item.id} id={"poblacion_"+item.id}  name = {"poblacion_"+ item.id} label={item.nombre}
                                  // errorMessage="Por favor chequee alg check this box"
                                  value={this.state["poblacion_"+ item.id]}
                                  // value= {this.state.poblacion_1}
                                  inline
                                  onChange={this.handleChange} 
                        />
                  )))
                } 
                </div>
              </div>
            </div>               
         
          <div className="row">
            <div className="form-group col-sm-6">
              <label className="font-len" htmlFor="cantidad1">Cantidad:</label>
              {/* <TextInput type="number" className="form-control" id="cantidad" name="cantidad" min="1" max="20" value={this.state.cantidad}  required onChange={this.handleChange}/> */}
              <TextInput type="number" className="form-control" id="cantidad1" name="cantidad1" required value={this.state.cantidad} onChange={this.handleChange}/>
            </div>

            {/* <div className="form-group col-sm-6">
              <label  className="font-len"  htmlFor="texto_completo">Texto completo:</label>
              <TextInput type="number" className="form-control form-basedatos" id="texto_completo" name="texto_completo" min="1" placeholder="Digite la cantidad" required value={this.state.texto_completo} onChange={this.handleChange} />
            </div> */}

            <div className="form-group col-sm-6">
              <label className="font-len" htmlFor="fecha">Fecha:</label>
              <TextInput  type="date" className="form-control" id="fecha" name="fecha"  required value={this.state.fecha} onChange={this.handleChange} />
            </div>
            
          </div>
          <hr/>
          <div className="row">
            <div className="form-group col-sm-6">
              <label className="font-len" htmlFor="cantidad_beneficiarios">Cantidad de beneficiarios:</label>
              <TextInput type="number" className="form-control" id="cantidad_beneficiarios" name="cantidad_beneficiarios"  required value={this.state.cantidad_beneficiarios} onChange={this.handleChange} />
            </div>
            <hr/>
          </div>

          <div className={"form-group d-none"}>
              <TextInput type="text" className="form-control" name="id_usuario" id="id_usuario" value ={idUser}/>    
          </div>

          <div className="row">
            <div className="col-md-6 center">
              <button className="btn btn-block btn-main"> 
              Guardar registro {loading ? <LoadingSpinner elementClass={"spinner-grow text-light spinner-grow-lg"} /> : <LoadingSpinner elementClass={"d-none"} /> } </button>
            </div>
          </div>  

        </ValidationForm>   
      </React.Fragment>
      );
  }
}

export default Produccion;