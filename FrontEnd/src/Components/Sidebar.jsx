import { NavLink } from 'react-router-dom';
import { Home, Users, UserPlus, DollarSign, Info } from 'lucide-react';

export default function Sidebar() {
  const navLinkClass =
    'd-flex align-items-center px-4 py-2 rounded-lg text-dark text-decoration-none hover:bg-light hover:text-primary transition';

  return (
    <aside className=" bg-warning shadow fixed top-0 left-0 z-10 p-4">
      {/* <h2 className="h2 text-primary mb-5">EmployeeData</h2> */}
      <nav className="d-flex flex-column">
        <NavLink to="/" className={navLinkClass}>
          <Home size={20} />
          <span className="ml-2">Dashboard</span>
        </NavLink>
        <NavLink to="/employees" className={navLinkClass}>
          <Users size={20} />
          <span className="ml-2">Employees</span>
        </NavLink>
        <NavLink to="/add-employee" className={navLinkClass}>
          <UserPlus size={20} />
          <span className="ml-2">Add Employee</span>
        </NavLink>
        {/* <NavLink to="/salaries" className={navLinkClass}>
          <DollarSign size={20} />
          <span className="ml-2">Salaries</span>
        </NavLink>
        <NavLink to="/employees/1" className={navLinkClass}>
          <Info size={20} />
          <span className="ml-2">Details</span>
        </NavLink> */}
      </nav>
    </aside>
  );
}
