export const getEntriesbyEntryUserId = (userId) => {
    return fetch(`http://localhost:8088/entries?userId=${userId}&_embed=daysTasks`).then((res) =>
        res.json()
    )
}

//http://localhost:8088/entries?userId=1&_embed=daysTasks

// http://localhost:8088/daysTasks?_expand=entry&_expand=task

// for each of these objects, only give me the ones whose user id 
// matches what's in local storage

//localStorage.getItem("diary_user").id

//task.entry.id=

//there should be 5 services: get all, get one, post, edit, delete 

// need a post in my entries service 
