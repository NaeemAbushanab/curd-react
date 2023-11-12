import React from "react";

const CheckName = (value) => {
  let resultsCheck = [];
  if (value.length < 5) {
    resultsCheck.push("must be more than 5 character");
  }
  if (!new RegExp("^[A-Z]").test(value)) {
    resultsCheck.push("must first character is captal");
  }
  if (new RegExp("[!@#$%^&*_+]").test(value)) {
    resultsCheck.push("must not contain spitial letter ex: $,#,%,...");
  }
  if (new RegExp("[0-9]").test(value)) {
    resultsCheck.push("must not contain numbers ex: 0,1,2,3,4,...");
  }
  if (resultsCheck.length == 0) {
  }
  return resultsCheck;
};
const CheckEmail = (value) => {
  let resultsCheck = [];
  const check = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (!check.test(value)) {
    resultsCheck.push("invalid email");
  }
  return resultsCheck;
};
const CheckPassword = (value) => {
  let resultsCheck = [];
  if (value.length < 8) {
    resultsCheck.push("must be more than 8 character");
  }
  if (!new RegExp("[A-Z]").test(value)) {
    resultsCheck.push("must contain captal letter");
  }
  if (!new RegExp("[!@#$%^&*_+]").test(value)) {
    resultsCheck.push("must contain spitial letter ex: $,#,%,...");
  }
  if (!new RegExp("[0-9]").test(value)) {
    resultsCheck.push("must contain numbers ex: 0,1,2,3,...");
  }
  return resultsCheck;
};
export { CheckName, CheckEmail, CheckPassword };
