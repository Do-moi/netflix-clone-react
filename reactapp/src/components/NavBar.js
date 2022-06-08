import React, { useEffect, useState } from "react";
import "./NavBar.css";
import imgNetflix from "../images/netflix-logo.png";
import imgAvatar from "../images/Netflix-avatar.png";
function NavBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setShow(true);
      } else {
        setShow(false);
      }
      return () => {
        window.removeEventListener("scroll");
      };
    });
  }, []);

  return (
    <div className={`navbar ${show && "navbar_black"} `}>
      {/*netflix logo*/}
      <img src={imgNetflix} alt="netflix" className="logo" />
      <img src={imgAvatar} alt="avatar" className="avatar" />
    </div>
  );
}

export default NavBar;
