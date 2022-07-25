import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
} from "reactstrap";
import { Twitter, Facebook, GitHub } from "react-feather";
import {
  Password,
  SignIn,
  EmailAddress,
  RememberPassword,
  ForgotPassword,
  CreateAccount,
  FIREBASE,
  AUTH0,
  JWT,
  LoginWithJWT,
} from "../constant";

const NewLogin = (props) => {
  const [togglePassword, setTogglePassword] = useState(false);
  const [password, setPassword] = useState("");
  const [selected, setSelected] = useState("firebase");

  const handleChange = (e) => {
    setPassword(e.target.value);
  };
  const HideShowPassword = (tPassword) => {
    setTogglePassword(!tPassword);
  };

  return (
    <Container fluid={true} className="p-0 w-5">
      <Row className="m-0">
        <Col xs="12" className="p-0">
          <div className="login-card">
            <div>
              <div>
                <a className="logo" href="#javascript">
                  <img
                    className="img-fluid for-light"
                    src={require("../assets/images/logo/login.png")}
                    alt=""
                  />
                </a>
              </div>
              <div className="login-main login-tab">
                <Form className="theme-form">
                  <h4>
                    {selected === "firebase"
                      ? "Sign In With Firebase"
                      : "Sign In With Jwt"}
                  </h4>
                  <p>{"Enter your email & password to login"}</p>
                  <FormGroup>
                    <Label className="col-form-label">{EmailAddress}</Label>
                    <Input
                      className="form-control"
                      type="email"
                      required=""
                      placeholder="Test@gmail.com"
                    />
                  </FormGroup>
                  <div className="mb-3 position-relative">
                    <Label className="col-form-label">{Password}</Label>
                    <Input
                      className="form-control"
                      type={togglePassword ? "text" : "password"}
                      name="login[password]"
                      value={password}
                      onChange={(e) => handleChange(e)}
                      required=""
                      placeholder="*********"
                    />
                    <div
                      className="show-hide"
                      onClick={() => HideShowPassword(togglePassword)}
                    >
                      <span className={togglePassword ? "" : "show"}></span>
                    </div>
                  </div>
                  <div className="login-btn mb-0">
                    <div className="checkbox ms-3">
                      <Input id="checkbox1" type="checkbox" />
                      <Label className="text-muted" for="checkbox1">
                        {RememberPassword}
                      </Label>
                    </div>
                    <a className="link" href="#javascript">
                      {ForgotPassword}
                    </a>
                    {selected === "firebase" ? (
                      <Button color="primary">{SignIn}</Button>
                    ) : (
                      <Button color="primary">{LoginWithJWT}</Button>
                    )}
                  </div>
                  <p className="mt-4 mb-0">
                    {"Don't have account?"}
                    <a className="ms-2" href="#javascript">
                      {CreateAccount}
                    </a>
                  </p>
                </Form>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default NewLogin;
