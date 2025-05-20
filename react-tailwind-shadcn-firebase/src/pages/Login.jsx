import { auth } from '@/components/firebase/firebase';
import { LoginForm } from '@/components/login-form'
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {

    const navigate = useNavigate();

    const onEmailChange = (newEmail) => {
        setEmail(newEmail);
    };

    const onPasswordChange = (newPassword) => {
        setPassword(newPassword);
    };

    const handleLogin = async(e) => {
      e.preventDefault();

      try {

        await signInWithEmailAndPassword(auth, email, password);
        toast.success("User login successful", {
          position: "top-right"
        })
        navigate("/");

      } catch(error) {
        console.log(error)
        toast.error(error.message, {
          position: "top-right"
        })
      }
    }


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");



  return (
     <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm 
          signupPage="/signup"
          onEmailChange={onEmailChange}
          onPasswordChange={onPasswordChange}
          onSubmit={handleLogin}
        />
      </div>
    </div>
  )
}

export default Login