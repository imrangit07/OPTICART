import { useState } from 'react';
import '../../CSS/LoginModal.css';
import { MdCancel } from "react-icons/md";
import BackendURL from '../../config/backendURL';
import { saveUser } from '../../slice/userSlice';

import Cookies from 'js-cookie';
import axios from 'axios';
import { useDispatch } from 'react-redux';

const LoginModal = ({ isOpen, onClose }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [userInput, setUserInput] = useState({
    userEmail: '',
    userPassword: '',
  });

  const [registerData, setRegisterData] = useState({
    userName: '',
    userEmail: '',
    userPassword: '',
  });

  const dispatch = useDispatch()

  const handleRegisterInput = (e) => {
    const { name, value } = e.target;
    setRegisterData(values => ({ ...values, [name]: value }));
    console.log(registerData);
  }
  const handleLoginInput = (e) => {
    const { name, value } = e.target;
    setUserInput(values => ({ ...values, [name]: value }));
    // console.log(userInput);
  }

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BackendURL}/user/register`, registerData);
      console.log(res.data);
      setIsRegister(false);

    } catch (error) {
      alert(error.response.data.message);

    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BackendURL}/user/login`, userInput,{ withCredentials: true });
      console.log(res.data);
      // console.log(res.data.token);
      dispatch(saveUser(res.data))
      // localStorage.setItem("currentUser",JSON.stringify({id:res.data.id,userName:res.data.userName,token:res.data.token}))
      //  const token = Cookies.get("token");
      setIsRegister(false);
      setUserInput({
        userEmail: '',
        userPassword: '',
      })
      if(res.data.success)
      {
      alert("User Login Successfully!")
      }

    } catch (error) {
      alert(error);

    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}><MdCancel /></button>

        {isRegister ? (
          <>
            <h2>Create Account</h2>
            <form onSubmit={handleRegisterSubmit}>
              <input type="text" placeholder="Full Name" name='userName' value={registerData.userName} onChange={handleRegisterInput} required />
              <input type="email" placeholder="Email" name='userEmail' value={registerData.userEmail} onChange={handleRegisterInput} required />
              <input type="password" placeholder="Password" name='userPassword' value={registerData.userPassword} onChange={handleRegisterInput} required />
              <button type="submit">Register</button>
            </form>
            <p className="switch-link">
              Already have an account?{' '}
              <span onClick={() => {
                setIsRegister(false)
              }}>Login here</span>
            </p>
          </>
        ) : (
          <>
            <h2>Login</h2>
            <form onSubmit={handleLoginSubmit}>
              <input type="email" placeholder="Email" name='userEmail' value={userInput.userEmail} onChange={handleLoginInput} required />
              <input type="password" placeholder="Password" name='userPassword' value={userInput.userPassword} onChange={handleLoginInput} required />
              <button type="submit">Login</button>
            </form>
            <p className="switch-link">
              Don't have an account?{' '}
              <span onClick={() => setIsRegister(true)}>Create Account</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
