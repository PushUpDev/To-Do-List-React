import { useEffect, useRef, useState } from "react";

const getLocalItems = () => {
  let list = localStorage.getItem("lists");
  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};

const ToDoApp = () => {
  const [taskInput, setTaskInput] = useState("");
  const [taskList, setTaskList] = useState(getLocalItems());
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    setTaskInput(e.target.value);
  };

  const addOrUpdateTask = (e) => {
    e.preventDefault();
    if (taskInput.trim() === "") return;

    if (isEditing) {
      const updatedTasks = [...taskList];
      updatedTasks[editIndex] = taskInput.trim();
      setTaskList(updatedTasks);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      const updatedTasks = [...taskList, taskInput.trim()];
      setTaskList(updatedTasks);
    }

    setTaskInput("");
  };

  const deleteTask = (indexToDelete) => {
    const filteredTasks = taskList.filter(
      (_, index) => index !== indexToDelete
    );
    setTaskList(filteredTasks);
  };

  const startEditing = (index) => {
    setTaskInput(taskList[index]);
    setIsEditing(true);
    setEditIndex(index);

    setTimeout(() => {
      inputRef.current?.focus(); 
    }, 0);
  };

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(taskList));
  }, [taskList]);

  return (
    <div className="todo-container">
      <div className="header">To-Do Liste</div>
      <form className="add-task-form" onSubmit={addOrUpdateTask}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Neue Aufgabe hinzufügen..."
          value={taskInput}
          onChange={handleInputChange}
        />
        <button type="submit">{isEditing ? "Update" : "Add"}</button>
      </form>

      <div className="task-list">
        {taskList.map((task, index) => (
          <div key={index} className="task-item">
            <p className="task-text">{task}</p>
            <i
              className="fa-solid fa-pen-to-square edit-icon"
              onClick={() => startEditing(index)}
              style={{ marginRight: "10px", cursor: "pointer" }}
            ></i>
            <i
              className="fa-solid fa-trash delete-icon"
              onClick={() => deleteTask(index)}
              style={{ cursor: "pointer" }}
            ></i>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToDoApp;
