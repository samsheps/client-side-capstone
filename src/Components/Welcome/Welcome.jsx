import { Login } from "../Auth/Login.jsx"
import "./Welcome.css"
export const Welcome = () => {
    return (
        <div className="welcome-container">
            <h1>
                <span>Dear Daily Diary</span>
                <span>A daily task tracker to keep your spirits lifted</span>
            </h1>
             {/* <Login /> */}
        </div>
    ) 
}