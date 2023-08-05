import config from '../config/config.js'
const Authmiddleware =(req,res,next)=>{
    const token = req.header('auth-token');
    console.log(req.header,token)
    if(!token){
        return res.status(401).json({"message":"Nice try, but access denied"});
    }
    if(token !== config.API_TOKEN){
        return res.status(401).json({"message":"Nice try, but access denied"});
    }
    next()
}
export default Authmiddleware;