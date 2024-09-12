import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import LoginPage from "../pages/login";

export default function LoggedInUserRoute() {
  const user = useSelector((user) => user.login.loggedIn);
  return user ? <Outlet /> : <LoginPage />;
}
