import React, { useState } from "react";
import "./LoginPage.css";
const LoginPage = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    firstname: "",
    secondname: "",
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    console.log("login executed", formData);
    let responseData;
    await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => (responseData = data));
    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    }
  };
  const signup = async () => {
    console.log("signup executed", formData);
    let responseData;
    await fetch("http://localhost:4000/signup", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => (responseData = data));
    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    }
  };
  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign up" ? (
            <input
              type="text"
              name="firstname"
              value={formData.username}
              onChange={changeHandler}
              placeholder="First Name"
              id=""
            />
          ) : (
            <></>
          )}
          {state === "Sign up" ? (
            <input
              type="text"
              name="secondname"
              value={formData.secondname}
              onChange={changeHandler}
              placeholder="Second Name"
              id=""
            />
          ) : (
            <></>
          )}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={changeHandler}
            placeholder="Email address"
            id=""
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={changeHandler}
            placeholder="Password"
            id=""
          />
        </div>
        <button
          onClick={() => {
            state === "Login" ? login() : signup();
          }}
        >
          Continue
        </button>
        {state === "Sign up" ? (
          <p className="loginsignup-login">
            Already have an account?
            <span
              onClick={() => {
                setState("Login");
              }}
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Create an account?{" "}
            <span
              onClick={() => {
                setState("Sign up");
              }}
            >
              Click here
            </span>{" "}
            <div className="loginsignup-agree">
              <input type="checkbox" name="" id="" />
              <p>By continuing, I agree to the terms of use & privacy</p>
            </div>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
