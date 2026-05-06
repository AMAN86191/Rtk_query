import React from "react";
import Read from "./components/read";
import { useGetStudentsQuery } from "./redux/feature/studentSlice";
import { createBrowserRouter, Outlet } from "react-router-dom";
import { Header } from "./components/Header";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Create from "./components/Create";
import Edit from "./components/Edit";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Read />,
      },{
        path: "/Create",
        element: <Create />
      },
      {
        path: "/Edit/:id",
        element: <Edit />
      }
    ],
  },
]);
function App() {
  return (
    <>
      <Provider store={store}>
        <Header />
        <Outlet />
      </Provider>
    </>
  );
}

export default App;
