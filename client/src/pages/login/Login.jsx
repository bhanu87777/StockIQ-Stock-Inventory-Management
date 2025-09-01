import { Button, Form, Input, message } from "antd";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlerSubmit = async (value) => {
    try {
      dispatch({ type: "SHOW_LOADING" });
      const res = await axios.post("/api/users/login", value);
      dispatch({ type: "HIDE_LOADING" });

      message.success("User Login Successfully!");
      delete res?.data?.user?.password;
      localStorage.setItem("auth", JSON.stringify(res?.data?.user));
      navigate("/home"); // 👈 redirect to home after login
    } catch (error) {
      dispatch({ type: "HIDE_LOADING" });
      message.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("auth")) {
      navigate("/home");
    }
  }, [navigate]);

  return (
    <LoginContainer>
      <LoginCard>
        <Logo src="/Logo.png" alt="logo" />
        <Subtitle>Smart Inventory Management System</Subtitle>
        <Title>Login to Continue</Title>

        <StyledForm layout="vertical" onFinish={handlerSubmit}>
          <Form.Item
            name="email"
            label="Email Address"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input placeholder="Enter Email Address" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password placeholder="Enter Password" />
          </Form.Item>

          <Button type="primary" htmlType="submit" className="login-btn">
            Login
          </Button>
        </StyledForm>

        <RegisterLink>
          Don’t have an account? <Link to="/register">Register Here</Link>
        </RegisterLink>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;

// ---------------- Styled Components ---------------- //

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #4f46e5, #3b82f6);
  font-family: "Poppins", sans-serif;
`;

const LoginCard = styled.div`
  background: #fff;
  padding: 3rem 2.5rem;
  border-radius: 1.5rem;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

const Logo = styled.img`
  width: 80px;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #1f2937;
`;

const Subtitle = styled.p`
  color: #4b5563;
  margin-bottom: 2rem;
`;

const StyledForm = styled(Form)`
  text-align: left;

  .ant-input,
  .ant-input-password {
    padding: 0.7rem;
    border-radius: 0.75rem;
  }

  .login-btn {
    width: 100%;
    margin-top: 1rem;
    padding: 0.8rem;
    border-radius: 0.75rem;
    background: linear-gradient(90deg, #f59e0b, #fbbf24);
    border: none;
    font-weight: 600;
    font-size: 1rem;
    line-height: 1.2; /* fixes text overflow */
    display: flex; /* center text */
    align-items: center; /* vertical center */
    justify-content: center; /* horizontal center */
  }
`;

const RegisterLink = styled.div`
  margin-top: 1.2rem;
  font-size: 0.9rem;
  color: #4b5563;

  a {
    color: #3b82f6;
    font-weight: 600;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;
