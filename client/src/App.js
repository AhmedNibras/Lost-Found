import { useEffect } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Register from "./pages/Register";
import AddEditItem from "./pages/AddEditItem";
import Login from "./pages/Login";
import Header from "./components/Header";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/features/authslice";
import SingleItem from "./pages/SingleItem";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./pages/NotFound";

function App() {
  const dispatch = useDispatch();

  // Not Logout After Refresh
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    dispatch(setUser(user));
  }, [  dispatch, user]);

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/addItem"
            element={
              <PrivateRoute>
                <AddEditItem />
              </PrivateRoute>
            }
          />
          <Route
            path="/editItem/:id"
            element={
              <PrivateRoute>
                <AddEditItem />
              </PrivateRoute>
            }
          />
          <Route path="/item/:id" element={<SingleItem />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
