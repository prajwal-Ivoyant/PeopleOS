import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import router from "./router"

import './App.css'


//import EmployeeList from './fetaures/employees/components/employeesList'
import EmployeeLayout from './fetaures/employees/pages/employeeLayout'


function App() {

  return (
    <>
      {/* <EmployeeLayout></EmployeeLayout> */}
      <RouterProvider router={router}></RouterProvider>

    </>
  )
}

export default App
