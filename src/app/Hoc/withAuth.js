'use client';
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthCheck from '../Hooks/useAuthCheck'; // Correct import

const withAuthh = (Component) => {
    return (props) => {
        const router=useRouter();
        const isAuthenticated = useAuthCheck();

        useEffect(()=>{
            if(!isAuthenticated){
                router.push('/')
            }
        },[isAuthenticated,router]);

        if(!isAuthenticated){
            return null;
        }

        return <Component {...props} />;
    };
};

export default withAuthh;
