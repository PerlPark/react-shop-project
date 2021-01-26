import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';

let ProductDataa = [
  {
    id: 0,
    image: "./images/feature1.jpg",
    name: "The artist's garden on lake Starnberg",
    artist: "Edward Cucuel",
    category: ["포스터", "패브릭 포스터"],
    options: ["100 x 101 cm"],
    price: 11500,
    listPrice: null,
    discount: null,
    stock: 100,
    sales: 0,
    regiDate: 20210131
  }
];

function productDataReducer(state = ProductDataa, 액션){
  return state;
}






let 초기값 = [
  { id: 0, name:"The artist's garden on lake Starnberg", category: '패브릭 포스터', option: '100 x 101 cm', quan: 1 },
  { id: 1, name:'An Afternoon on the Lake', category: '휴대폰 케이스', option: 'iPhone12', quan: 3 },
];

function cartDataReducer(state = 초기값, 액션){ //reducer
  if(액션.type === '수량증가'){

    let arr = [...state];
    arr[0].quan++;
    return arr;

  } else if(액션.type === '수량감소'){
    
    if(state[0].quan > 1){
      let arr = [...state];
      arr[0].quan--;
      return arr;
    } else {
      return state;
    }

  } else if(액션.type === '상품추가'){
    //이미 담겨 있는 경우, 수량 증가
    let arr = [...state];
    arr.push(액션.payload.arr);
    return arr;

    //담겨 있지 않은 경우, 신규 추가

  } else if(액션.type === '상품삭제'){

    let arr = [...state];
    let targetIdx = arr.findIndex((obj) => obj.id === 액션.payload.id);
    arr.splice(targetIdx, 1);
    return arr;

  } else if(액션.type === 'truefalse토글'){
    state = !state;
    return state;
  } else {
    return state;
  }
}

let store = createStore(combineReducers({cartDataReducer, productDataReducer}));

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename="/covet">
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
