import React from "react";
import router from "./router/IndexRouter";
import { RouterProvider } from "react-router-dom";

const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};
export default App;
