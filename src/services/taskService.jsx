export const getAllTasks = () => {
  return fetch("http://localhost:8088/tasks").then((res) =>
    res.json()
  );
};

export const getDailyTasksByEntryId = (entryId) => {
  return fetch(`http://localhost:8088/daysTasks?entryId=${entryId}`).then((res) =>
    res.json()
  )
}

export const getDailyTasksAndDescriptionsByEntryId = (entryId) => {
  return fetch(`http://localhost:8088/daysTasks?entryId=${entryId}&_expand=task)`).then((res) =>
    res.json()
  )
}

export const updateDaysTasks = (selectedTasks) => {
  const requests = selectedTasks.map(task => {
    return fetch("http://localhost:8088/daysTasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    }).then(res => res.json());
  });

  return Promise.all(requests);
};

export const deleteOriginalDaysTasks = (deselectedTasks) => {
  const deleteTasks = deselectedTasks.map(taskId => {
    return fetch(`http://localhost:8088/daysTasks/${taskId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(res => res.json());
  });
  return Promise.all(deleteTasks)
}

//a fetch is a promise--above we're creating an array of promises 
// a promise all takes an array of promises, goes through each of them and once 
// it's done it will return out of updateDaysTasks 
// now we can call updateDaysTasks and attach a .then to it 
// promises give us the ability to give javasript a fuel limiter as greg puts it