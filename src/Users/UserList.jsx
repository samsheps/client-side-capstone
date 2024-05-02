import { useEffect, useState } from "react"
import "./User.css"
import { getAllUsers } from "../services/userService.jsx"
import { User } from "../../Users/User.jsx"
import { Link } from "react-router-dom"

export const UsersList = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        getAllUsers().then(usersArray => {
            setUsers(usersArray)
        })
    }, [])

    return (
        <div className="users">
            {users.map((userObj) => {
                return (
                    <Link to={`/users/${userObj.id}`} key={userObj.id}>
                        <User users={users} key={userObj.id} />
                    </Link>
                )
            })}
        </div>
    )
}