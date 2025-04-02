// import { useNavigate } from "react-router";
// import "./navbar.css";
// import React, { useEffect, useState } from "react";
// import { vsayPng } from "~/images";

// function Navbar() {
//   const [token, setToken] = useState("");
//   const [userName, setUserName] = useState("");
//   const navigate = useNavigate();

//   // Initialize state after component mounts (client-side only)
//   useEffect(() => {
//     const storedToken = localStorage.getItem("token") || "";
//     const storedUserName = localStorage.getItem("userName") || "";
//     setToken(storedToken);
//     setUserName(storedUserName);

//     // Redirect if no token
//     if (!storedToken) {
//       navigate("/");
//     }
//   }, [navigate]);

//   const handleSubmit = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("userName");
//     setToken("");
//     setUserName("");
//     navigate("/");
//   };

//   return (
//     <v>
//       <div className="left">
//         <div className="logo">
//           <img src={vsayPng} alt="VSAY LOGO" />
//           <h3>VSAY</h3>
//         </div>
//         <div className="options">
//           <div className="setting">Setting</div>
//           <div className="file">File</div>
//           <div className="edit">Edit</div>
//         </div>
//       </div>
//       <div className="right">
//         <div className="join">{userName}</div>
//         <div className="sign" onClick={handleSubmit}>
//           Sign out
//         </div>
//       </div>
//     </v>
//   );
// }

// export default Navbar;



import { Settings } from "lucide-react"
import { Link } from "react-router"

import { Button } from "~/components/ui/button"
import  UserDropdown  from "./user-dropdown"
import { vsayPng } from "~/images";
 function Navbar() {
  return (
    <div className=" sticky bg-blue-500 top-0 z-50 w-full shadow-sm border-b  backdrop-blur ">
      <div className=" container mx-auto flex py-2 items-center justify-between">
        <div className="flex logo items-center gap-2">
          <div className=" w-10 h-10 relative">
          <img className=" w-full h-full object-contain" src={vsayPng} alt="VSAY LOGO" />
          </div>
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-white text-xl md:text-xl"> VSAY</span>
          </Link>
          <nav className="hidden md:flex text-white items-center space-x-6 text-sm font-medium ml-6">
          <Link to="/products" className="transition-colors hover:text-foreground/80">
              Settings
            </Link>
            <Link to="/dashboard" className="transition-colors hover:text-foreground/80">
              File
            </Link>
            {/* <Link to="/products" className="transition-colors hover:text-foreground/80">
              Products
            </Link>
            <Link to="/analytics" className="transition-colors hover:text-foreground/80">
              Analytics
            </Link>
            <Link to="/team" className="transition-colors hover:text-foreground/80">
              Team
            </Link> */}
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          {/* <Button variant="ghost" size="icon" asChild>
            <Link to="/settings">
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Link>
          </Button> */}
          <UserDropdown />
        </div>
      </div>
    </div>
  )
}

export default Navbar;