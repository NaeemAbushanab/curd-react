import React, { useEffect, useRef, useState } from "react";
import Input from "../shared/Input";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { SuccessToast, ErrorToast } from "../shared/CToast";
import { CheckName, CheckEmail, CheckPassword } from "../Regex";
import ReactLoading from "react-loading";

function Create() {
  const navigate = useNavigate();
  const toast = useRef(null);
  const { id } = useParams("id");
  let [toggleBtn, setToggleBtn] = useState(true);
  let [nameErrors, setNameErrors] = useState([]);
  let [emailErrors, setEmailErrors] = useState([]);
  let [passwordErrors, setPasswordErrors] = useState([]);
  let [isDone, setIsDone] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [holdUserName, setHoldUserName] = useState("");
  const getUser = () => {
    axios.get(`https://crud-users-gold.vercel.app/users/${id}`).then(({ data }) => {
      setNameErrors(CheckName(data.user.name));
      setEmailErrors(CheckEmail(data.user.email));
      setPasswordErrors(CheckPassword(data.user.password));
      setUser(data.user);
      setHoldUserName(data.user.name);
      setIsDone(true);
    });
  };
  const handleSubmit = (e) => {
    setIsDone(false);
    e.preventDefault();
    axios
      .put(`https://crud-users-gold.vercel.app/users/${id}`, user)
      .then(({ data }) => {
        if (data.message == "success") {
          setIsDone(true);
          SuccessToast("user is updated");
          navigate("/user/index");
        }
      })
      .catch((err) => {
        setIsDone(true);
        if (err.response != undefined) {
          ErrorToast(err.response.data.message);
        } else {
          ErrorToast(err.message);
        }
      });
  };
  const handleInput = (e) => {
    const currName = e.target.name;
    const currVale = e.target.value;
    setUser({
      ...user,
      [currName]: currVale,
    });
    if (currName == "name") {
      setNameErrors(CheckName(currVale));
    } else if (currName == "email") {
      setEmailErrors(CheckEmail(currVale));
    } else if (currName == "password") {
      setPasswordErrors(CheckPassword(currVale));
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  useEffect(() => {
    if (user.name != "" && user.email != "" && user.password != "") {
      if (nameErrors.length == 0 && emailErrors.length == 0 && passwordErrors.length == 0) {
        if (holdUserName != user.name) {
          setToggleBtn(false);
        } else {
          setToggleBtn(true);
        }
      }
    }
  }, [user]);
  return (
    <>
      {!isDone && (
        <div className="top-0 start-0 position-absolute w-100 vh-100 d-flex justify-content-center align-items-center opacity-75 bg-white">
          <ReactLoading type="spokes" color="#0000FF" height={100} width={50} />
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <Input id={"name"} labelName={"User Name"} type={"text"} name={"name"} handleInput={handleInput} errors={nameErrors} value={user.name} />
        <Input id={"email"} labelName={"E-mail"} type={"cemail"} name={"email"} handleInput={handleInput} errors={emailErrors} value={user.email} />
        <Input id={"password"} labelName={"password"} type={"password"} name={"password"} handleInput={handleInput} errors={passwordErrors} value={user.password} />
        <button type="submit" className="btn btn-primary" id="updateBtn" disabled={toggleBtn}>
          Update
        </button>
        <button className="btn btn-primary ms-4" id="cancelBtn" onClick={() => navigate("/user/index")}>
          Cancel
        </button>
      </form>
      {toggleBtn && <p className="text-danger mt-5">* you must edit "User Name" if you want to update this record</p>}
    </>
  );
}
export default Create;
{
}
