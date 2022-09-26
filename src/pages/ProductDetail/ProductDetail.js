import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import PriceCalculator from './components/PriceCalculator';
import ProductImg from './components/ProductImg';
import './ProductDetail.scss';

const ProductDetail = () => {
  const params = useParams();
  const productId = params.itemId;
  const [product, setProduct] = useState({});
  const { name, description, price, image_url } = product;

  useEffect(() => {
    fetch(`http://172.20.10.3:3000/items/${productId}`)
      .then(response => response.json())
      .then(result => {
        setProduct(result.data[0]);
      });
  }, [productId]);

  console.log(product);
  return (
    <div className="ProductDetail">
      <div className="product-wrap">
        <div className="product">
          <article className="product-item">
            {Object.keys(product).length !== 0 && (
              <ProductImg img={image_url} />
            )}
            <div className="product-item-contents">
              <h1 className="product-item-contents-title">{name}</h1>
              <p className="product-item-contents-info">{description}</p>
              <ul className="product-item-contents-ship">
                <li>택배배송</li>
                <li>
                  <span>3,000원</span>
                  <span>(주문시 결제)</span>
                </li>
                <li>50,000원 이상 구매시 무료 / 제주,도서지역 추가 3,000원</li>
              </ul>
              <PriceCalculator price={price} />
              <form className="product-item-contents-buttons">
                <input
                  className="payment-button"
                  type="button"
                  value="결제하기"
                />
                <input className="cart-button" type="button" value="장바구니" />
                <button className="heart-button">
                  <i className="fa-regular fa-heart" />
                </button>
              </form>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
