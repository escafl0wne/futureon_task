import {Outlet,Navigate} from 'react-router-dom'

const ProtectedRoute=()=>{
    let auth = localStorage.getItem("auth")
    console.log(auth)

    return (
        auth !== process.env.REACT_APP_AUTH ? <Navigate to="/login"/> : <Outlet/>
    )
}

export default ProtectedRoute