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
  import { useState } from "react"
  
function NavBar() {
    const navItems = [
      { name: "Home", link: "#" },
      { name: "Feed", link: "#feed" },
      { name: "Buyers", link: "#buyers" },
      { name: "Tenants", link: "#tenants" },
      { name: "Owners", link: "#owners" },
    ]
  
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
    return (
      <div className="relative w-full p-4">
        <Navbar>
          <NavBody>
            <NavbarLogo>
      
              <span className="text-xl font-bold text-primary">StarEstate</span>
            </NavbarLogo>
            <NavItems items={navItems} />
            <div className="flex items-center gap-4">
              <NavbarButton className={"bg-amber-300"} variant="primary">Login</NavbarButton>
            </div>
          </NavBody>
  
 
          <MobileNav>
            <MobileNavHeader>
              <NavbarLogo>
                <span className="text-lg font-bold text-primary">HavenHub</span>
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
              {navItems.map((item, idx) => (
                <a
                  key={`mobile-link-${idx}`}
                  href={item.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="relative text-neutral-600 dark:text-neutral-300"
                >
                  <span className="block">{item.name}</span>
                </a>
              ))}
              <div className="flex w-full flex-col gap-4">
                <NavbarButton
                  onClick={() => setIsMobileMenuOpen(false)}
                  variant="primary"
                  className="w-full"
                >
                  Login
                </NavbarButton>
              </div>
            </MobileNavMenu>
          </MobileNav>
        </Navbar>
      </div>
    )
  }
  
export default NavBar;