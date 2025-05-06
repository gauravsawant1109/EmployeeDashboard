import { Link } from 'react-router-dom';
import { Menu, Search, Bell } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-primary text-white p-3 shadow-sm d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center">
        <button className="d-lg-none btn btn-link p-2">
          <Menu size={24} />
        </button>
        <Link to="/" className="h2 text-white font-weight-bold">EmployeeData</Link>
      </div>

      <div className="d-flex align-items-center">
        {/* <div className="d-none d-lg-flex align-items-center bg-white p-2 rounded-lg mr-3">
          <Search size={20} className="text-secondary" />
          <input
            type="text"
            placeholder="Search employees..."
            className="bg-transparent border-0 p-1 text-secondary ml-2"
          />
        </div> */}

        {/* <button className="btn btn-link position-relative p-2">
          <Bell size={24} />
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            3
          </span>
        </button> */}

        {/* <div className="d   -flex align-items-center ml-3">
          <img
            src="https://randomuser.me/api/portraits/men/44.jpg"
            alt="User Avatar"
            className="rounded-circle"
            style={{ width: '32px', height: '32px' }}
          />
          <span className="d-none d-lg-inline ml-2">John Doe</span>
        </div> */}
      </div>
    </header>
  );
}
