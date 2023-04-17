import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/search-sidebar/Sidebar";
import { useEffect, useReducer, useState } from "react";
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
const Dnm = () => {
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
    <div>
      <Header />
      <div className="row">
        <div className="col-2">
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
      </div>
      <Footer />
    </div>
  );
};

export default Dnm;
