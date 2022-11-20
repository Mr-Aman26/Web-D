import React from "react";
import basestyle from "../Base.module.css";
// const Profile = ({username }) => {
//     return (
//         <div className="profile">
//             <h1 style={{ color: "white" }}>Welcome {username} !!</h1>
//             <button
//                 className={basestyle.button_common}
//                 // onClick={() => setUserState({})}
//             >
//                 Logout
//             </button>
//         </div>
//     );
// };

function Profile({username}){
    return(
        <div>
            <h1>Welcome {username}</h1>
        </div>
    );
}
export default Profile;