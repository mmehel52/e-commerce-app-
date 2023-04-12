import React, { useContext, useEffect, useState } from "react";
import { Store } from "../Store";

const Roma = () => {
  const asa = [1, 2, 3, 4, 5];
  const [number, setNumber] = useState(0);
  const [res, setRes] = useState("");
  const handle = (x) => {
    let result = "";
    let arr1 = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    let arr2 = [
      "M",
      "CM",
      "D",
      "CD",
      "C",
      "XC",
      "L",
      "XL",
      "X",
      "IX",
      "V",
      "IV",
      "I",
    ];
    for (let i = 0; i < 13; i++) {
      while (x >= arr1[i]) {
        x = x - arr1[i];
        result += "" + arr2[i];
      }
    }

    return setRes(result);
  };
  const { state } = useContext(Store);
  const { category } = state;

  console.log(category);
  return (
    <div className="d-flex flex-column align-items-center gap-3">
      <h1>ROMA SAYISI</h1>
      <input type="number" onChange={(e) => setNumber(e.target.value)} />
      <button onClick={() => handle(number)}>ÇEVİR</button>
      <div className="border p-5 m-5"> {res}</div>
    </div>
  );
};

export default Roma;
