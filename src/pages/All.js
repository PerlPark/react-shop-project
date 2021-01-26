import React, { useEffect, useState } from 'react';
import { Nav } from 'react-bootstrap';
import './All.scss';

// 컴포넌트 임포트
import ProductBlock from '../components/productBlock.js';

function All(props){
  // 탭 전환 관련
  let [tab, switchTabs] = useState(0);

  return (
    <div className="all">
      <h1>All</h1>
      <div className="container-fluid">
        <Nav justify variant="tabs" defaultActiveKey="all">
          <Nav.Item>
            <Nav.Link eventKey="all" onClick={()=>{ switchTabs(0) }}>All</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="cate-1" onClick={()=>{ switchTabs(1) }}>패브릭 포스터</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="cate-2" onClick={()=>{ switchTabs(2) }}>휴대폰 케이스</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="disabled" disabled>
              준비 중
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <TabContent tab={ tab } />

        <div className="row row-cols-4 px-2">
          {
            props.data.map((product, idx)=>{
              return <ProductBlock key={ idx } i={ idx } classNm="col"
                                   img={ props.images[idx] } data={ product }
                                   wish={ props.wish } wishfn={ props.wishfn } />
            })
          }
        </div>
      </div>
    </div>
  )
}

function TabContent(props){
  if(props.tab === 0){
    return <div><h2>All</h2></div>
  } else if(props.tab === 1){
    return <div><h2>패브릭 포스터</h2></div>
  }else if(props.tab === 2){
    return <div><h2>휴대폰 케이스</h2></div>
  }
}

export default All;