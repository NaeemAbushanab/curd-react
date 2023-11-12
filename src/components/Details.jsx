import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Details() {
  const [user, setUser] = useState({});
  const { id } = useParams("id");
  useEffect(() => {
    axios
      .get(`https://crud-users-gold.vercel.app/users/${id}`)
      .then(({ data }) => {
        setUser(data.user);
      })
      .catch((error) => {
        setUser({
          name: "no data",
          email: "no data",
        });
      });
  }, []);
  return (
    <ul>
      <li>
        user name: <span className="fw-bold text-primary">{user.name}</span>
      </li>
      <li>
        email: <span className="fw-bold text-primary">{user.email}</span>
      </li>
    </ul>
  );
}

export default Details;
