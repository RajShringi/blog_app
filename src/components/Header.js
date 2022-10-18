import { NavLink } from "react-router-dom";

function Header() {
  return (
    <div className="py-4 shadow-sm bg-white box-border">
      <header className="container mx-auto">
        <nav className="flex justify-between items-center">
          <NavLink exact to="/">
            <h3 className="text-indigo-400 font-bold text-3xl cursor-pointer">
              Conduit
            </h3>
          </NavLink>
          <ul className="flex justify-between items-center">
            <NavLink exact to="/" activeClassName="text-indigo-400">
              <li className="mx-6 p-2 cursor-pointer border-b-2 border-transparent hover:border-indigo-400">
                Home
              </li>
            </NavLink>
            <NavLink to="/login" activeClassName="text-indigo-400">
              <li className="mx-6 p-2 cursor-pointer border-b-2 border-transparent hover:border-indigo-400">
                Sign in
              </li>
            </NavLink>
            <NavLink to="/signup" activeClassName="text-indigo-400">
              <li className="mx-6 p-2 cursor-pointer border-b-2 border-transparent hover:border-indigo-400">
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
