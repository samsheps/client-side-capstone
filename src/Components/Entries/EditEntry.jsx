import { useState, useEffect } from "react";
import { deleteOriginalDaysTasks, getAllTasks, getDailyTasksAndDescriptionsByEntryId, updateDaysTasks } from "../../services/taskService";
import { getEntryById, updateEntry } from "../../services/entriesService";
import { useNavigate, useParams } from "react-router-dom";



//below we're passing in something (entryId) as a prop; 
//we generally pass in props through the parent module/the one that holds more info

// could outside of the checkbox box write out what is alraedy selected
// edit entry needs to 
/* for every dailyTask.entryId that matches te entryID that we are currently editing, 
  we need to make the checkmark true OR print a list of those items up top 
  so we know what's already been slected (former makes checkmarks look useable and they arent)

  can also say show me all the tasks that are not listed (liekly using a ! / ternary statement
    which neans opposite so we don't have to rewrite the code 
  )

goal of this edit entries page is to make a list of all the tasks 
that are selected on the edit entries page (which is currently working) & 
that's our first state/saved in our first state. 
then we need to get the dailyEntryId of the entry that we're editing
then we need to look for daily tasks that have that corresponding entryId
then we need to edit all of those daily tasks that have that entry id */

export const EditEntry = () => {
    // the below will be the first state listed in your hooks
    const [selectedTasks, setSelectedTasks] = useState([]);
    // the below will be our 2nd state repped in our hooks
    const [allTasks, setAllTasks] = useState([]);
    const [entry, setEntry] = useState({});
    //const currentEntryId = entryId.id
    const { entryId } = useParams()
    const [tasksAndDescriptions, setTasksAndDescriptions] = useState([])
    const [toDeleteTasks, setToDeleteTasks] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getAllTasks().then((taskData) => setAllTasks(taskData));
        //getEntryById(entryId).then((entryData) => {
        //  setEntry(entryData);
        // setSelectedTasks(entryData.daysTasks.map((task) => task.taskId));
    }, []);

    useEffect(() => {
        getEntryById(entryId).then(setEntry)
    }, [entryId])

    useEffect(() => {
        getDailyTasksAndDescriptionsByEntryId(entryId).then((data) => 
            setTasksAndDescriptions(data));
    }, [entry])

    //below we're iterating over task and descritptions and then we're returning the id (an array of ids) 

    useEffect(() => {
        let selected = tasksAndDescriptions.map(tad => tad.taskId)
        let tadIds = tasksAndDescriptions.map(tad => tad.id) 
        console.log(selected)
        console.log(tadIds)
        setSelectedTasks(selected)
        setToDeleteTasks(tadIds)
    }, [tasksAndDescriptions])

    const handleTaskSelection = (taskId) => {
        const isSelected = selectedTasks.includes(taskId);
        if (isSelected) {
            setSelectedTasks(selectedTasks.filter((id) => id !== taskId));
        } else {
            setSelectedTasks([...selectedTasks, taskId]);
        }
    };
//need to address the page not autorendering when a save or delete occurs
// it should be navigating to entries and rerendering 

//the below don't fire until we get into the return
    const handleSubmit = () => {
        const daysTasks = selectedTasks.map((taskId) => ({ entryId: parseInt(entryId), taskId: taskId }))
        updateDaysTasks(daysTasks).then(() => {
            deleteOriginalDaysTasks(toDeleteTasks).then(() => {
                navigate("/entries")
            })
        })
    //     const updatedEntry = {
    //         //the below (...entry) creates a copy of entry then it sets/updates the daysTasks property with the value on the right
    //         ...entry,
    //    };
    //     updateEntry(updatedEntry);
    //     setSelectedTasks([]);
    }; 



    if (!entry) {
        return <div>Loading...</div>;
    }


    return (<>
        <div className="header-section">
            <h1>Edit Entry</h1>
            <h1>{entryId}</h1>
            <h2>{entry.date}</h2>
        </div>
        {/* <section>
            Daily Items Already Selected:
            {taskList.map((item) => (
                <div key={item.taskId}> {item} </div>
            ))}
            </section> */}
        <div className="task-section">
            <form>
                {allTasks.map((task) => (
                    <div key={task.id}>
                        <input
                            type="checkbox"
                            value={task.description}
                            id={task.id}
                            checked={selectedTasks.includes(task.id)}
                            onChange={() => handleTaskSelection(task.id)}
                        />
                        <label htmlFor={task.id}>{task.description}</label>
                    </div>
                ))}
            </form>
        </div>
        <button onClick={handleSubmit}>Save Changes</button>
     </>);
}