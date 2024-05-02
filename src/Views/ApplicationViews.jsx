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
        {/* below we have a routes extablished to listen for "/tickets" and "/customers"; 
        when the URL is at those paths (tickets & customers, respectively--we don't need the forward slash bc it's a child of the home), we want to render the element (TicketList & CustomerList components)
        then we have a route paramter with the path=":customerID" which will be a key:value pair;
        customerId is the key and value will be whatever ID is rendering at that postion  */}
        {/* both the key and value below are currentUser (one could differ but for ease we're setting them this way) */}
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

