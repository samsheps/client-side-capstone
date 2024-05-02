import { useState, useEffect } from "react";
import { getAllTasks } from "../../services/taskService";


//before the return below is where our true code will be inserted
// useEffect is where we use & set stored state 
// the useStates will show in our components tab in our browser -- #1 is the first usestate and #2 is the second (an array of all my task objects)
export const CreateEntry = () => {
  //const [selectedTasks, setSelectedTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([])

  useEffect(() => {
    //we're not passing anything into the getAllTasks function
    //go get it, then set allTasks - the below is where we're holding all tasks now
    getAllTasks().then((taskData) => setAllTasks(taskData))
  }, [])

  // const handleTaskSelection = (taskId) => {
  //   const isSelected = selectedTasks.includes(taskId);
  //   if (isSelected) {
  //     setSelectedTasks(selectedTasks.filter((id) => id !== taskId));
  //   } else {
  //     setSelectedTasks([...selectedTasks, taskId]);
  //   }
  // };

   const handleSubmit = () => {
  //   // Handle form submission with selected tasks
     console.log("Selected tasks:", selectedTasks);
   };

  //inside of the div will be our checkbox section
  //label needs to go inside of the input (the label of the checkbox)
  return (
    <div>
      <h1>Create Entry</h1>
      <h2>Todays Tasks:</h2>
      <div className="task-section">
        <form>
          {allTasks.map(task => (
            <div key={task.id}>
              <input type="checkbox" value={task.description} id={task.id} />
              <label>{task.description}</label>
            </div>
          ))}
        </form>
      </div>
       <button onClick={handleSubmit}>Submit</button>

    </div >
  );
};

//need to be watching selections being added to the 1st state in "CreateEntry" in coponents
////"here's what that form data looks like: (tasks)"
// need to be able to look for a change or a click and when that thing is chagned i want to 
//update the state

//form needs to be in state; need an initial piece of state (i.e. formData, setFormData)
//handler--when i'm clicking on stuff, how am i going to set that data 