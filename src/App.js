import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import SignUp from "./pages/SignUp.jsx";
import Header from "./components/Header.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import LogIn from "./pages/LogIn.jsx";
import About from "./pages/About.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import CreateListing from "./pages/CreateListing.jsx";
import UpdateListing from "./pages/UpdateListing.jsx";
import Search from "./pages/Search.jsx";
import Footer from "./components/Footer.jsx";
import Listing from "./pages/Listing.jsx";
import ContactUs from "./pages/ContactUs.jsx";

function App() {
  return(
    <>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route element={<PrivateRoute/>}>
           <Route path="/profile" element={<Profile/>} />
           <Route path="/create-listing" element={<CreateListing/>} />
           <Route
            path='/update-listing/:listingId'
            element={<UpdateListing />}
             />
            <Route path="/dashboard" element={<Dashboard/>} />
          </Route>
          <Route path="/about" element={<About/>} />
          <Route path="/contact-us" element={<ContactUs/>} />
          <Route path="/listing/:listingId" element={<Listing />} />
          <Route path="/forgot-password" element={<ForgotPassword/>} />
          <Route path="/log-in" element={<LogIn/>} />
          <Route path="/search" element={<Search/>} />
          <Route path="/sign-up" element={<SignUp/>} />
          

        </Routes>
      </Router>
      <Footer />
    </>
  ); 
}

export default App;
