import svg_plant from "./plant_pot.svg";
import "./App.css";
import React from "react";
import TodoListApp from "./components/TodoListApp.tsx";
import { Provider } from "react-redux";
import store from "./redux/index.ts";

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <div className="logo_conatiner">
          <div className="logo_bg"></div>
          <img
            className="logo"
            src={svg_plant}
            width={100}
            height={100}
            alt="logo"
          />
          <h2 className="app_title">The Todoist</h2>
        </div>
        <div className="app_container">
          <TodoListApp />
        </div>
      </div>
    </Provider>
  );
}

export default App;
