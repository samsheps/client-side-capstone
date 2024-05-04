export const getEntriesbyEntryUserId = (userId) => {
    return fetch(`http://localhost:8088/entries?userId=${userId}&_embed=daysTasks`).then((res) =>
        res.json()
    )
}

export const getEntryById = (id) => {
    return fetch(`http://localhost:8088/entries/${id}`).then((res) =>
        res.json()
    )
}

export const createDailyEntry = (userId, date, selectedTasks) => {
    const dailyEntry = {
        userId: userId,
        date: date,
    };

    return fetch("http://localhost:8088/entries", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dailyEntry),
    })
        .then((res) => res.json())
        .then((createdEntry) => {
            // Then, create the daysTasks entries for each selected task
            const daysTasksPromises = selectedTasks.map(taskId => {
                const daysTask = {
                    entryId: createdEntry.id, // Use the ID of the created entry
                    taskId: taskId,
                };
                return fetch("http://localhost:8088/daysTasks", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(daysTask),
                }).then((res) => res.json());
            });

            // Wait for all daysTasks entries to be created
            return Promise.all(daysTasksPromises);
        });
};

export const updateEntry = (entryId, updatedEntryData) => {
    return fetch(`http://localhost:8088/entries/${entryId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEntryData),
    }).then((res) => res.json());
};




//http://localhost:8088/entries?userId=1&_embed=daysTasks

// http://localhost:8088/daysTasks?_expand=entry&_expand=task

// for each of these objects, only give me the ones whose user id 
// matches what's in local storage

//localStorage.getItem("diary_user").id

//task.entry.id=

//there should be 5 services: get all, get one, post, edit, delete 

// need a post in my entries service 
