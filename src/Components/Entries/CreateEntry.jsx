import { useState, useEffect } from "react";
import { getAllTasks } from "../../services/taskService";
import { createDailyEntry } from "../../services/entriesService.jsx";
import { useNavigate } from "react-router-dom";
import "./Entries.css"

//before the return below is where our true code will be inserted
// useEffect is where we use & set stored state 
// the useStates will show in our components tab in our browser -- #1 is the first usestate and #2 is the second (an array of all my task objects)
export const CreateEntry = ({ currentUser }) => {
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    //we're not passing anything into the getAllTasks function
    //go get it, then set allTasks - the below is where we're holding all tasks now
    getAllTasks().then((taskData) => setAllTasks(taskData))
  }, [])

  const handleTaskSelection = (taskId) => {
    const isSelected = selectedTasks.includes(taskId);
    if (isSelected) {
      setSelectedTasks(selectedTasks.filter((id) => id !== taskId));
    } else {
      setSelectedTasks([...selectedTasks, taskId]);
    }
  };

  //  const handleSubmit = (userId, date) => {
  //    // Handle form submission with selected tasks
  //    console.log("Selected tasks:", selectedTasks);
  //    createDailyEntry(userId, date, selectedTasks);
  //    setSelectedTasks([])
  //  };

  const handleSubmit = async () => {
    const userId = currentUser.id;
    const date = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    try {
      await createDailyEntry(userId, date, selectedTasks);
      setSelectedTasks([]);
      navigate("/entries");
  } catch (error) {
      console.error("Error creating daily entry:", error);
  }
};

  //inside of the div will be our checkbox section
  //label needs to go inside of the input (the label of the checkbox)
  return (
    <div className="header-section">
      <h1>Create Entry</h1>
      <h2>Todays Tasks:</h2>
      <div className="task-section">
        <form>
          <div className="tasks">
          {allTasks.map(task => (
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
          </div>
        </form>
      </div>
      <div className="submit-btn">
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div >
  );
};

//need to be watching selections being added to the 1st state in "CreateEntry" in coponents
////"here's what that form data looks like: (tasks)"
// need to be able to look for a change or a click and when that thing is chagned i want to 
//update the state

//form needs to be in state; need an initial piece of state (i.e. formData, setFormData)
//handler--when i'm clicking on stuff, how am i going to set that data 