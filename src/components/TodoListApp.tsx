import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTasks, setLoading, setError } from "../redux/reducers.ts"; // adjust the path
import { TasksSliceType } from "../types";
import Loader from "./Loader.tsx";
import ErrorMsg from "./ErrorMsg.tsx";

function TodoListApp() {
  const dispatch = useDispatch();
  const [toggleLoad, setToggleLoad] = useState(false)
  const { tasks, isLoading, isError } = useSelector(
    (state: { tasks: TasksSliceType }) => state.tasks
  );

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true));
      dispatch(setError(false));
      try {
        const response = await fetch("http://localhost:3001/lists");
        const data = await response.json();
        dispatch(setTasks(data));
      } catch (error) {
        dispatch(setError(true));
      }
    };

    fetchData();
  }, [dispatch, toggleLoad]);
  return <div>{isError ? <ErrorMsg onClick={() => setToggleLoad((prev_val)=>!prev_val)} /> : isLoading ? <Loader /> : <>

    </>}</div>;
}

export default TodoListApp;
