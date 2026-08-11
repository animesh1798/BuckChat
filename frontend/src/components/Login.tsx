import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./Login.css"

const Login = () => {

    const [name, setName] = React.useState<string>("")
    const [email, setEmail] = React.useState<string>("")
    const navigate = useNavigate()

    const submitButtonHandler = async () => {
        try {
            const response = await fetch("http://localhost:3000", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({name, email})
            })
            const {message} = await response.json() 
            if (!response.ok)
                throw new Error (message) 
           
            console.log(message)
            sessionStorage.setItem("myDetails", JSON.stringify(message))
            navigate("/online")

        } catch (message) {
            alert(message)
        } finally {
            setName("")
            setEmail("")
        }
    }

    return (
        <div className="Login">
            <h3> Welcome! </h3>
            <div className="fields">
                <input 
                    type="text" 
                    className="input-field" 
                    value = {name}
                    onChange = {e => setName(e.target.value)}
                    placeholder='Name'
                />
                <input 
                    type="text" 
                    className="input-field" 
                    value = {email}
                    onChange = {e => setEmail(e.target.value)}
                    placeholder='Email'
                />
            </div>
            <button 
                className="submit"
                onClick = {submitButtonHandler}
                >Login</button>
        </div>
    )

}

export default Login