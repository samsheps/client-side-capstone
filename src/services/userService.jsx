export const getAllUsers = () => {
    return fetch(`http://localhost:8088/users`).then((res) =>
        res.json()
    );
};
//below we have to pass in userId so it has something to compare the dailyEntries userId to 
export const getUserbyEntryUserId = (userId) => {
    return fetch(`http://localhost:8088/dailyEntries?userId=${userId}&_expand=user`).then((res) =>
        res.json()
    )
}

export const getUserByEmail = (email) => {
    return fetch(`http://localhost:8088/users?email=${email}`).then((res) =>
        res.json()
    )
}

export const createUser = (user) => {
    return fetch("http://localhost:8088/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    }).then((res) => res.json())
}