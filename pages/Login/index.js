import GoogleLoginComponent from '../Login/Google/GoogleLoginComponent'
import { useRouter } from 'next/router'

const Login = () =>{

    const router = useRouter()

    const redirect = () =>{
        router.push({pathname: '/Dashboard',query: {}})
    }
    
    const loginStatus = () =>{
        redirect()
    }

    return (
        <div className="loginmaindiv">
            <div className="loginDiv">
                Welcome to Sarphira! Build your own stock sectors - monitor, visualize and make informed buying decisions. 
                You could still screw up and lose money because as they say - historical performance is not an indication of future performance.
                <br></br>
                I'll let you figure out what the site name means.
            </div>
            <br></br>
            <div>
                <GoogleLoginComponent status={loginStatus}>
                </GoogleLoginComponent>
            </div>
        </div>
    )
}
export default Login
