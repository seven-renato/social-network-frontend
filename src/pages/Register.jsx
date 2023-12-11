import React from 'react';
import { useState } from 'react';

import { LockOutlined, MailOutlined, UserOutlined, CalendarOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select } from 'antd';

import { Link } from 'react-router-dom';
import { registerRequest } from '../axios/apiCalls';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

const options = [
    <Select.Option value="organization" key="male">Organização</Select.Option>,
    <Select.Option value="person" key="female">Pessoa</Select.Option>,
]

export default function Register() {
    const [alertMessage, setAlertMessage] = useState(""); // Mensagem;
    const [showAlertMessage, setShowAlertMessage] = useState(false); // Exibir ou não;
    const [typeAlertMessage, setTypeAlertMessage] = useState(''); // Tipo da mensagem: success, error, warning ou info;
    // Alert message for register
    const handleAlertMessage = (type, message) => {
        setShowAlertMessage(true);
        setAlertMessage(message);
        setTypeAlertMessage(type);
        setTimeout(() => { setShowAlertMessage(false) }, 7000); // Fechar a mensagem;
    };
    // Select for user type
    const [userType, setUserType] = useState("")
    const handleChange = (value) => {
        if (value === "organization") {
            setUserType("organization")
        } else if (value === "person") {
            setUserType("person")
        }
    };
    // Submit the form register user
    const onFinish = (values) => {
        if (userType === "") {
            return 
        }
        registerRequest(values).then(response => {
            if(response.status == 200){
                handleAlertMessage("success", "Usuário criado com sucesso.");
                window.location.href = "/login";
            } else {
                handleAlertMessage("error", "Algo de errado aconteceu com a sua tentativa de cadastro.");
            }
        })
    };
    
    return (
        <>
                <Form className="flex flex-col" name="normal_login"  onFinish={onFinish}>
                    <Form.Item name="type"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor insira escolha seu tipo de conta!',
                            },
                            ]}
                    >
                        <Select className='mb-5' onChange={handleChange} placeholder="Selecione seu tipo de conta" allowClear>
                            {options}
                        </Select>
                    </Form.Item>
                    {userType !== "" && (
                        <>
                            <Form.Item
                                name="username"
                                rules={[
                                {
                                    required: true,
                                    message: 'Por favor insira o seu Username!',
                                },
                                ]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                            </Form.Item>
                            <Form.Item
                                name="name"
                                rules={[
                                {
                                    required: true,
                                    message: 'Por favor insria o seu nome!',
                                },
                                ]}
                            >
                                <Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Nome" />
                            </Form.Item>
        
                            {userType === "person" && ( 
                                <Form.Item
                                    name="age"
                                    rules={[
                                    {
                                        required: true,
                                        message: 'Por favor insria o sua idade!',
                                    },
                                    ]}
                                >
                                    <Input prefix={<CalendarOutlined className="site-form-item-icon" />} placeholder="Idade" />
                                </Form.Item>
                            )} 
                        
                        </>
                    )}
                              
                    
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">Registrar</Button>
                        <span> &nbsp;Ou <Link to={'/auth/login'}>fazer login!</Link></span>
                    </Form.Item>
                </Form>
                <Snackbar
                    open={showAlertMessage}
                    severity="success"
                    TransitionComponent={SlideTransition}
                    anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center"
                    }}>
                    <Alert  severity={typeAlertMessage} sx={{ width: '100%' }}>
                    {alertMessage}
                    </Alert>
                </Snackbar>
        </>
    )
}