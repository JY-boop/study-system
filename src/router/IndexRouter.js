import { createBrowserRouter } from "react-router-dom";
import Login from "../views/Login/Login";
import SystemLayout from "../components/SystemLayout/SystemLayout";
import NotFound from "../views/NotFound/NotFound";
import Teacher from "../views/Teacher/Teacher";
import Student from "../views/Teacher/Student/Student";
import SchoolClass from "../views/Teacher/SchoolClass/SchoolClass";
import Test from "../views/Teacher/Test/Test";
import Question from "../views/Question/Question";
import List from "../views/Question/List/List";
import Select from "../views/Question/Select/Select";
import Input from "../views/Question/Input/Input";
import Subjective from "../views/Question/Subjective/Subjective";
import Knowledge from "../views/Question/Knowledge/Knowledge";
import Paper from "../views/Paper/Paper";
import View from "../views/Paper/View/View";
import Auto from "../views/Paper/Auto/Auto";
import Manual from "../views/Paper/Manual/Manual";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/system",
    element: <SystemLayout />,
    children: [
      {
        path: "teacher",
        element: <Teacher />,
        children: [
          {
            path: "student",
            element: <Student />,
          },
          {
            path: "school-class",
            element: <SchoolClass />,
          },
          {
            path: "test",
            element: <Test />,
          },
        ],
      },
      {
        path: "question",
        element: <Question />,
        children: [
          {
            path: "list",
            element: <List />,
          },
          {
            path: "select",
            element: <Select />,
          },
          {
            path: "input",
            element: <Input />,
          },
          {
            path: "subjective",
            element: <Subjective />,
          },
          {
            path: "knowledge",
            element: <Knowledge />,
          },
        ],
      },
      {
        path: "paper",
        element: <Paper />,
        children: [
          {
            path: "view",
            element: <View />,
          },
          {
            path: "auto",
            element: <Auto />,
          },
          {
            path: "manual",
            element: <Manual />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
