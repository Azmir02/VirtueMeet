import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import HomePage from "./pages/Home";
import RoomPage from "./pages/Room";
import RegistrationPage from "./pages/registration";
import LoginPage from "./pages/login";
import LoggedInUserRoute from "./PrivateRoute/LoggedInUserRoute";
import NotLoggedInUserRoute from "./PrivateRoute/NotLoggedInUserRoute";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<LoggedInUserRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/room/:roomId" element={<RoomPage />} />
        </Route>
        <Route element={<NotLoggedInUserRoute />}>
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
