import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PassContext from "./components/utils/PassContext";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import "react-simple-toasts/dist/theme/success.css";
import "react-simple-toasts/dist/theme/failure.css";

import Layout from "./components/layout";
import Login from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import ManagePatients from "./pages/ManagePatients";
import AddPatient from "./pages/ManagePatients/AddPatient";
import EditProfile from "./pages/EditProfile";
import EditPatient from "./pages/ManagePatients/EditPatient";
import AddPrescription from "./pages/ManagePatients/AddPrescription";
import ViewPrescriptions from "./pages/ManagePatients/ViewPrescriptions";

const routes = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            path: "/",
            element: <Dashboard />,
          },
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/edit-profile",
            element: <EditProfile />,
          },
          {
            path: "/patients/view",
            element: <ManagePatients />,
          },
          {
            path: "/patients/add-patient",
            element: <AddPatient />,
          },
          {
            path: "/patients/edit-patient/:id",
            element: <EditPatient />,
          },
          {
            path: "/patients/edit-patient/:id/add-prescription",
            element: <AddPrescription />,
          },
          {
            path: "/patients/edit-patient/:id/view-prescriptions",
            element: <ViewPrescriptions />,
          },
          {
            path: "*",
            element: <h1>Not Found</h1>,
          },
        ],
      },
    ],
  },
]);

function App() {
  const [loggedUser, setLoggedUser] = useState("");
  return (
    <PassContext.Provider value={{ loggedUser, setLoggedUser }}>
      <RouterProvider router={routes} />
    </PassContext.Provider>
  );
}

export default App;
