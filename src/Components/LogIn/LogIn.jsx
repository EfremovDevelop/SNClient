import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Typography, Card } from "antd";
import UserService from '../../Services/UserService';

const { Title, Text } = Typography;

const LogIn = () => {
    const [errorMessages, setErrorMessages] = useState([]);
    const navigate = useNavigate();

    const userService = new UserService();

    const handleLogin = async (e) => {
        e.preventDefault();
        const error = await userService.login(e.login, e.password);
        if (error) {
            setErrorMessages(error);
        }
    };

    const renderErrorMessage = () => (
        <div className="error-messages">
            {errorMessages.map((error, index) => (
                <Text key={index} type="danger">
                    {error}
                </Text>
            ))}
        </div>
    );

    return (
        <div className="login-container">
            <Card style={{ width: 600, margin: "0 auto", padding: 20 }}>
                <Title level={3} style={{ textAlign: "center" }}>
                    Вход
                </Title>
                {renderErrorMessage()}
                <Form
                    onFinish={handleLogin}
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Login"
                        name="login"
                        rules={[{ required: true, message: "Пожалуйста, введите свой login!" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: "Пожалуйста, введите свой пароль!" }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Войти
                        </Button>
                    </Form.Item>
                </Form>
                <Button type="link" onClick={() => navigate("/register")}>
                    У вас нет аккаунта? Зарегистрироваться
                </Button>
            </Card>
        </div>
    );
}

export default LogIn;