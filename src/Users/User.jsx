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

//this component may not be necessary--