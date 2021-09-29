import { CircularProgress } from "@material-ui/core";
import { connect } from "react-redux";
import { initiateSignin, setAuthFailed } from "redux/reducers/auth";
import s from "./login.module.scss";
import { GoogleLogin } from "react-google-login";
import whatsappLogo from "./WhatsApp.svg.webp";

const passStateToProps = ({ authState }: any) => ({
  authLoading: authState.loading,
  authError: authState.error,
  authState: authState.auth,
});

const passDispatchToProps = (dispatch: any) => ({
  initiateSignin: (payload: any) => dispatch(initiateSignin(payload)),
  setAuthFailed: (payload: any) => dispatch(setAuthFailed(payload)),
});

export const Login = connect(
  passStateToProps,
  passDispatchToProps
)(({ initiateSignin, authLoading, authError, setAuthFailed }: any) => {
  const handleGoogleResponse = (response: any) => {
    console.log(response);
    if (response.error) {
      setAuthFailed(response.error);
    } else {
      initiateSignin({
        idToken: response.tokenId,
        authType: "google",
      });
    }
  };

  return (
    <div className={s.login}>
      <img src={whatsappLogo} alt="app-icon" />
      <p>Whatsapp Clone</p>
      {authLoading ? (
        <div className={s.loading}>
          <CircularProgress size="19px" color="inherit" />
        </div>
      ) : (
        <div className={s.loginControls}>
          <GoogleLogin
            onSuccess={handleGoogleResponse}
            onFailure={handleGoogleResponse}
            clientId={process.env.REACT_APP_GAUTH_CLIENT_ID as string}
            render={(props: any) => (
              <button onClick={props.onClick} disabled={props.disabled}>
                Sign in with google
              </button>
            )}
            cookiePolicy={"single_host_origin"}
          />

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
      )}
    </div>
  );
});
