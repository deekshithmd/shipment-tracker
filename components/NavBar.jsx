import React, { useEffect, useState } from "react";
import { Nav1, Nav2, Nav3 } from ".";
import { useTrackingContext } from "@/context/Tracking";

const NavBar = () => {
  const [state, setState] = useState(false);
  const { currentUser, connectWallet } = useTrackingContext();
  const navigation = [
    { title: "Home", path: "#" },
    { title: "Services", path: "#" },
    {
      title: "Contact Us",
      path: "#",
    },
    {
      title: "ERC-20",
      path: "#",
    },
  ];
  useEffect(() => {
    document.onclick = (e) => {
      const target = e.target;
      if (!target.closest(".menu-btn")) setState(false);
    };
  }, []);
};

return(
  <nav>
    navbar
  </nav>
)

export default NavBar;
