import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Rating from "./Rating";
import { useContext } from "react";
import { Store } from "../Store";

const Product = (props) => {
  const { product } = props;
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async (item) => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity },
    });
  };
  return (
    <div className="border rounded cursor">
      <div className="border rounded">
        <Link to={`/product/${product._id}`}>
          <img
            src={product.picture}
            className="cart-height w-100"
            alt={product.name}
          />
        </Link>
      </div>

      <div className="d-flex flex-column align-items-center py-3">
        <div className="text-height text-center">
          <Link className="text-decoration-none" to={`/product/${product._id}`}>
            <h5 className="fs-4">{product.name}</h5>
          </Link>
        </div>

        <p>{product.price}₺</p>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        {product.soldout ? (
          <Button size="lg" className="btn-danger border-0 fs-4 mt-2">
            Tükendi
          </Button>
        ) : (
          <Button
            onClick={() => addToCartHandler(product)}
            size="lg"
            className="bg border-0 fs-4 mt-2"
          >
            Sepete Ekle
          </Button>
        )}
      </div>
    </div>
  );
};

export default Product;
