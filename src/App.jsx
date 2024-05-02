import "./App.css"
import { Route, Routes } from "react-router-dom";
import { Authorized } from "./Views/Authorized.jsx";
import { ApplicationViews } from "./Views/ApplicationViews.jsx";
import { Register } from "./Components/Auth/Register.jsx";
import { Welcome } from "./Components/Welcome/Welcome.jsx";


export const App = () => {
  /* if they are, then the application views is the CHILD component of Authorized; 
          therefore, if authorized finds the diary_user object, we'll return the views in "ApplicationViews.jsx" 
       "Authorized" (in Authorized.jsx) is going to check if the user is authorized */
  return (

    <Routes>
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


