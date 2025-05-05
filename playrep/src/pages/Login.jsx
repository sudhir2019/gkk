import React from "react";
import Logo from "../assets/images/logo.png";
import BarChart from "../assets/images/login-bar-chart.png";
import useLogin from "../hook/Authentication/useLogin";


const Login = () => {

  const {
    register,
    handleSubmit,
    errors,
    onSubmit,
    isLoading,
    serverError,
    successMessage,
    captcha,
    generateCaptcha,
    locationError,
    showLocationPopup,
  } = useLogin();

  return (

    < form onSubmit={handleSubmit(onSubmit)} >
      <div id="LayoutDiv1">
        <div className="header">
          <div className="logo">
            <a title="Main Page">
              <img src={Logo} alt="Logo" />
            </a>
          </div>
        </div>
        <div className="container">
          <div className="login-div">
            <div className="login-row login-row-width">
              <h2>Login</h2>
            </div>
            <div className="login-row fields">
              <div className="login-label">
                <i className="fa fa-user fa-2x" style={{ color: "#b6b6b6" }}></i>
              </div>
              <div className="login-fields">
                <input
                  autoComplete="off"
                  {...register("userName", { required: "Please Provide Login ID" })}
                  placeholder="User Name"
                  type="text"
                />

              </div>
            </div>
            <div className="login-row fields">
              <div className="login-label">
                <i className="fa fa-lock fa-2x" style={{ color: "#b6b6b6" }}></i>
              </div>
              <div className="login-fields">
                <input
                  autoComplete="off"
                  {...register("userPassword", { required: "Please Provide Password" })}
                  placeholder="Password"
                  type="password"
                />

              </div>
            </div>
            <div className="login-row fields">
              <div className="login-label">
                <i className="fa fa-lock fa-2x" style={{ color: "#b6b6b6" }}></i>
              </div>
              <div className="login-fields">
                <input
                  autoComplete="off"
                  className="captchaText"
                  name="strCaptcha"
                  id="txtCaptcha"
                  {...register("captchaInput", { required: "Please Provide Captcha Text from Image Invalid Captcha" })}
                  placeholder="Enter Image Text ->"
                  type="text"
                />
              </div>
              <span>
                <div style={{ height: "32px", background: "#fff", marginTop: "2px", color: "#1f6e19", fontSize: "22px", fontStyle: "bold", paddingLeft: "16px", paddingRight: "15px" }}>
                  {captcha}
                </div>
              </span>

            </div>
            <div style={{ color: "#F7972A", textShadow: "2px 2px 5px #800000" }}>

              <ul style={{ color: "#F7972A", textShadow: "2px 2px 5px #800000" }}>
                {errors.userName && (<li style={{ color: "#F7972A", textShadow: "2px 2px 5px #800000" }}>{errors.userName.message}</li>)}
                {errors.userPassword && (<li style={{ color: "#F7972A", textShadow: "2px 2px 5px #800000" }}>{errors.userPassword.message}</li>)}
                {errors.captchaInput && (<li style={{ color: "#F7972A", textShadow: "2px 2px 5px #800000" }}>{errors.captchaInput.message} </li>)}
                {serverError && (<li style={{ color: "#F7972A", textShadow: "2px 2px 5px #800000" }}>{serverError}</li>)}
                {locationError && (<li style={{ color: "#F7972A", textShadow: "2px 2px 5px #800000" }}>{locationError}</li>)}
                {successMessage && (<li style={{ color: "#F7972A", textShadow: "2px 2px 5px #800000" }}>{successMessage}</li>)}
              </ul>
            </div>
            <div className="login-row login-submit">
              <div className="login-fields">
                <input type="checkbox" /> Remember Me
              </div>
              <input
                type="submit"
                id="btnCheckLogin"
                name="btnCheckLogin"
                value={isLoading ? "Login..." : "Login"}
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="bar-chart">
            <img src={BarChart} alt="Bar Chart" />
          </div>
        </div>
      </div>
    </form >

  );
};

export default Login;


