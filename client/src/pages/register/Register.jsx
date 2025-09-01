import { Button, Form, Input, message } from "antd";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlerSubmit = async (value) => {
    try {
      dispatch({ type: "SHOW_LOADING" });
      await axios.post("/api/users/register", value);

      message.success("Registered Successfully! Please Login");
      navigate("/login");
      dispatch({ type: "HIDE_LOADING" });
    } catch (error) {
      dispatch({ type: "HIDE_LOADING" });
      message.error("Error while registering!");
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("auth")) {
      navigate("/home");
    }
  }, [navigate]);

  return (
    <RegisterContainer>
      <RegisterCard>
        <Logo src="/Logo.png" alt="logo" />
        <Title>Create Account</Title>

        {/* ✅ Only ONE Form */}
        <StyledForm layout="vertical" onFinish={handlerSubmit}>
          <Form.Item
            name="name"
            label="Name"
            rules={[
              { required: true, message: "Please enter your name!" },
              { min: 3, message: "Name must be at least 3 characters" },
              {
                pattern: /^[a-zA-Z\s]+$/,
                message: "Name can only contain letters",
              },
            ]}
          >
            <Input placeholder="Enter Username" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email Address"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input placeholder="Enter Email Address" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: "Please enter your password!" },
              { min: 8, message: "Password must be at least 8 characters" },
              {
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  "Password must contain uppercase, lowercase, number, and special character",
              },
            ]}
          >
            <Input.Password placeholder="Enter Password" />
          </Form.Item>

          {/* ✅ Single Button inside Form */}
          <Button htmlType="submit" className="register-btn">
            Register
          </Button>
        </StyledForm>

        <LoginLink>
          Already have an account? <Link to="/login">Login Here</Link>
        </LoginLink>
      </RegisterCard>
    </RegisterContainer>
  );
};

export default Register;

// ---------------- Styled Components ---------------- //

const RegisterContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #4f46e5, #3b82f6);
  font-family: "Poppins", sans-serif;
`;

const RegisterCard = styled.div`
  background: #fff;
  padding: 3rem 2.5rem;
  border-radius: 1.5rem;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 420px;
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

  .register-btn {
    width: 100%;
    margin-top: 1rem;
    padding: 0.8rem;
    border-radius: 0.75rem;
    background: linear-gradient(90deg, #10b981, #34d399); /* green gradient */
    border: none;
    font-weight: 600;
    font-size: 1rem;
    line-height: 1.2; /* fixes text overflow */
    display: flex; /* center text */
    align-items: center; /* vertical center */
    justify-content: center; /* horizontal center */

    &:hover {
      background: linear-gradient(90deg, #34d399, #10b981);
    }
  }
`;

const LoginLink = styled.div`
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

const Footer = styled.small`
  display: block;
  margin-top: 2rem;
  color: #9ca3af;
`;
