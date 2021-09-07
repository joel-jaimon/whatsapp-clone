import { connect } from "react-redux";
import { initiateSignin } from "../../redux/reducers/auth";
import s from "./login.module.scss";

const passStateToProps = ({ authState }: any) => ({
  authLoading: authState.loading,
  authError: authState.error,
});

const passDispatchToProps = (dispatch: any) => ({
  initiateSignin: (payload: any) => dispatch(initiateSignin(payload)),
});

export const Login = connect(
  passStateToProps,
  passDispatchToProps
)(({ initiateSignin, authLoading, authError }: any) => {
  return (
    <div className={s.login}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/800px-WhatsApp.svg.png"
        alt="app-icon"
      />
      <p>Whatsapp Clone</p>
      <div className={s.loginControls}>
        <button
          onClick={() =>
            initiateSignin({
              authType: "google",
            })
          }
        >
          Sign in with google
        </button>
        <button
          onClick={() =>
            initiateSignin({
              authType: "guest",
            })
          }
        >
          Sign in as guest
        </button>
      </div>
    </div>
  );
});
