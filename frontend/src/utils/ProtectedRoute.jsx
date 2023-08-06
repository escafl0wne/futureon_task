import {Outlet,Navigate} from 'react-router-dom'

const ProtectedRoute=()=>{
    let auth = localStorage.getItem("auth")


    return (
        !auth || auth.length !== 36 && auth.split("-")[3] !== "8cf2" ? <Navigate to="/login"/> : <Outlet/>
    )
}

export default ProtectedRoute