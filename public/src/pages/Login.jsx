import { useState } from "react";

import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/Signal-Logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utils/ApiRoutes";

const Login = () => {
    const navigate=useNavigate()
    const [values, setValues] = useState({
        username: "",
       // Removed the space to make it consistent with other fields
         password: "",
    // Corrected to match the casing in the state
    });
    const taostOptions={
    
            position:"bottom-right",
            autoClose:8000,
            pauseOnHover:true,
            draggable:true,
            theme:"dark",
    
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        // Log the values being submitted
        console.log("Submitting with values:", values);
    
        // Validate the form inputs
        if (handleValidation()) {
            console.log("Validation passed. Submitting...");
    
            try {
                // Destructure values
                const { password, username } = values;
    
                // Make the POST request to the backend
                const {data} = await axios.post(loginRoute, {
                    username,
                   
                    password,
                });
                if(data.status===false){
                    toast.error(data.msg,taostOptions);
                }
                if(data.status===true){
                    localStorage.setItem('chat-app-user',JSON.stringify(data.user))
                }
                navigate("/");
    
                // Log the response from the backend
                console.log("Response from backend:", response.data);
    
                // Assuming the registration was successful, redirect the user or show a success message
                // For example, you can redirect to the login page
                // history.push("/login");
            } catch (error) {
                // Log and handle any errors that occur during the request
                console.error("Error submitting registration:", error);
    
                // Assuming you have a toast component or similar, display an error message to the user
                toast.error("Registration failed. Please try again later.");
            }
        } else {
            // Validation failed, do nothing or display a message to the user
            console.log("Validation failed. Unable to submit.");
        }
    };
    
    const handleValidation = () => {
        const { password,  username } = values;
        if (password === "") {
          toast.error("email and password is required", toastOptions);
            return false;
        } else if (username.length ==="") {
            toast.error("email and password is required", toastOptions);
            return false;
        }
        
        // If all validations pass, return true
        return true;
    };
    

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    return (
        <>
            <FormContainer>
                <form onSubmit={(event) => handleSubmit(event)}>
                    <div className="brand">
                        <img src={logo} alt="logo" />
                        <h1>Converso</h1>
                    </div>
                    <input type="text" placeholder="Username" name="username" onChange={(e) => handleChange(e) } min="3" />
                    
                    <input type="password" placeholder="Password" name="password" onChange={(e) => handleChange(e)} />
                   
                    <button type="submit">Login</button>
                    <span>
                        Don't  have an account ?<Link to="/register">Register</Link>
                    </span>
                </form>
            </FormContainer>
            <ToastContainer />
        </>
    );
};

const FormContainer = styled.div`
    height: 100vh;
    width: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #131324;
    .brand {
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: center;
        img {
            height: 5rem;
        }
        h1 {
            color: white;
            text-transform: uppercase;
        }
    }
    form {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        background-color: #00000076;
        border-radius: 2rem; // Corrected typo
        padding: 3rem 5rem; // Corrected typo
        input {
            background-color: transparent;
            padding: 1rem;
            border: 0.1rem solid #4e0eff; // Corrected typo and added #
            border-radius: 0.4rem;
            color: white;
            width: 100%;
            font-size: 1rem;
            &:focus {
                border: 0.1rem solid #997af0; // Corrected hex code
                outline: none;
            }
        }
        button {
            background-color: #997af0;
            color: white;
            padding: 1rem 2rem;
            border: none;
            font-weight: bold;
            cursor: pointer;
            border-radius: 0.4rem; // Corrected typo
            font-size: 1rem;
            text-transform: uppercase;
            transition: background-color 0.5s ease-in-out; // Specified property to transition
            &:hover {
                background-color: #4e0eff;
            }
        }
        span {
            color: white;
            text-transform: uppercase;
        }
        a {
            color: #4e0eff;
            text-decoration: none;
            font-weight: bold;
        }
    }
`;

export default Login;
