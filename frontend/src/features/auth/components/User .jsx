import React, { useEffect, useState } from "react";
import { getUser } from "../services/api";

const User = () => {

  const [user,setUser] = useState(null);

  useEffect(()=>{

    const fetchUser = async () => {

      try{

        const res = await getUser();
        setUser(res.data);

      }catch(err){

        console.log(err);

      }

    };

    fetchUser();

  },[]);

  return (

    <div className="min-h-screen flex items-center justify-center bg-base-200">

      <div className="card w-96 bg-base-100 shadow-lg">

        <div className="card-body text-center">

          <h2 className="text-2xl font-bold">
            User Profile
          </h2>

          {user ? (

            <>
              <p className="mt-4">
                <strong>Name:</strong> {user.name}
              </p>

              <p>
                <strong>Email:</strong> {user.email}
              </p>
            </>

          ) : (

            <p className="mt-4">
              Loading user...
            </p>

          )}

        </div>

      </div>

    </div>

  );
};

export default User;