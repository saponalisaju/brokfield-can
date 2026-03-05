import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Home from "./components/app";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/profile/Profile";
import Login from "./pages/Login";
import UserManagement from "./pages/userManagement/UserManagement";
import AddUserManagement from "./pages/userManagement/AddUserManagement";
import EditUserManagement from "./pages/userManagement/EditUserManagement";
import ApplicationManagement from "./pages/applications/ApplicationManagement";
import AddUserApplication from "./pages/applications/AddUserApplication";
import EditApplication from "./pages/applications/EditApplication";
import UserView from "./pages/applications/UserView";
import SliderManagement from "./pages/sliders/SliderManagement";
import EditSlider from "./pages/sliders/EditSlider";
import PrivateRoute from "./pages/PrivateRoute";
import AddSlider from "./pages/sliders/AddSlider";
import VisaEnquiry from "./pages/VisaEnquiry";
import ViewOne from "./pages/applications/ViewOne";
import Terms from "./layouts/Terms";
import About from "./layouts/About";
import Success from "./pages/applications/Success";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/userManagement"
            element={
              <PrivateRoute>
                <UserManagement />
              </PrivateRoute>
            }
          />
          <Route
            path="/addUserManagement"
            element={
              <PrivateRoute>
                <AddUserManagement />
              </PrivateRoute>
            }
          />
          <Route
            path="/editUserManagement"
            element={
              <PrivateRoute>
                <EditUserManagement />
              </PrivateRoute>
            }
          />
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
            path="/slider"
            element={
              <PrivateRoute>
                <SliderManagement />
              </PrivateRoute>
            }
          />
          <Route
            path="/addSliders"
            element={
              <PrivateRoute>
                <AddSlider />
              </PrivateRoute>
            }
          />
          <Route
            path="/editSlider"
            element={
              <PrivateRoute>
                <EditSlider />
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
          <Route path="/enquiry" element={<VisaEnquiry />} />
          <Route path="/view-one" element={<ViewOne />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
