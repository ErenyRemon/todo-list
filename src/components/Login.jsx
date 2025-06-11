import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import myImage from '../assets/01.png'; 
import toDo from '/public/check.svg'; 
import "./Login.css";
import { FcGoogle } from "react-icons/fc";


function Login({ setUser }) {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Logged in:", user.displayName);
      setUser(user);
    } catch (error) {
      console.error("login failed:", error.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-content-center">
    <div className="rightSide">
    <img style={{width: '25px',marginBottom: '80px'}} src={toDo}  alt="" />
      <h1 className="todoheader" style={{color:'white'}}> TODO LIST FOR YOU </h1>
      <p className="superP" style={{color: 'white'}}>Super easy to use</p>
      <button className='singBtn'  onClick={handleLogin}>Sign in with Google <FcGoogle style={{width: '24px'}}/> </button>
    </div>
      <div className="leftSide" style={{backgroundImage: `url(${myImage})`, backgroundSize: 'cover'}}>
        {/* <img style={{}} src={myImage} alt="" /> */}
      </div>

    </div>
  );
}

export default Login;
