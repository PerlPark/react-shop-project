import React, { useEffect, useState } from 'react';
import './btns.scss';

function BtnWish(props){
  function addWish(){
    let arr = [...props.list];
    arr.push(props.id);
    props.fn(arr);
  }
  function removeWish(){
    let arr = [...props.list];
    let i = arr.indexOf(props.id);
    arr.splice(i, 1);
    props.fn(arr);
  }

  return (
    <>
    {
      props.state
      ? <button onClick={ removeWish } className="btn-addWish active">찜</button>
      : <button onClick={ addWish } className="btn-addWish">찜</button>
    }
    </>
  )
}

export default BtnWish;