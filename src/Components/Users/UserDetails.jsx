import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "./User.css"
import { getUserByEntryUserId } from "../services/userService.jsx"

// whenever we're at the UserDetails path (Route path=":userId" element={<UserDetails />), we'll render this component
//here in the UserDetails component, we can get access to the using the useParams hook
//useParams is going to return an object with a key value pair that we defined on the route (userId: 3, etc.)
export const UserDetails = () => {
    const [user, setUser] = useState({})
    const { userId } = useParams() // here we're destructuring the object by pulling out the userId; this will return to us { userId: 3} for ex.

    useEffect(() => {
        //using "data" instaed of xObj below bc our expand query yeilds an array of objects
        // then it returns the info from the fetch call & we call that data (data in then((data) is taco)
        getUserByEntryUserId(userId).then((data) => {
            console.log(data)
            const userObj = data[0] // the data @ index 0 -- we're only ever expecting to have one item in the array, so we'll start @ #1 or index 0
            setUser(userObj)
        })
    }, [userId])
    
    // on initial render, there will be no user on the user object on initial render so we use optional chaining ?
    return (
        <section className="user">
            <header className="user-header">{user.user?.fullName}</header>
            <div>
                <span className="user-info">Email : </span>
                {user.user?.email}
            </div>
            <div>
                <span className="user-info">Address : </span>
                {user.address}
            </div>
        </section>
    )
}

/* the "user" components are not currently in use but future iterations of this project
may feature a user profile */
