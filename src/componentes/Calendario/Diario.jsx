import React, { useState, useEffect } from 'react';

export default function Diario(props) {
  var d1= null, d2=null;
  var i = props.item;
  var data = props.data[i];
  console.log("data", data);
  

  useEffect(()=>{
    console.log("datos", props.data);
  //  console.log("props data 8", props.data[8][0].inicio);
    // d1 =  props.data[8][0].inicio;
    // d2 = props.data[8][0].fin;
  });


  return (
    <>
      <p>Diario </p>
      {/* <p>{fin}</p> */}
     {/* <p> {props.data[8][0]}</p> */}
    </>
  );
}
