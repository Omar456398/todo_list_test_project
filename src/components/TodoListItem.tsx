// TodoListApp.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTask, setTask } from "../redux/reducers.ts";
import { TaskType } from "../types.ts";

function TodoListItem({ task }: { task: TaskType }) {
  const dispatch = useDispatch();
  const [description, setDescription] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const isDescriptionInvalid = description.trim() === "";
  const updateInput = async (e: any) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const dataToPost: any = {
        description: description.trim(),
      };
      const response = await fetch("http://localhost:3001/lists/" + task.id, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToPost),
      });
      const data = await response.json();
      dispatch(setTask({ id: task.id, task: data }));
      setIsSubmitting(false);
      setIsEditing(false);
      setDescription(task.description);
    } catch (error) {
      setIsError(true);
      setIsSubmitting(false);
      setTimeout(() => {
        setIsError(false);
        setIsEditing(false);
      }, 300);
    }
  };
  const toggleDone = async () => {
    try {
      const dataToPost: any = {
        isDone: !task.isDone,
      };
      const response = await fetch("http://localhost:3001/lists/" + task.id, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToPost),
      });
      const data = await response.json();
      dispatch(setTask({ id: task.id, task: data }));
    } catch (error) {}
  };
  const deleteTheItem = async () => {
    try {
      await fetch("http://localhost:3001/lists/" + task.id, {
        method: "DELETE",
      });
      dispatch(deleteTask(task.id));
    } catch (error) {}
  };
  return isEditing ? (
    <form>
      <div className="input_form_div">
        <input
          type="text"
          className="input_form_input"
          placeholder="input a new description for the updated todo item"
          value={description}
          onChange={({ target: { value } }) => setDescription(value)}
        />
        <input
          type="submit"
          onClick={updateInput}
          value={
            isSubmitting
              ? "        ...       "
              : isError
              ? "        X        "
              : "Update Todo"
          }
          disabled={isError || isSubmitting || isDescriptionInvalid}
          className={
            "add_task_btn" +
            (isError || isSubmitting || isDescriptionInvalid
              ? " disabled"
              : "") +
            (isError ? " error_adding" : "")
          }
        />
        <div className="retry_btn_border1" style={{ margin: 10 }}>
          <div className="retry_btn_border2">
            <div className="retry_btn_border3">
              <button className="retry_btn" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  ) : (
    <div className={"task_div" + (task.isDone ? " task_div_done" : "")}>
      <div
        className={task.isDone ? "task_done_circle" : "task_not_done_circle"}
        onClick={toggleDone}
      >
        {task.isDone ? "√" : ""}
      </div>
      <div className="task_description">{task.description}</div>
      <div
        className="edit_btn"
        onClick={() => {
          setDescription(task.description);
          setIsEditing(true);
        }}
      >
        <i className="fa fa-pencil" />
      </div>
      <div className="delete_btn" onClick={deleteTheItem}>
        <i className="fa fa-trash-o" />
      </div>
    </div>
  );
}

export default TodoListItem;
