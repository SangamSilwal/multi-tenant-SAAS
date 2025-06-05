import React from "react"
import { useGoogleLogin } from "@react-oauth/google"


export const GoogleToLogin = () => {
    const responseGoogle = async(authResult) => {
        try {
            if(authResult['code']){
                
            }
            console.log(authResult)
        } catch (error) {
            console.log("Error While requesting google Code: ",error)
        }
    }
    const googleLogin = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: responseGoogle,
        flow: 'auth-code'
    })
    return (
        <div className="App">
            <button onClick={googleLogin}>
                Login with Google
            </button>
        </div>
    )
}