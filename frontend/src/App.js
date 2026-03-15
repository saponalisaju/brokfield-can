import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Home from "./components/app";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ApplicationManagement from "./pages/applications/ApplicationManagement";
import AddUserApplication from "./pages/applications/AddUserApplication";
import EditApplication from "./pages/applications/EditApplication";
import UserView from "./pages/applications/UserView";
import PrivateRoute from "./pages/PrivateRoute";
import ViewOne from "./pages/applications/ViewOne";
import Terms from "./layouts/Terms";
import About from "./layouts/About";
import Success from "./pages/applications/Success";
import SignUp from "./pages/SignUp";
import User from "./pages/User";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/application"
            element={
              <PrivateRoute>
                <ApplicationManagement />
              </PrivateRoute>
            }
          />
          <Route path="/addUserApplication" element={<AddUserApplication />} />
          <Route path="/success" element={<Success />} />
          <Route
            path="/editApplication"
            element={
              <PrivateRoute>
                <EditApplication />
              </PrivateRoute>
            }
          />
          <Route
            path="/userView"
            element={
              <PrivateRoute>
                <UserView />
              </PrivateRoute>
            }
          />
          <Route
            path="/updateApplicationView/:id"
            element={
              <PrivateRoute>
                <UserView />
              </PrivateRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route path="/terms" element={<Terms />} />
          <Route path="/about" element={<About />} />
          <Route path="/view-one" element={<ViewOne />} />
          <Route path="/" element={<Home />} />
          <Route path="/get_users" element={<User />} />
          <Route path="/update_user" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign_up" element={<SignUp />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
