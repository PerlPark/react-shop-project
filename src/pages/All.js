import React, { useEffect, useState } from 'react';
import './All.scss';

// 컴포넌트 임포트
import ProductBlock from '../components/productBlock.js';

function All(props){
  return (
    <div className="all">
      <h1>All</h1>
      <div className="container-fluid">
        <div className="row row-cols-4 px-2">
          {
            props.data.map((product, idx)=>{
              return <ProductBlock key={ idx }
                                   i={ idx }
                                   classNm="col"
                                   img={ props.images[idx] }
                                   data={ product }
                                   wish={ props.wish }
                                   wishfn={ props.wishfn } />
            })
          }
        </div>
      </div>
    </div>
  )
}

export default All;