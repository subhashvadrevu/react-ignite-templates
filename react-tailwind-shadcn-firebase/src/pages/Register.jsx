import { auth, db } from '@/components/firebase/firebase';
import { SignUpForm } from '@/components/signup-form';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {

    const navigate = useNavigate();

    const onFnameChange = (newFname) => {
        setFname(newFname);
    };

    const onLnameChange = (newLname) => {
        setLname(newLname);
    };

    const onEmailChange = (newEmail) => {
        setEmail(newEmail);
    };

    const onPasswordChange = (newPassword) => {
        setPassword(newPassword);
    };

    const handleRegister = async(e) => {
        e.preventDefault();

        try {

            await createUserWithEmailAndPassword(auth, email, password);
            const user = auth.currentUser;
            // console.log(user);
            if(user) {
                await setDoc(doc(db, "Users", user.uid), {
                    email: user.email,
                    firstName: fname,
                    lastName: lname,
                });
            }

            toast.success("User Registered successfully !!", {
                position: "top-right"
            })

            navigate("/");

        } catch(error) {
            toast.error(error.message, {
                position: "top-right"
            })
        }
    };

  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
  
  
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <SignUpForm 
                    loginPage="/login"
                    onFnameChange={onFnameChange}
                    onLnameChange={onLnameChange}
                    onEmailChange={onEmailChange}
                    onPasswordChange={onPasswordChange}
                    onSubmit={handleRegister}
                />
            </div>
        </div>
  )
}

export default Register