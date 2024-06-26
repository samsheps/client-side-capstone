import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import "./NavBar.css"

// export const NavBar = () => {
//     const navigate = useNavigate

//     return (
//         <ul className="navbar">
//             {/* when the user clicks on "Create New Entry", it will take them to /newEntry */}
//             <li className="navbar-item">
//                 <Link to="/create-entry">Create New Entry</Link>
//             </li>
//             <li className="navbar-item">
//                 <Link to="/entries">All Entries</Link>
//             </li>
//             <audio controls>
//                         <source src="audio/mysong.mp3" type="audio/mp3"></source>
//                     </audio>
//             {localStorage.getItem("diary_user") ? (
//                 <li className="navbar-item navbar-logout">
//                     <Link
//                         className="navbar-link"
//                         to=""
//                         onClick={() => {
//                             localStorage.removeItem("diary_user")
//                             navigate("/", { replace: true })
//                         }}
//                     >
//                         Log Out
//                     </Link>
//                 </li>
//             ) : (
//                 ""
//             )}
//         </ul>
//     )
// }

// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import "./NavBar.css";

export const NavBar = () => {
    const navigate = useNavigate();

    return (
        <div className="navbar-container">
            <ul className="navbar">
                <li className="navbar-item">
                    <Link to="/create-entry">Create New Entry</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/entries">All Entries</Link>
                </li>
                {localStorage.getItem("diary_user") ? (
                    <li className="navbar-item navbar-logout">
                        <Link
                            className="navbar-link"
                            to=""
                            onClick={() => {
                                localStorage.removeItem("diary_user");
                                navigate("/", { replace: true });
                            }}
                        >
                            Log Out
                        </Link>
                    </li>
                ) : (
                    ""
                )}
            </ul>
            <div className="audio-player">
                <audio controls>
                    <source src="audio/mysong.mp3" type="audio/mp3"></source>
                </audio>
            </div>
        </div>
    );
};