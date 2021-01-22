import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './productBlock.scss';

// 추가 컴포넌트
import BtnWish from './btnWish.js';

function ProductBlock(props){
  // if(props.data.options){
  //   let optionsTxt = props.data.options.join(', ');
  // }
  let url = "/detail/"+ props.data.id;

  function wishState(id){
    return props.wish.includes(id);
  }

  // 사용되는 props 목록
  // classNm
  // id
  // img
  // data
  // wish
  // wishfn

  return (
    <div className={"productBlock " + props.classNm }>
      <div className="thumbnail">
        <Link to={ url }>
          <img src={ props.img } alt={ props.data.title } />
        </Link>
        <div className="btns">
          <BtnWish id={props.data.id} state={ wishState(props.data.id) } list={ props.wish } fn={ props.wishfn }/>
          <button className="btn-addCart">장바구니 추가</button>
        </div>
      </div>
      <Link to={ url }>
      <h3>{ props.data.title }</h3>
      <p className="options">{ props.data.category } { props.data.options.join(', ') }</p>
      <p className="price">₩{ props.data.price }
      {
        props.data.listPrice
        ? <span className="listPrice">₩{ props.data.listPrice }</span>
        : null
      }
      {
        props.data.discount
        ? <span className="discount">{ props.data.discount } Sale</span>
        : null
      }
      </p>
      </Link>
    </div>
  )
}

export default ProductBlock;