import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getError } from "../utils";
import { Store } from "../Store";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const { dispatch } = useContext(Store);

  useEffect(() => {
    const submitHandler = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BASE_URI}/api/categories`
        );
        setCategory(data);
        dispatch({ type: "GET_CATEGORIES", payload: category });
      } catch (err) {
        toast.error(getError(err));
      }
    };
    submitHandler();
  }, []);

  return (
    <div className="m-auto bg-light p-3 my-2">
      <h3>Kategoriler</h3>
      <div className="d-flex flex-row align-items-center gap-5 mt-5 flex-wrap">
        {category?.map((item) => (
          <div
            key={item._id}
            onClick={() =>
              navigate(
                `/search?category=${item.title}&query=all&price=all&rating=all&order=newest&page=1`
              )
            }
          >
            <img src={item.picture} className="cat-image" alt="" />
            <p className="text-center">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
