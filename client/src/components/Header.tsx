import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { SignoutButton } from "./SignoutButton";

export const Header = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <div className="flex flex-col bg-blue-800 py-6">
      <div className="px-4 md:px-[10rem] flex justify-between">
        <span className="text-xl md:text-3xl text-white font-bold tracking-tight">
          <Link to="/">BookmyHotel</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link
                className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
                to="/bookings"
              >
                My Bookings
              </Link>
              <Link
                className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
                to="/hotels"
              >
                My hotels
              </Link>
              <SignoutButton />
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
