import { NavLink } from "react-router-dom";

function Header() {
  return (
    <div className="py-4 mb-4 shadow-sm">
      <header className="container mx-auto">
        <nav className="flex justify-between items-center">
          <NavLink exact to="/">
            <h3 className="text-green-400 font-bold text-3xl cursor-pointer">
              Conduit
            </h3>
          </NavLink>
          <ul className="flex justify-between items-center">
            <NavLink exact to="/" activeClassName="text-green-400">
              <li className="mx-6 p-2 cursor-pointer hover:text-green-400">
                Home
              </li>
            </NavLink>
            <NavLink to="/singin" activeClassName="text-green-400">
              <li className="mx-6 p-2 cursor-pointer hover:text-green-400">
                Sign in
              </li>
            </NavLink>
            <NavLink to="/signup" activeClassName="text-green-400">
              <li className="mx-6 p-2 cursor-pointer hover:text-green-400">
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
