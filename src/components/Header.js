import { NavLink } from "react-router-dom";
import { MdOutlineLibraryAdd, MdSettings, MdHome } from "react-icons/md";

function Header({ token }) {
  return (
    <div className="py-4 shadow-sm bg-white box-border">
      <header className="container mx-auto">
        <nav className="flex justify-between items-center">
          <NavLink exact to="/">
            <h3 className="text-indigo-400 font-bold text-3xl cursor-pointer">
              Conduit
            </h3>
          </NavLink>

          {!token && (
            <ul className="flex justify-between items-center">
              <NavLink exact to="/" activeClassName="text-indigo-400">
                <li className="mx-6 p-2 cursor-pointer border-b-2 border-transparent hover:border-indigo-400 flex items-center space-x-2">
                  <MdHome className="text-2xl" />
                  <span>Home</span>
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
          )}

          {token && (
            <ul className="flex justify-between items-center">
              <NavLink exact to="/" activeClassName="text-indigo-400">
                <li className="mx-6 p-2 cursor-pointer border-b-2 border-transparent hover:border-indigo-400 flex items-center space-x-2">
                  <MdHome className="text-2xl" />
                  <span>Home</span>
                </li>
              </NavLink>

              <NavLink exact to="*" activeClassName="text-indigo-400">
                <li className="mx-6 p-2 cursor-pointer border-b-2 border-transparent hover:border-indigo-400 flex items-center space-x-2">
                  <MdOutlineLibraryAdd className="text-2xl" />
                  <span>New Post</span>
                </li>
              </NavLink>

              <NavLink exact to="*" activeClassName="text-indigo-400">
                <li className="mx-6 p-2 cursor-pointer border-b-2 border-transparent hover:border-indigo-400 flex items-center space-x-2">
                  <MdSettings className="text-2xl" />
                  <span>Settings</span>
                </li>
              </NavLink>

              <NavLink exact to="*" activeClassName="text-indigo-400">
                <li className="mx-6 p-2 cursor-pointer border-b-2 border-transparent hover:border-indigo-400">
                  user
                </li>
              </NavLink>
            </ul>
          )}
        </nav>
      </header>
    </div>
  );
}
export default Header;
