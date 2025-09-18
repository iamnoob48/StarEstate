import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar"
import { useEffect, useState } from "react"
import { useLocation, Link, useNavigate, data } from "react-router-dom" 
import { UserCircleIcon } from '@heroicons/react/24/solid'


function NavBar() {
  const navigate = useNavigate();
  const navItems = [
    { name: "Home", link: "/" },
    { name: "Feed", link: "/feed" },
    { name: "Buyers", link: "/buyers" },
    { name: "Tenants", link: "/tenants" },
    { name: "Owners", link: "/owners" },
  ]

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const token = localStorage.getItem('token');
  const [username, setUsername] = useState("");
  const handleClick = () => {
    localStorage.removeItem('token')
    window.location.reload();
  }

  const fetchUsername = async () => {
    const response = await fetch('/api/userdata',{
      headers : {'Authorization' : token}
    })
    const data = await response.json();
    setUsername(data.username);
  }

  useEffect(()=>{
    if(token){
      fetchUsername();

    }
    

  },[username])

  return (
    <div className="w-full p-3">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo/>
          

          {/* Custom NavItems with active highlight */}
          <NavItems items={navItems}/>

          {token ? (
            <div className="flex items-center gap-3">
            <button
             onClick={handleClick}
              className="relative z-50 flex items-center gap-2 px-3 py-1 rounded-full bg-white hover:bg-gray-700 transition"
            >
              <UserCircleIcon className="h-8 w-8 text-amber-400 hover:cursor-pointer" />
              <span className="text-sm font-medium text-black">
                {username}
              </span>
            </button>
          </div>
          ) : (
            <div className="flex items-center gap-4">
            <NavbarButton
              className="bg-amber-300"
              variant="primary"
              onClick={()=>navigate('/login')}
            >
              Login
            </NavbarButton>
            <NavbarButton
              className="bg-white text-black border hover:shadow-lg hover:shadow-amber-200"
              variant="primary"
              onClick={()=>navigate('/register')}
            >
              Register
            </NavbarButton>
          </div>
          )}
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo>
              <span className="text-lg font-bold text-primary">StarEstate</span>
            </NavbarLogo>
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => {
              const isActive = location.pathname === item.link
              return (
                <Link
                  key={`mobile-link-${idx}`}
                  to={item.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-2 ${
                    isActive
                      ? "text-amber-600 font-semibold"
                      : "text-neutral-600 dark:text-neutral-300"
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}

            <div className="flex w-full flex-col gap-4 mt-4">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Login
              </NavbarButton>
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Register
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  )
}

export default NavBar
