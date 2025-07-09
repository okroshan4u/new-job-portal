// import { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";




// const ProtectRoute = ({Children}) =>{
//     const {user} = useSelector(store => store.auth)
//     console.log("i am user from protech Router", user?.role)
//     const naivgate = useNavigate()
//     useEffect(()=>{
//         if(user == null || user.role != 'recruiter'){
//             naivgate('/')
//         }
//         console.log("I am user from protect router 2",user?.role)
//     },[])
//     return(
//         <>
//         {Children}
//         </>
//     )
// };
//  export default ProtectRoute;


import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectRoute = ({ children }) => {
  const { user } = useSelector((store) => store.auth);
  console.log("I am user from ProtectRoute:", user?.role);

  if (!user || user.role !== "recruiter") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectRoute;
