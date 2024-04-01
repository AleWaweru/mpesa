import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';

const Navbar = () => {
  const { authState, setAuthState } = useContext(AuthContext);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
  };

  return (
    <div className="p-4 mb-4 flex justify-between items-center bg-blue-300">
      {!authState.status ? (
        <div className="flex justify-end px-4">
          <Link
            className="text-white py-2 px-5 mr-4 rounded bg-purple-500"
            to="/login"
          >
            Login
          </Link>
          <Link
            className="text-white py-2 px-4 rounded bg-purple-500"
            to="/register"
          >
            Registration
          </Link>
        </div>
      ) : (
        <div className="px-5">
          <Link
            className="text-white py-2 px-4 mr-4 rounded bg-slate-600"
            to="/"
          >
            Go to Home Page
          </Link>
          <Link
            className="text-white py-2 px-4 rounded bg-purple-500"
            to="/productForm"
          >
            Create a Post
          </Link>
        </div>
      )}
      <div>
        {authState.status && <span> Hi, {authState.username}</span>}
        {authState.status && (
          <button
            onClick={logout}
            className="text-white py-2 px-4 ml-3 rounded bg-red-400 hover:bg-red-700"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
