import { useState, useEffect } from "react"
import { Route, Outlet, Routes } from "react-router-dom"
import { UserEntries } from "../Components/Entries/UserEntries.jsx"
import { CreateEntry } from "../Components/Entries/CreateEntry.jsx"
import { Welcome } from "../Components/Welcome/Welcome.jsx"
import { NavBar } from "../Components/Nav/NavBar.jsx"



export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({}) // should this be an empty object or an array...

  // on the initial render of this component, we get that current user from local storage 
  useEffect(() => {
    const localDiaryUser = localStorage.getItem("diary_user")
    const diaryUserObject = JSON.parse(localDiaryUser)
    // and then we set that current user to our state 
    setCurrentUser(diaryUserObject)
  }, [])

  return (
    <Routes>
      {/* below we're creating the nav bar itself / the home path as a parent route;
      no matter where we are, we'll always render our NavBar since that's the element for the home path */}
      <Route
        path="/"
        element={
          <>
            <NavBar />
            {/* what using "Outlet" means: whenever we match one of the routes below
             aka a child route, we will render that element here @ Outlet */}
            <Outlet />
          </>
        }
      >
        {/* the index route is the default route for the parent route
        it will render into the parent outlet if there is one at the parent URL;
        we're using it below bc we only want the welcome message on the home page*/}
        <Route index element={<Welcome />} /> 
        <Route path="entries" element={<UserEntries currentUser={currentUser}/>} 
        />
        <Route path="create-entry">
          <Route index element={<CreateEntry />} />
          {/* <Route path=":edit-entry" element={<EditEntry />} /> */}
        </Route>
      </Route>
    </Routes>
  )
}

