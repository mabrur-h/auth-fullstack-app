import {useEffect, useState} from "react";
import {FaSignInAlt} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {login, reset} from '../features/auth/authSlice'
import Spinner from "../components/Spinner";


function Login() {
  const [formData, setFormData] = useState({
    user_login: '',
    user_password: ''
  })

  const {user_login, user_password} = formData;

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isLoading, isError, isSuccess, message} = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      user_login,
      user_password
    }

    dispatch(login(userData))
  }

  if (isLoading) {
    return <Spinner/>
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt/> Login
        </h1>
        <p>Please login to your account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input type="text"
                   className="form-control"
                   id="user_login"
                   name="user_login"
                   value={user_login}
                   placeholder='Enter your login'
                   onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input type="password"
                   className="form-control"
                   id="user_password"
                   name="user_password"
                   value={user_password}
                   placeholder='Enter your password'
                   onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Login
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login