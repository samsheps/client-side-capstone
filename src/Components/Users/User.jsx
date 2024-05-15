import "./User.css"

export const User = ({ users }) => {
    return (
        <div className="users">
            <div>
                <div className="user-info">Name</div>
                <div>{users.fullName}</div>
            </div>
            <div>
                <div className="user-info">Email</div>
                <div>{users.email}</div>
            </div>
        </div>
    )
}

/* the "user" components are not currently in use but future iterations of this project
may feature a user profile */
