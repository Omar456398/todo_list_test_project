// TodoListApp.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/reducers.ts";
import { TaskType } from "../types.ts";

function TodoInputForm() {
  const dispatch = useDispatch();
  const [description, setDescription] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isDescriptionInvalid = description.trim() === ''
  const addInput = async (e: any) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const dataToPost: TaskType = {
        description: description.trim(),
        isDone: false,
      };
      const response = await fetch("http://localhost:3001/lists", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dataToPost),
      });
      const data = await response.json();
      dispatch(addTask(data));
      setIsSubmitting(false);
      setDescription('');
    } catch (error) {
      setIsError(true);
      setIsSubmitting(false);
      setTimeout(() => {
        setIsError(false);
      }, 300);
    }
  };
  return (
    <form>
      <div className="input_form_div">
        <input
          type="text"
          className="input_form_input"
          placeholder="input a new todo item"
          value={description}
          onChange={({ target: { value } }) => setDescription(value)}
        />
        <input type="submit" onClick={addInput} value={isSubmitting ? '      ...      ' : isError ? '       X      ' : 'Add Todo'} disabled={isError || isSubmitting || isDescriptionInvalid} className={'add_task_btn' + (isError || isSubmitting || isDescriptionInvalid ? ' disabled' : '') + (isError ? ' error_adding' : '')} />
      </div>
    </form>
  );
}

export default TodoInputForm;
