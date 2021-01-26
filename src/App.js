import React, { useState, useContext, useEffect } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { Container, Nav, Navbar, Jumbotron, Button } from 'react-bootstrap';
import axios from 'axios';
// import { CSSTransition } from "react-transition-group";

// 페이지 임포트
import Detail from './Detail.js';
import All from './pages/All.js';

// 컴포넌트 임포트
import ProductBlock from './components/productBlock.js';

// 리소스 임포트
import productsData from './data.js';
import image0 from './images/product0.jpg';
import image1 from './images/product1.jpg';
import image2 from './images/product2.jpg';
import image3 from './images/product3.jpg';
import image4 from './images/product4.jpg';
import image5 from './images/product5.jpg';
import kvImg from './images/kv.jpg';
import artistImage from './images/artistImage.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
const feather = require('feather-icons');

// 레퍼런스
// https://earcouture.jp/
// http://deeponde.com/

function App() {
  let [products, updateProducts] = useState(productsData);
  let images = [image0, image1, image2, image3, image4, image5, 'https://codingapple1.github.io/shop/shoes3.jpg', 'https://codingapple1.github.io/shop/shoes4.jpg', 'https://codingapple1.github.io/shop/shoes5.jpg', 'https://codingapple1.github.io/shop/shoes6.jpg', 'https://codingapple1.github.io/shop/shoes7.jpg', 'https://codingapple1.github.io/shop/shoes8.jpg'];

  /* 네비 장바구니 버튼 관련 */
  let iconShoppingBag = feather.icons["shopping-bag"].toSvg();
  let iconHeart = feather.icons["heart"].toSvg();
  let [shoppingBagCount, changeShoppingBagCount] = useState(0);

  /* 베스트, 최신 상품 추출 */
  function sortSales(arr){
    let newArr = [...arr];
    newArr.sort((a, b)=>{ return b.sales - a.sales; });
    return newArr;
  }
  function sortRegiDate(arr){
    let newArr = [...arr];
    newArr.sort((a, b)=>{ return b.regiDate - a.regiDate; });
    return newArr;
  }

  /* 유저 위시리스트, 장바구니 데이터 */
  let [wishList, changeWishList] = useState([3,5]);
  let [cartList, changeCartList] = useState([4,1]);

  let [loadingUIBlock, changeLoadingUIBlock] = useState(false);

  let [재고, 재고변경] = useState([1000, 1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009]);

  let [navExpandedState, changeNavExpanded] = useState(null);
  function toggleNav(){
    if(navExpandedState === "expanded"){
      changeNavExpanded(null);
    } else {
      changeNavExpanded("expanded");
    }
  }

  return (
    <div className="App">
      <Navbar expand="lg" fixed="top" collapseOnSelect="true" expanded={ navExpandedState }>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={()=>{ toggleNav() }}/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" onClick={()=>{ changeNavExpanded(null); }}>
            <Nav.Link as={Link} to="/all">All</Nav.Link>
            <Nav.Link as={Link} to="/new">New</Nav.Link>
            <Nav.Link as={Link} to="/best">Best</Nav.Link>
            <Nav.Link as={Link} to="/segneture" className="segneture">Segneture</Nav.Link>
            <Nav.Link as={Link} to="/wish" className="mobileOnly">Wish</Nav.Link>
            <Nav.Link as={Link} to="/cart" className="mobileOnly">Cart</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Brand as={Link} to="/" onClick={()=>{ changeNavExpanded(null); }}>Covet</Navbar.Brand>
        <div className="btns">
          <Link to="/wishlist">
            <button type="button" className="btn btn-goToWish">
              <span className="icon" dangerouslySetInnerHTML={{__html: iconHeart }}></span>
              <span className="count">{ wishList.length }</span>
            </button>
          </Link>
          <Link to="/cart">
            <button type="button" className="btn btn-goToCart">
              <span className="icon" dangerouslySetInnerHTML={{__html: iconShoppingBag }}></span>
              <span className="count">{ shoppingBagCount }</span>
            </button>
          </Link>
        </div>
      </Navbar>
      
      <Switch>
        <Route path="/all">
          <All data={products} images={images} wish={ wishList } wishfn={ changeWishList } />
          {
            loadingUIBlock
            ? <div className="dimmed">
                <div>로딩 중 입니다...</div>
              </div>
            : null
          }
          <button className="btn btn-primary" onClick={()=>{
            changeLoadingUIBlock(true);
            axios.get('https://codingapple1.github.io/shop/data2.json')
            .then((result)=>{
              updateProducts([...products, ...result.data]);
              changeLoadingUIBlock(false);
            })
            .catch(()=>{
              console.log('실패');
              changeLoadingUIBlock(false);
            });
          }}>더보기</button>
        </Route>

        <Route path="/all"></Route>

        <Route path="/detail/:id">
          <Detail images={ images } products={ products }
                  재고={ 재고 } 재고변경={ 재고변경 } />
        </Route>

        <Route path="/:id">
          이 페이지는 없는 페이지 입니다.
        </Route>

        <Route path="/">
          <Jumbotron fluid className="keyVisual">
            <Container>
              <h1 className="label">이달의 작가</h1>
              <h1 className="artistName-en">Edward Cucuel</h1>
              <h2 className="artistName-kr">에드워드 쿠쿠엘</h2>
              <div className="artistStory">
                <div className="flex">
                  <div className="image">
                    <img src={ artistImage } alt="Edward Cucuel" />
                  </div>
                  <p className="text">그는 독일 신문 발행인의 아들이었습니다. 열네 살 때 그는 이미 샌프란시스코 아트 인스티튜트에 다니며 The Examiner의 일러스트레이션을 하고 있었습니다.<br/><br/>17 세에 그는 파리로 가서 Académie Julian과 Académie Colarossi를 다녔으며 Jean-Léon Gérôme 아래에서 Académie des Beaux-Arts를 마쳤습니다.<br/><br/>1896년 미국으로 돌아 왔을 때 그는 잠시 뉴욕에서 신문 일러스트레이터로 일했지만 프랑스와 이탈리아로 돌아와 옛 거장들과 친해졌습니다. 그는 1899년 독일에서 베를린과 라이프치히에서 프리랜스 신문 일러스트레이터로 일했습니다.</p>
                </div>
                <div className="text-right">
                  <button className="btn-readMore">Read more</button>
                </div>
              </div>
            </Container>
            <div className="kvImg">
              <figure>
                <img src={ kvImg } alt="In der Sonne" />
                <figcaption>
                  <span className="title">In der Sonne</span>
                  <span className="info">ca. 1920–1925, Oil on canvas, 100 x 101 cm. (39.4 x 39.8 in.)</span>
                </figcaption>
              </figure>
            </div>
          </Jumbotron>
          <div className="container specialOrder mb-5">
            <h2 className="mb-4">Special Order</h2>
            <p className="mb-5 pageCaption">이 달의 작가를 기념하는 특가 상품입니다.</p>
            <div className="card-columns">
              {
                products.map((product, idx)=>{
                  return <ProductBlock key={ idx } i={ idx } classNm="card"
                                       img={ images[idx] } data={ product }
                                       wish={ wishList } wishfn={ changeWishList } />
                })
              }
            </div>
          </div>
          <div className="otherProducts">
            <div className="container">
              <h2>Best Selling</h2>
              <div className="row no-gutters pb-4 mb-5 row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-5">
              {
                sortSales(products).slice(0, 5).map((product, idx)=>{
                  return <ProductBlock key={ idx } classNm="col"
                                       img={ images[product.id] } data={ product }
                                       wish={ wishList } wishfn={ changeWishList } />
                })
              }
              </div>
              <h2>New Arrivals</h2>
              <div className="row no-gutters row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-5">
              {
                sortRegiDate(products).slice(0, 5).map((product, idx)=>{
                  return <ProductBlock key={ idx } classNm="col"
                                       img={ images[product.id] } data={ product }
                                       wish={ wishList } wishfn={ changeWishList } />
                })
              }
              </div>
            </div>
          </div>
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

function Footer(){
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-xxl-7 col-xl-5">
          <span className="brand">Covet</span>
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/all">All</Nav.Link>
            <Nav.Link as={Link} to="/new">New</Nav.Link>
            <Nav.Link as={Link} to="/best">Best</Nav.Link>
            <Nav.Link as={Link} to="/segneture" className="segneture">Segneture</Nav.Link>
          </Nav>
          </div>
          <div className="col-xxl-5 col-xl-7">
            <dl className="serviceInfo mb-4">
              <dt>고객센터 전화번호</dt>
              <dd>010-1234-5678</dd>
              <dt>고객센터 운영시간</dt>
              <dd>평일 10:00 ~ 19:00</dd>
              <dt>반품 배송지 주소</dt>
              <dd>경기도 군포시 숭구리당동 123-45번지 678호</dd>
            </dl>
            <dl className="shopInfo">
              <dt>대표자 정보</dt>
              <dd>리액트컴퍼니,  박진주</dd>
              <Link to="/account">무통장입금 계좌 및 방법 안내</Link>
            </dl>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default App;
