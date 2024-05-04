import { useState, useEffect } from "react"
import { getEntriesbyEntryUserId } from "../../services/entriesService.jsx"
import { getAllTasks } from "../../services/taskService.jsx"
import { Link } from "react-router-dom"


export const UserEntries = ({ currentUser }) => {
    const [userEntries, setUserEntries] = useState([])
    const userId = currentUser.id
    const [tasks, setAllTasks] = useState([])
    const [entryId, setEntryId] = useState("")

    useEffect(() => {
        getEntriesbyEntryUserId(userId).then(setUserEntries)
    }, [userId])

    useEffect(() => {
        getAllTasks().then(setAllTasks)
    }, [userEntries])


    useEffect(() => {
        userEntries.map(entry => (
            (setEntryId(entry.id))))
    })


    //     //this useEffect will run to set the tasks; need the tasks to filter out the description
    // for each entry
    //telling it to wait to render at {entry.daysTasks?.map
    return (
        <div>
            <h1>Past Diary Entries</h1>
            <div className="task-section">
                {userEntries.map(entry => (
                    <div key={entry.id}>
                        <p>Date: {entry.date}</p>
                        <ul>
                            {entry.daysTasks.length > 0 ? entry.daysTasks.map(dayTask => {
                                const task = tasks.find(task => task.id === dayTask.taskId);
                                return <li key={dayTask.id}>{task.description}</li>;
                            })
                                : <>not here!</>}
                        </ul>
                        <Link to={{pathname:`/edit-entry/${entry.id}`,
                         state: {entryId: entryId }}}>Edit Entry</Link>
                    </div>
                ))}
            </div>
            {/* <div className="edit-entry">
                {userEntries.map(entry => (
                    <div key={entry.id}>
                        <p>Date: {entry.date}</p>
                    </div>
                ))}
            </div> */}
        </div>
    )
}

//need task descriptions for each task for each entry 
//


//get all tasks and set the them to state 
// have all tasks 
//t

// daysTasks.map(entry === )
// can filter on where the days tasks are the same 

/* i need to extract the task descriptions from the DaysTasks by taskId
and then i need to tack those onto the dailyentry via the entryId on the DaysTasks...*/

// have another useeeffect that gets all tasks base on the taskIds per entry 

// for each entry we should be looking at the tasks that were built for that
// and for each of those tasks we should be looking at the task state to pull the description out of