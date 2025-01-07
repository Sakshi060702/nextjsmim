'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useUser } from "@/context/UserContext";

import "../../Styles/Frontend/css/style.css";
import "../../Styles/Frontend/css/RegistrationMV.css";
import "../../Styles/Frontend/css/dropdown.css";
import "../../Styles/Frontend/css/bootstrap.min.css";
import "../../Styles/Frontend/css/Receiveotp2.css";
import "../../Styles/Frontend/css/custom.css";




function Receiveotpmn() {
    // const searchParams=useSearchParams();
    //const otp=searchParams.get('otp');
    // const mobile=searchParams.get('mobile')
    const { mobile, email } = useUser();
    console.log('mobile',mobile);
    // const { otp, mobile } = location.state || { otp: '', mobile: '' };
    const [userOtp, setUserOtp] = useState(['', '', '', '']);
    const [error, setError] = useState('');
    const[reSendMessage,setResendMessage]=useState('');
    const[loading,setLoading]=useState(false);
    const router = useRouter();

    const handleOtpChange = (e, index) => {
        const { value } = e.target;

        // Check if the input value is a digit
        if (/^\d?$/.test(value)) {
            const newOtp = [...userOtp];
            newOtp[index] = value;
            setUserOtp(newOtp);

            // Automatically focus on the next input box if there is a value and index < 3
            if (value && index < 3) {
                document.getElementById(`otp-${index + 1}`).focus();
            }
        }
    };

    const handleResendOtp=async()=>{
        setLoading(true);
        setResendMessage('');

        const payload={
            countryCode: '+91',  
            mobile: mobile,     
           
        }

        try{
            const response =await fetch('https://apidev.myinteriormart.com/api/SignIn/SendOtp',
                {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
                    },
                    body: JSON.stringify(payload),
                }
            );
            if(response.ok){
                setResendMessage('OTP has been resend successfully')
            }
            else{
                setResendMessage('Failed to resend otp')
            }
        }
        catch(error){
setResendMessage('Error occured whilte sending otp')
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const otpString = userOtp.join('');

        try {
            const response = await fetch('https://apidev.myinteriormart.com/api/SignIn/VerifyOtp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "kpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ",
                },
                body: JSON.stringify({ otp: otpString, mobile }),
            });

            const data = await response.json();

            const cityName = localStorage.getItem('cityname');
            const pathregister = `/register`;


            if (response.ok) {
                if (data) {
                    router.push(pathregister,{ state: { mobile } });
                } else {
                    setError('Invalid OTP. Please try again.');
                }
            } else {
                setError('Failed to verify OTP. Please try again later.');
            }
        } catch (error) {
            setError('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="container-fluid sign_up_container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div id="sign-in-dialog" className="dialog-mfp zoom-anim-dialog" style={{ maxWidth: '500px' }}>
                        <div className="step first">
                            <div>
                                <h2 className="text-center pt-3 heading" style={{ whiteSpace: 'nowrap' }}>Verify Your Mobile Number</h2>
                                <div className="row justify-content-center">
                                    <h5>Get Connected to Verified Sellers</h5>
                                </div>
                            </div>
                            <div className="tab-content checkout">
                                <div>
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group mr-2">
                                            <p>Enter 4 digit One Time Password (OTP) sent to your Mobile Number +91 {mobile} via SMS</p>
                                        </div>
                                        <div className="form-group mb-4 d-flex align-items-center">
                                            <div className="otpimage" style={{ marginTop: '-20px' }}>
                                                <img src='../../FrontEnd/img/icon/mobile.png' alt="Mobile Icon" style={{ width: '80px', height: '80px', marginRight: '10px'}} />
                                            </div>
                                            {/* <div>
                                                <input
                                                    type="text"
                                                    name="generatedOTP"
                                                    placeholder="Generated OTP"
                                                    value={otp}
                                                    readOnly
                                                    style={{ width: '120px', height: '50px' }}
                                                    className="form-control input"
                                                />
                                            </div> */}
                                        </div>
                                        <div className=" mb-4  align-items-center otp-inputs">
                                            {userOtp.map((digit, index) => (
                                                <input
                                                    key={index}
                                                    id={`otp-${index}`}
                                                    type="text"
                                                    maxLength="1"
                                                    value={digit}
                                                    onChange={(e) => handleOtpChange(e, index)}
                                                    className="otp-input "
                                                    style={{ color: 'black' }}
                                                />
                                            ))}
                                        </div>
                                        {error && <div className="form-group"><p style={{ color: 'red' }}>{error}</p></div>}
                                        <div className="form-group mr-2 align-self-stretch">
                                            <button type="submit" className="btn_1 full-width mb-4 input" style={{ height: '50px' }}>Submit</button>
                                        </div>
                                      
                                    </form>
                                    <button onClick={handleResendOtp} > Resend OTP</button>
                                    {reSendMessage && <p>{reSendMessage}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Receiveotpmn;
