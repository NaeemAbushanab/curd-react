import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { SuccessToast, ErrorToast } from "../shared/CToast";
import ReactLoading from "react-loading";
import { confirmDialog } from "primereact/confirmdialog";
import { Button } from "primereact/button";
import Error404 from "./Error404";
function Index() {
  const [users, setUsers] = useState([]);
  let [isDone, setIsDone] = useState(false);
  let [loading, setLoading] = useState(true);
  let [show404, setShow404] = useState(false);
  useEffect(() => {
    getUsers();
  }, []);
  useEffect(() => {
    getUsers();
  }, [isDone]);
  const getUsers = () => {
    axios
      .get("https://crud-users-gold.vercel.app/users")
      .then(({ data }) => {
        setUsers(data.users);
        setIsDone(true);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response != undefined) {
          ErrorToast(err.response.data.message);
        } else {
          ErrorToast(err.message);
        }
        setShow404(true);
        setIsDone(true);
      });
  };
  const handleDelete = (id) => {
    confirmDialog({
      message: "Do you want to delete this record?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => accept(id),
    });
  };
  const accept = (id) => {
    setIsDone(false);
    axios
      .delete(`https://crud-users-gold.vercel.app/users/${id}`)
      .then(({ data }) => {
        if (data.message == "success") {
          setIsDone(true);
          SuccessToast("user is deleted");
        }
      })
      .catch((err) => {
        if (err.response != undefined) {
          ErrorToast(err.response.data.message);
        } else {
          ErrorToast(err.message);
        }
      });
  };
  if (show404) {
    return <Error404 />;
  } else if (loading) {
    return (
      <div className="top-0 start-0 position-absolute w-100 vh-100 d-flex justify-content-center align-items-center opacity-75 bg-white">
        <ReactLoading type="spokes" color="#0000FF" height={100} width={50} />
      </div>
    );
  } else {
    return (
      <>
        {!isDone && (
          <div className="top-0 start-0 position-absolute w-100 vh-100 d-flex justify-content-center align-items-center opacity-75 bg-white">
            <ReactLoading type="spokes" color="#0000FF" height={100} width={50} />
          </div>
        )}
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">E-mail</th>
              <th scope="col">Password</th>
              <th scope="col">Action</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          {users.length > 0 ? (
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <th>{index}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>
                    <Link className="btn btn-info" to={`/user/detalis/${user._id}`}>
                      Details
                    </Link>
                  </td>
                  <td>
                    <Link className="btn btn-primary" to={`/user/edit/${user._id}`}>
                      edit
                    </Link>
                  </td>
                  <td>
                    <Button className="btn btn-danger" onClick={() => handleDelete(user._id)}>
                      delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <div className="top-0 start-0 position-absolute w-100 vh-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: "rgb(255, 255, 255, 0.75)" }}>
              <h2 className="position-absolute mt-4 text-danger">no user data</h2>
            </div>
          )}
        </table>
      </>
    );
  }
}

export default Index;
