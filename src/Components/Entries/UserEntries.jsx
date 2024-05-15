import { useState, useEffect } from "react"
import { getEntriesbyEntryUserId } from "../../services/entriesService.jsx"
import { getAllTasks } from "../../services/taskService.jsx"
import { Link } from "react-router-dom"
import "./Entries.css"

export const UserEntries = () => {
    const [userEntries, setUserEntries] = useState([])
   // const userId = currentUser.id
    const [tasks, setAllTasks] = useState([])
    const [entryId, setEntryId] = useState("")
    const localDiaryUser = localStorage.getItem("diary_user")
    const diaryUserObject = JSON.parse(localDiaryUser)

    const fetchTasksAndEntries = async () => {
        const tasksData = await getAllTasks();
        const entriesData = await getEntriesbyEntryUserId(diaryUserObject.id);
        setAllTasks(tasksData);
        setUserEntries(entriesData);
    };
    
    useEffect(() => {
        fetchTasksAndEntries();
    }, [])

    useEffect(() => {
        userEntries.map(entry => (
            (setEntryId(entry.id))))
    })

    return (
        <div className="header-section">
            <h1>Past Diary Entries</h1>
            <div className="entries-container">
                <div className="entries">
                    {userEntries.map(entry => (
                        <div key={entry.id}>
                            <div className="entry">
                                <div className="date">
                                    <p>Date: {entry.date}</p>
                                </div>
                                <ul>
                                    {entry.daysTasks.length > 0 ? entry.daysTasks.map(dayTask => {
                                        const task = tasks.find(task => task.id === dayTask.taskId);
                                        return task ? <li key={dayTask.id}>{task.description}</li> : null;
                                    })
                                        : <>not here!</>}
                                </ul>
                                <div className="edit-btn">
                                    <Link to={{
                                        pathname: `/edit-entry/${entry.id}`,
                                        state: { entryId: entryId }
                                    }}>Edit Entry</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}