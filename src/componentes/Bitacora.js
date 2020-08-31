import React, {useState, useEffect} from 'react';

import Posts from './Posts';
import Pagination from './Pagination';
import Tabla2 from './Tabla2';

import referenciasJson from '../data/referencias.json';
import contenidosJson from '../data/contenidos_bitacora.json';

const referencias = referenciasJson[0];
const contenidos = contenidosJson;

export default function Bitacora() {

    const [posts, setPosts ] = useState([]);
    const [loading, setLoading ] = useState(false);
    const [currentPage, setCurrentPage ] = useState(1);
    const [postsPerPage, setPostsPerPage ] = useState(15);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPost = posts.slice(indexOfFirstPost, indexOfLastPost);
    
  async function obtener() {
    var url = referencias.consultabitacora;
    let resp = null;
    setLoading(true)
    resp = await fetch(url);
    // setDatosJson(await resp.json());
    setPosts(await resp.json());
    // setPosts(res.data)
    setLoading(false);
  }

  useEffect(() => {
    obtener();

  }, []);

    useEffect(()=>{   
    });

          return (
        <React.Fragment>
               <h1 className="header-1">Bitácora</h1>
               <hr/>
                {
                      posts !==null ?
                    //  posts  !==null 
                    //  ?
                     <React.Fragment> 
                       <Tabla2 array={currentPost} indexOfFirstPost = {indexOfFirstPost} contenidos={contenidos}  loading={loading} clase="table table-striped sombreado"/>
                       {/* <Posts posts={currentPost} loading={loading} /> */}
                       <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} />
                           {/* <Tabla array={datosJson} clase="table table-striped" modo="bitacora" />
                         <Tabla2 array={datosJson} contenidos={contenidos} clase="table table-striped sombreado"/> */}
                     </React.Fragment>  
                     
                      :
                      (
                         <span>Por favor espere...</span>
                      )
                }

                
        </React.Fragment>
    )
    
};