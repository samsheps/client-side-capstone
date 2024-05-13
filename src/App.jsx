import "./App.css"
import { Route, Routes } from "react-router-dom";
import { Authorized } from "./Views/Authorized.jsx";
import { ApplicationViews } from "./Views/ApplicationViews.jsx";
import { Register } from "./Components/Auth/Register.jsx";
import { Welcome } from "./Components/Welcome/Welcome.jsx";
import { Login } from "./Components/Auth/Login.jsx";
import "./App.css"


export const App = () => {
  /* if they are, then the application views is the CHILD component of Authorized; 
          therefore, if authorized finds the diary_user object, we'll return the views in "ApplicationViews.jsx" 
       "Authorized" (in Authorized.jsx) is going to check if the user is authorized */
  return (

    <Routes>
      < Route path="login" element={<Login />} />
      < Route path="welcome" element={<Welcome />} />
      < Route path="register" element={<Register />} />
      < Route
        path="*"
        element={
          <Authorized>
            <ApplicationViews />
          </Authorized>
        }
      />
    </Routes>
  )
};


