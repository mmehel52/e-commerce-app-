import React, { useEffect, useReducer, useState } from "react";
import Sidebar from "../components/Searchsidebar/Sidebar";
import Header from "../components/Header";
import { toast } from "react-toastify";
import { getError } from "../utils";
import axios from "axios";
import Footer from "../components/Footer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Product from "../components/Product";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        countProducts: action.payload.countProducts,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
const prices = [
  {
    name: "$1 to $50",
    value: "1-50",
  },
  {
    name: "$51 to $200",
    value: "51-200",
  },
  {
    name: "$201 to $500",
    value: "201-500",
  },
  {
    name: "$501 to $1000",
    value: "501-1000",
  },
];

const ratings = [
  {
    name: "5 yıldız",
    rating: 5,
  },
  {
    name: "4-5 yıldız",
    rating: 4,
  },

  {
    name: "3-4 yıldız",
    rating: 3,
  },
  {
    name: "2-3 yıldız",
    rating: 2,
  },

  {
    name: "1-2 yıldız",
    rating: 1,
  },
];
const SearchPage = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search); // /search?category=Shirts
  const category = sp.get("category") || "all";
  const query = sp.get("query") || "all";
  const price = sp.get("price") || "all";
  const rating = sp.get("rating") || "all";
  const page = sp.get("page") || 1;
  const order = sp.get("order") || "newest";

  const [{ loading, error, products, pages, countProducts }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: "",
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BASE_URI}/api/products/search?page=${page}&query=${query}&category=${category}&price=${price}&rating=${rating}&order=${order}`
        );
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(error),
        });
      }
    };
    fetchData();
  }, [category, error, page, price, query, rating, order]);

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const submitHandler = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BASE_URI}/api/categories`
        );
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    submitHandler();
  }, [dispatch]);
  const getFilterUrl = (filter, skipPathname) => {
    const filterPage = filter.page || page;
    const filterCategory = filter.category || category;
    const filterQuery = filter.query || query;
    const filterRating = filter.rating || rating;
    const filterPrice = filter.price || price;
    const sortOrder = filter.order || order;
    return `${
      skipPathname ? "" : "/search?"
    }category=${filterCategory}&query=${filterQuery}&price=${filterPrice}&rating=${filterRating}&order=${sortOrder}&page=${filterPage}`;
  };

  return (
    <div className="d-flex flex-row">
      <div className="">
        <Sidebar
          getFilterUrl={getFilterUrl}
          categories={categories}
          category={category}
          price={price}
          prices={prices}
          rating={rating}
          ratings={ratings}
        />
      </div>
      <div className="w-100">
        <Header />
        <div className="px-3">
          <div className="mb-3">
            {loading ? (
              <div className="text-center">
                <LoadingBox />
              </div>
            ) : error ? (
              <MessageBox variant="danger">{error}</MessageBox>
            ) : (
              <>
                <div className="mb-3 d-flex flex-row align-items-center  justify-content-between">
                  <div>
                    {countProducts === 0 ? "No" : countProducts} Results
                    {query !== "all" && " : " + query}
                    {category !== "all" && " : " + category}
                    {price !== "all" && " : Price " + price}
                    {rating !== "all" && " : Rating " + rating}
                    {query !== "all" ||
                    category !== "all" ||
                    rating !== "all" ||
                    price !== "all" ? (
                      <Button
                        variant="light"
                        onClick={() => navigate("/search")}
                      >
                        <i className="fas fa-times-circle"></i>
                      </Button>
                    ) : null}
                  </div>
                  <div>
                    Sort by{" "}
                    <select
                      value={order}
                      onChange={(e) => {
                        navigate(getFilterUrl({ order: e.target.value }));
                      }}
                    >
                      <option value="newest">Newest Arrivals</option>
                      <option value="lowest">Price: Low to High</option>
                      <option value="highest">Price: High to Low</option>
                      <option value="toprated">Avg. Customer Reviews</option>
                    </select>
                  </div>
                </div>
                {products?.length === 0 && (
                  <MessageBox>No Product Found</MessageBox>
                )}
                <div className="row mb-5">
                  {products?.map((product) => (
                    <div
                      className="mb-3  col-sm-6 col-md-4 col-lg-2"
                      key={product._id}
                    >
                      <Product product={product}></Product>
                    </div>
                  ))}
                </div>
                <div className="position-absolute bottom-0 start-50  ">
                  {[...Array(pages).keys()].map((x) => (
                    <Link
                      key={x + 1}
                      className="mx-1"
                      to={{
                        pathname: "/search",
                        search: getFilterUrl({ page: x + 1 }, true),
                      }}
                    >
                      <Button
                        className={Number(page) === x + 1 ? "text-bold" : ""}
                        variant="light"
                      >
                        {x + 1}
                      </Button>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
        <div className="">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
