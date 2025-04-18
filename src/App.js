import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Public Pages
import Home from "./Pages/Home";
import Signin1 from "./Pages/signin1";
import Signin2 from "./Pages/signin2";
import Signin3 from "./Pages/signin3";
import Signin4 from "./Pages/signin4";
import Signin5 from "./Pages/signin5";
import Signin6 from "./Pages/signin6";
import Recover from "./Pages/Recover";
import Signup from "./Pages/signup";
import Payment from "./Pages/payment";
import Stepverification from "./Pages/2step";
import Profile from "./Pages/Profile";

import Userpanel from "./Pages/Userpanel";

import AgentPanel from "./Pages/AgentPanel";
import AgentPanelExposes from "./Pages/AgentPanelExposes";
import AgentHistory from "./Pages/AgentHistoryandRating";

import AgentBuyer from "./Pages/AgentBuyer";
import AgentAuthantication from "./Pages/AgentAuthantication";

// Client Pages
import ClientPanel from "./Pages/ClientPanel";
import ClienttoBuyer from "./Pages/ClienttoBuyer";
import ClientExposes from "./Pages/ClientExposes";
import ClientAuth from "./Pages/ClientAuth";

// Utility Components
import ProtectedRoute from "./Pages/ProtectedRoute";
import Unauthorized from "./Pages/Unauthorized";
import TestLogin from "./Pages/TestLogin";
import Alert from "./Pages/Alert";
import FavouritePage from "./Pages/Favourite";
import Practice from "./Pages/TestPage";
import UserHome from "./Pages/UserHome";
import PropertiesList from "./Pages/PropertiesList";
import AgentAllUser from "./Pages/AgentAllUser";
//AdminPanel
import Users from "./Pages/AdminPanel/Users.jsx"
import ContactUs from "./Pages/AdminPanel/ContactUs.jsx";
import Properties from "./Pages/AdminPanel/Properties.jsx";
import Roles from "./Pages/AdminPanel/Roles.jsx";
import PropertyToPDF from "./Pages/ExposesExternal/index.jsx";
import UserExposes from './Pages/UserExposes';
import ProductDetail from "./Pages/ProductDetail/index.jsx";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
    return (
        <BrowserRouter>
          <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/Sign" element={<Signin1 />} />
                <Route path="/Signininfo" element={<Signin2 />} />
                <Route path="/Signindiscover" element={<Signin3 />} />
                <Route path="/Signinposition" element={<Signin4 />} />
                <Route path="/Signinuse" element={<Signin5 />} />
                <Route path="/Signin6" element={<Signin6 />} />
                <Route path="/Recover" element={<Recover />} />
                <Route path="/Signup" element={<Signup />} />
                <Route path="/Payment" element={<Payment />} />
                <Route path="/Stepverification" element={<Stepverification />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route path="/test-login" element={<TestLogin />} />
                <Route path="/Practice" element={<Practice />} />
                {/* <Route path="/Exposes-External" element={<PropertyToPDF />} /> */}
                <Route path="/Product-Detail/:id" element={<ProductDetail />} />

                {/* User Panel Routes */}
                <Route path="/UserPanel">
                    <Route
                        index
                        element={
                            <ProtectedRoute allowedRoles={["buyer"]}>
                                <Userpanel />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="Profile"
                        element={
                            <ProtectedRoute allowedRoles={["buyer"]}>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="Alert"
                        element={
                            <ProtectedRoute allowedRoles={["buyer"]}>
                                <Alert />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="Exposes"
                        element={
                            <ProtectedRoute allowedRoles={["buyer"]}>
                                <UserExposes />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="PropertiesList"
                        element={
                            <ProtectedRoute allowedRoles={["buyer"]}>
                                <PropertiesList />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="FavouritePage"
                        element={
                            <ProtectedRoute allowedRoles={["buyer"]}>
                                <FavouritePage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="Home"
                        element={
                            <ProtectedRoute allowedRoles={["buyer"]}>
                                <UserHome />
                            </ProtectedRoute>
                        }
                    />
                      <Route
                        path="Exposes-External"
                        element={
                            <ProtectedRoute allowedRoles={["buyer"]}>
                                <PropertyToPDF />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="Exposes" element={<UserExposes />} />

                </Route>

                {/* Agent Panel Routes */}
                <Route path="/AgentPanel">
                    <Route
                        index
                        element={
                            <ProtectedRoute allowedRoles={["agent"]}>
                                <AgentPanel />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="AllUser"
                        element={<AgentAllUser />}
                    />
                    <Route
                        path="PropertiesList"
                        element={
                            <ProtectedRoute allowedRoles={["agent"]}>
                                <PropertiesList />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="Exposes"
                        element={
                            <ProtectedRoute allowedRoles={["agent"]}>
                                <AgentPanelExposes />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="History"
                        element={
                            <ProtectedRoute allowedRoles={["agent"]}>
                                <AgentHistory />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="Transactions"
                        element={
                            <ProtectedRoute allowedRoles={["agent"]}>
                                <AgentBuyer />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="Auth"
                        element={
                            <ProtectedRoute allowedRoles={["agent"]}>
                                <AgentAuthantication />
                            </ProtectedRoute>
                        }
                    />
                </Route>

                {/* Client Panel Routes */}
                <Route path="/ClientPanel">
                    <Route
                        index
                        element={
                            <ProtectedRoute allowedRoles={["client"]}>
                                <ClientPanel />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="Transactions"
                        element={
                            <ProtectedRoute allowedRoles={["client"]}>
                                <ClienttoBuyer />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="Exposes"
                        element={
                            <ProtectedRoute allowedRoles={["client"]}>
                                <ClientExposes />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="PropertiesList"
                        element={
                            <ProtectedRoute allowedRoles={["client"]}>
                                <PropertiesList />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="Auth"
                        element={<ClientAuth />}
                    />
                </Route>
                <Route path="/users" element={<Users />} />
                <Route path="/roles" element={<Roles />} />
                <Route path="/properties" element={<Properties />} />
                <Route path="/contact-us" element={<ContactUs />} />

            </Routes>
        </BrowserRouter>
    );
};

export default App;
