import axios from "axios";
import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { toast } from "react-toastify";
import Rating from "../components/Rating";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { getError } from "../utils";
import { Store } from "../Store";
import Header from "../components/Header";
import Footer from "../components/Footer";

const reducer = (state, action) => {
  switch (action.type) {
    case "REFRESH_PRODUCT":
      return { ...state, product: action.payload };
    case "CREATE_REQUEST":
      return { ...state, loadingCreateReview: true };
    case "CREATE_SUCCESS":
      return { ...state, loadingCreateReview: false };
    case "CREATE_FAIL":
      return { ...state, loadingCreateReview: false };
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const ProductDetail = () => {
  let reviewsRef = useRef();
  const [colour, setColour] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const [{ loading, error, product, loadingCreateReview }, dispatch] =
    useReducer(reducer, {
      product: [],
      loading: true,
      error: "",
    });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(
          `${process.env.REACT_APP_BASE_URI}/api/products/${id}`
        );
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, [id]);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find(
      (x) => x._id === product._id && x.colour === colour
    );

    const quantity = existItem ? existItem.quantity + 1 : 1;
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity, colour },
    });
    navigate("/card");
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!comment || !rating) {
      toast.error("Lütfen yorum ve puan girin.");
      return;
    }
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URI}/api/products/${product._id}/reviews`,
        { rating, comment, name: userInfo.name }
      );

      dispatch({
        type: "CREATE_SUCCESS",
      });
      toast.success("Yorumunuz eklendi.");
      product.reviews.unshift(data.review);
      product.numReviews = data.numReviews;
      product.rating = data.rating;
      dispatch({ type: "REFRESH_PRODUCT", payload: product });
      window.scrollTo({
        behavior: "smooth",
        top: reviewsRef.current.offsetTop,
      });
    } catch (error) {
      toast.error(getError(error));
      dispatch({ type: "CREATE_FAIL" });
    }
  };

  return (
    <div>
      <Header />;
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="bg-light ">
          <div className="row d-flex flex-row justify-content-center gap-1 mx-0 ">
            <div className="col-12 col-sm-9 col-md-7 col-lg-3  border rounded  bg-white">
              <img
                src={product.picture}
                alt={product.name}
                className="det-image w-100 rounded"
              />
            </div>
            <div className="col-12 col-sm-9 col-md-7 col-lg-3 border rounded bg-white d-flex flex-column align-items-start gap-1 justify-content-around pb-1">
              <Helmet>
                <title>{product.name}</title>
              </Helmet>
              <h1>{product.name}</h1>

              <Rating rating={product.rating} numReviews={product.numReviews} />

              <h4>{product.price}₺</h4>

              <div>
                <h4>Açıklama</h4>
                <p>{product.description}</p>
              </div>
              {product.colours.length > 0 && (
                <div>
                  <h4>Renkler</h4>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(e) => setColour(e.target.value)}
                  >
                    <option value="">Renk seçin</option>
                    {product.colours.map((x) => (
                      <option
                        key={x}
                        value={x}
                        style={{
                          backgroundColor: x,
                          width: "20px",
                          height: "20px",
                        }}
                      >
                        {x}
                      </option>
                    ))}
                  </select>
                </div>
              )}
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
          <div className="my-3 col-3 mx-auto">
            <div className="my-3">
              {userInfo ? (
                <form onSubmit={submitHandler}>
                  <h2 className="text-center mt-5">Yorum yaz</h2>
                  <Form.Group className="mb-3" controlId="rating">
                    <Form.Select
                      aria-label="Rating"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <option value="">Seçiniz...</option>
                      <option value="1">1- Kötü</option>
                      <option value="2">2- Orta</option>
                      <option value="3">3- İyi</option>
                      <option value="4">4- Çok iyi</option>
                      <option value="5">5- Mükemmel</option>
                    </Form.Select>
                  </Form.Group>
                  <FloatingLabel controlId="floatingTextarea" className="mb-3">
                    <Form.Control
                      as="textarea"
                      placeholder="Leave a comment here"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </FloatingLabel>

                  <Button
                    disabled={loadingCreateReview}
                    className="bg border-0 fs-4 mt-2 mx-auto w-100"
                    type="submit"
                  >
                    Kaydet
                  </Button>
                  {loadingCreateReview && <LoadingBox />}
                </form>
              ) : (
                <MessageBox>
                  Please{" "}
                  <Link to={`/signin?redirect=/product/${product._id}`}>
                    Sign In
                  </Link>{" "}
                  to write a review
                </MessageBox>
              )}
            </div>
            <h2 className="text-center mt-5" ref={reviewsRef}>
              Görüşler
            </h2>
            <div className="mb-3">
              {product.reviews.length === 0 && (
                <MessageBox>Yorum bulunmamaktadır.</MessageBox>
              )}
            </div>
            <div>
              {product.reviews.map((review) => (
                <div className="bg-white border rounded p-2" key={review._id}>
                  <div className="d-flex flex-row justify-content-between">
                    <strong>{review.name}</strong>
                    <Rating rating={review.rating} caption=" "></Rating>
                  </div>
                  <p className="">{review.createdAt.substring(0, 10)}</p>

                  <p>{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ProductDetail;
