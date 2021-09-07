import s from "./login.module.scss";

export const Login = () => {
  return (
    <div className={s.login}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/800px-WhatsApp.svg.png"
        alt="app-icon"
      />
      <p>Whatsapp Clone</p>
      <div className={s.loginControls}>
        <button>Sign in with google</button>
        <button>Sign in as guest</button>
      </div>
    </div>
  );
};
