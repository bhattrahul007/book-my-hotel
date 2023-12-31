import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export const Header = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">BookmyHotel</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link to="/bookings">My Bookings</Link>
              <Link to="/hotels">My hotels</Link>
              <button>Sign out</button>
            </>
          ) : (
            <Link
              to="/auth/signin"
              className="flex items-center bg-white text-blue-600 px-3 font-bold hover:bg-gray-100"
            >
              Signin
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};
