import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

function Dashboard() {
  const [data, setData] = useState({});
  const {user} = useSelector((state) => state.auth)

  const getAbout = async () => {
    try {
      const config = {
        headers: {
          'Authorization': user.data.token
        }
      }

      let result = await axios.get('/api/v1/about', config)

      setData(result.data)

    } catch (e) {
      console.log(e)
    }
  }

  useEffect(  () => {
    if (!user) return null

    getAbout().then()
    return () => {
      console.log('This will be logged on unmount');
    }
  }, [])

  return user ? (<div>
    <h2>Hello, {user.data.user.user_name}!</h2>
    <h4>ABOUT: {data.message}</h4>
  </div>) : <Navigate to='/login' replace/>
}

export default Dashboard;