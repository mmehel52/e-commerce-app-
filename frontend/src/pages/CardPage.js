import { useContext } from "react";
import { Store } from "../Store";
import { Helmet } from "react-helmet-async";
import MessageBox from "../components/MessageBox";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const CardPage = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const updateCartHandler = async (item, quantity) => {
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };
  const removeItemHandler = (item) => {
    ctxDispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  const checkoutHandler = () => {
    navigate("/signin?redirect=/shipping");
  };
  return (
    <div className="bg-light position-relative">
      <Helmet>
        <title>Sepet</title>
      </Helmet>
      <Header />
      <h1 className="text-center">Sepet</h1>
      <div className=" row card-height">
        <div className="col-0 col-lg-2"></div>
        <div class="scroll mb-5 col-12 col-md-9 col-lg-6">
          {cartItems.length === 0 ? (
            <MessageBox>
              Sepet Boş <Link to="/">Alışverişe Git</Link>
            </MessageBox>
          ) : (
            <table className="table table-hover bg-white">
              <thead>
                <tr>
                  <th className="d-none d-md-block" scope="col">
                    Resim
                  </th>
                  <th scope="col">Ürün</th>
                  <th scope="col">Miktar</th>
                  <th scope="col">Fiyat</th>
                  <th scope="col">Çıkar</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item._id}>
                    <td className="d-none d-md-block">
                      <img
                        src={item.picture}
                        alt={item.name}
                        className="img-fluid rounded img-thumbnail cat-image"
                      ></img>
                    </td>
                    <td>
                      <Link
                        className="text-decoration-none"
                        to={`/product/${item._id}`}
                      >
                        {item.name}
                      </Link>
                    </td>
                    <td>
                      <Button
                        onClick={() =>
                          updateCartHandler(item, item.quantity - 1)
                        }
                        variant="light"
                        disabled={item.quantity === 1}
                      >
                        <i className="fas fa-minus-circle"></i>
                      </Button>{" "}
                      <span>{item.quantity}</span>{" "}
                      <Button
                        variant="light"
                        disabled={item.quantity === item.countInStock}
                        onClick={() =>
                          updateCartHandler(item, item.quantity + 1)
                        }
                      >
                        <i className="fas fa-plus-circle"></i>
                      </Button>
                    </td>
                    <td>{item.price}₺</td>
                    <td>
                      {" "}
                      <Button
                        variant="light"
                        onClick={() => removeItemHandler(item)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="col-12 col-md-3 col-lg-2 ">
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    Ürün Sayısı :{cartItems.reduce((a, c) => a + c.quantity, 0)}
                  </h3>
                  <h3>
                    Toplam Fiyat :
                    {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}₺
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      disabled={cartItems.length === 0}
                      onClick={checkoutHandler}
                      className="bg border-0 fs-4 mt-2"
                    >
                      Devam Et
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </div>
      </div>

      <div className="position-fixed w-100">
        <Footer />
      </div>
    </div>
  );
};

export default CardPage;
