

import { useEffect, useState } from "react"


import { LogOut, User, Settings } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { Link, useNavigate } from "react-router"

 function UserDropdown() {

  const [isOpen, setIsOpen] = useState(false)
  const [token, setToken] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  // Mock user data - in a real app, this would come from your auth context/provider
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    image: "/placeholder.svg?height=32&width=32",
  }

  const handleLogout = async () => {
    localStorage.removeItem("token");
        localStorage.removeItem("userName");
        setToken("");
        setUserName("");
        navigate("/");
  
  }

  useEffect(() => {
        const storedToken = localStorage.getItem("token") || "";
        const storedUserName = localStorage.getItem("userName") || "";
        setToken(storedToken);
        setUserName(storedUserName);
    
        // Redirect if no token
        if (!storedToken) {
          navigate("/");
        }
      }, [navigate]);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button className="relative h-8 w-8 rounded-full outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.image} alt={user.name} />
            <AvatarFallback>
              {userName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{userName}</p>
            {/* <p className="text-xs leading-none text-muted-foreground">{user.email}</p> */}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to="/profile" className="flex w-full cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/settings" className="flex w-full cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserDropdown;