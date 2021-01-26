import React from 'react';
import { connect } from 'react-redux';
import './Cart.scss';

function Cart(props){
  return (
    <div className="container">
      <h1>장바구니</h1>
      <div className="alert alert-warning">오늘은 무료배송!</div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">상품번호</th>
            <th scope="col">상품명</th>
            <th scope="col">수량</th>
            <th scope="col">변경</th>
          </tr>
        </thead>
        <tbody>
          {
            props.cartData.map((list, idx)=>{
              return (
                <tr key={idx}>
                  <td>{ list.id }</td>
                  <td>
                    { list.name }<br/>
                    { list.category }<br/>
                    { list.option }
                  </td>
                  <td>
                    { list.quan }<br/>
                    {/* <button className="btn btn-outline-dark" onClick={()=>{ props.dispatch({ type: '수량증가'}) }}>+</button>
                    <button className="btn btn-outline-dark" onClick={()=>{ props.dispatch({ type: '수량감소'}) }}>-</button> */}
                  </td>
                  <td>
                  {/* <button className="btn btn-outline-dark" onClick={()=>{ props.dispatch({ type: '상품삭제', payload: { id: list.id }}) }}>삭제</button> */}
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

function state를props화(state){
  return {
    cartData: state.cartDataReducer,
    productData: state.productDataReducer
  }
}
export default connect(state를props화)(Cart);
// export default Cart;