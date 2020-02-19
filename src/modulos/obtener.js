
function obtener (url, cb ) {
    fetch(url)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    //console.log(data);
    cb(data);
  });
}

export default obtener;