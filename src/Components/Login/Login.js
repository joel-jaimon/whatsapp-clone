import React from "react";
import "./login.scss";
import { Button } from "@material-ui/core";
import { auth, provider } from "../../firebase/firebase";
import { useStateValue } from "../../DataLayer/StateProvider";
import { actionTypes } from "../../DataLayer/reducer";

const Login = () => {
  const [{}, dispatch] = useStateValue();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/800px-WhatsApp.svg.png"
          alt=""
        />
        <div className="login__text">
          <h1>Sign in to WhatsApp</h1>
        </div>
        <Button type="submit" onClick={signIn}>
          Sign In with Google
        </Button>
      </div>
    </div>
  );
};

export default Login;
