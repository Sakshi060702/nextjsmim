'use client';
import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { logout } from "../Redux/authSlice";

const useAuthCheck=()=>{
    const tokenExpiry=useSelector((state)=>state.auth.tokenExpiry);
    const isAuthenticated=useSelector((state)=>state.auth.isAuthenticated);
    const dispatch=useDispatch();
    const router=useRouter();

    useEffect(()=>{
        if(tokenExpiry){
            const now=new Date().getTime();
            const expiryTime=new Date(tokenExpiry).getTime();

            if(now>=expiryTime){
                dispatch(logout());
                router.push('/login')
            }
        }
    },[tokenExpiry,dispatch,router]);
    return isAuthenticated;
};
export default useAuthCheck;