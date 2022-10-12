import { NavLink } from "react-router-dom";

function Header() {
  return (
    <div className="py-4 shadow-sm bg-white">
      <header className="container mx-auto">
        <nav className="flex justify-between items-center">
          <NavLink exact to="/">
            <h3 className="text-indigo-400 font-bold text-3xl cursor-pointer">
              Conduit
            </h3>
          </NavLink>
          <ul className="flex justify-between items-center">
            <NavLink exact to="/" activeClassName="text-indigo-400">
              <li className="mx-6 p-2 cursor-pointer hover:text-indigo-400">
                Home
              </li>
            </NavLink>
            <NavLink to="/singin" activeClassName="text-indigo-400">
              <li className="mx-6 p-2 cursor-pointer hover:text-indigo-400">
                Sign in
              </li>
            </NavLink>
            <NavLink to="/signup" activeClassName="text-indigo-400">
              <li className="mx-6 p-2 cursor-pointer hover:text-indigo-400">
                Sign up
              </li>
            </NavLink>
          </ul>
        </nav>
      </header>
    </div>
  );
}
export default Header;
