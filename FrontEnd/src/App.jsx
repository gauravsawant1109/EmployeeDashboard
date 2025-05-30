import {
  BrowserRouter as Router,
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import Dashboard from "./Pages/Dashboard";
import EmployeeList from "./Pages/EmployeeList";
import EmployeeDetails from "./Pages/EmployeeDetails";
import AddEmployee from "./Pages/AddEmployee";
import SalaryDetails from "./Pages/SalaryDetails";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AppLayout from "./Components/AppLayout";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {path: "/", element: <Dashboard />},
        { path: "/employees", element: <EmployeeList /> },
        { path: "/EmployeeDetails/:id", element: <EmployeeDetails /> },
        {path:"/add-employee",element:<AddEmployee/>}
      ],
    },
  ]);

  return <RouterProvider router={router}/>

  // return (
  //   <Router>
  //     <div className="d-flex flex-column min-vh-100">
  //       <Header />
  //       <div className="d-flex flex-grow-1">
  //         <Sidebar />
  //         <main className="flex-grow-1 p-4" >
  //           <Routes>
  //             <Route path="/" element={<Dashboard />} />
  //             <Route path="/employees" element={<EmployeeList />} />
  //             <Route path="/employees/:id" element={<EmployeeDetails />} />
  //             <Route path="/add-employee" element={<AddEmployee />} />
  //             <Route path="/salaries" element={<SalaryDetails />} />
  //           </Routes>
  //         </main>
  //       </div>
  //     </div>
  //   </Router>
  // );
}

export default App;
