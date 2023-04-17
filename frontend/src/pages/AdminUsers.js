import React, { useEffect, useState } from "react";
import Sidebar from "../components/admin-sidebar/Sidebar";
import axios from "axios";

const UsersAdmin = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const submitHandler = async () => {
      try {
        axios.defaults.withCredentials = true;
        const { data } = await axios.get(
          `${process.env.REACT_APP_BASE_URI}/api/users`
        );
        setUsers(data);
      } catch (err) {}
    };
    submitHandler();
  }, []);

  return (
    <div className="d-flex flex-row">
      <Sidebar />
      <div>
        {users.map((x) => (
          <h1>{x.name}</h1>
        ))}
      </div>
    </div>
  );
};

export default UsersAdmin;
