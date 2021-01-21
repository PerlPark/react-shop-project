import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import './Detail.scss';

let Alert = styled.div`
  padding: 10px;
  border: 1px ${ props => props.Color } solid;
`;

function Detail(props){
  let { id } = useParams();
  let history = useHistory();
  // let product = props.products.filter((item)=>{ return item.id === Number(id); })[0];
  let product = props.products.find(item => item.id === Number(id));
  let [alertState, changeAlertState] = useState(true);

  {/* 새로운 훅 */}
  {/* 컴포넌트가 mount 되었을 때, 컴포넌트가 update 될 때 실행 */}
  useEffect(function(){
    window.scrollTo(0, 0);
    let alertStateTimer = setTimeout(function(){ changeAlertState(false);console.log('2초 후 얼럿을 닫았습니다.'); }, 3000);
    return ()=>{ clearTimeout(alertStateTimer); console.log('타이머 삭제'); }
  }, []);
  {/* 실행조건 []대괄호에 아무것도 없으면 페이지가 로드되었을 때 한 번만 실행된다. */}

  return (
    <div className="detail">
      <div className="container">
        <div className="row">
          <div className="col">
            {
              alertState
              ? <CustomAlert />
              : null
            }
            <img src={ props.images[id] }/>
          </div>
          <div className="col productInfo productBlock">
            <h4>{ product.title }</h4>
            <p>{ product.caption }</p>
            <p>{ product.category }</p>
            <p>{ product.options }</p>
            <p className="price">₩{ product.price }
            {
              product.listPrice
              ? <span className="listPrice">₩{ product.listPrice }</span>
              : null
            }
            {
              product.discount
              ? <span className="discount">{ product.discount } Sale</span>
              : null
            }
            </p>
            <재고블럭 재고={ props.재고[id] }/>
            <button className="btn btn-danger" onClick={()=>{
              let copyArr = [...props.재고];
              copyArr[id] = copyArr[id] - 1;
              props.재고변경(copyArr);
            }}>주문하기</button>
            <button className="btn btn-outline-secondary" onClick={ ()=>{ history.push('/'); } }>뒤로가기</button>
          </div>
        </div>
      </div>
    </div>
  )
}

{/* 옛날 훅 */}
class Detail2 extends React.Component {
  componentDidMount(){

  }
  componentWillUnmount(){

  }
}

function CustomAlert(){
  return (
    <div className="alert alert-info" role="alert">
      <strong>Holly Jolly!</strong> 크리스마스 특가 세일 적용 중입니다.
    </div>
  )
}
function 재고블럭(props){
  return (
    <p>{ props.재고 }개 남음</p>
  )
}

export default Detail;