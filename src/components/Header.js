import { NavLink } from "react-router-dom";
import { MdOutlineLibraryAdd, MdSettings, MdHome } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

function Header({ isLoggedIn, user }) {
  return (
    <div className="py-4 shadow-sm bg-white box-border">
      <header className="container mx-auto">
        <nav className="flex justify-between items-center">
          <NavLink exact to="/">
            <h3 className="text-indigo-400 font-bold text-3xl cursor-pointer">
              Conduit
            </h3>
          </NavLink>
          {isLoggedIn ? <AuthHeader /> : <NonAuthHeader />}
        </nav>
      </header>
    </div>
  );
}

function AuthHeader() {
  return (
    <ul className="flex justify-between items-center">
      <NavLink exact to="/" activeClassName="text-indigo-400">
        <li className="mx-6 p-2 cursor-pointer border-b-2 border-transparent hover:border-indigo-400 flex items-center space-x-2">
          <MdHome className="text-2xl" />
          <span>Home</span>
        </li>
      </NavLink>

      <NavLink exact to="/new_post" activeClassName="text-indigo-400">
        <li className="mx-6 p-2 cursor-pointer border-b-2 border-transparent hover:border-indigo-400 flex items-center space-x-2">
          <MdOutlineLibraryAdd className="text-2xl" />
          <span>New Post</span>
        </li>
      </NavLink>

      <NavLink exact to="/settings" activeClassName="text-indigo-400">
        <li className="mx-6 p-2 cursor-pointer border-b-2 border-transparent hover:border-indigo-400 flex items-center space-x-2">
          <MdSettings className="text-2xl" />
          <span>Settings</span>
        </li>
      </NavLink>

      <NavLink exact to="/profile" activeClassName="text-indigo-400">
        <li className="mx-6 p-2 cursor-pointer border-b-2 border-transparent hover:border-indigo-400 flex items-center space-x-2">
          <CgProfile className="text-2xl" />
          <span>Profile</span>
        </li>
      </NavLink>
    </ul>
  );
}

function NonAuthHeader() {
  return (
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
  );
}

export default Header;
