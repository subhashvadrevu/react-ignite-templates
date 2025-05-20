import { auth, db } from '@/components/firebase/firebase';
import { Button } from '@/components/ui/button';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Profile = () => {
  
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);

  const fetchUserData = async() => {
    auth.onAuthStateChanged(async(user) => {
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if(docSnap.exists()) {
        setUserDetails(docSnap.data());
      }
    })
  }

  const handleLogout = async() => {
    try {
      await auth.signOut();
      toast.success("User logout sucessful", {
        position: "top-right"
      })
      navigate("/login");
    } catch (error) {
      toast.error("Try again!", {
        position: "top-right"
      })
    }
  }

  useEffect(() => {
    fetchUserData();
  }, [])

  return (
    <div>
        
      {userDetails 
        ?
          <>
            <h2>Welcome {userDetails.firstName}{" "}{userDetails.lastName}</h2>
            <div>
              <p>Email: {userDetails.email}</p>
              <p>First Name: {userDetails.firstName}</p>
              <p>Last Name: {userDetails.lastName}</p>
            </div>
            <Button 
              variant={"destructive"} className={"cursor-pointer"} onClick={handleLogout} 
            >
              Sign Out
            </Button>
          </>
        :
          <p>Loading Details...</p>
      }

    </div>
  )
}

export default Profile