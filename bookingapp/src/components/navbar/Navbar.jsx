import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./Navbar.module.css";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user ,dispatch} = useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleLogout = ()=>{
    dispatch({type:"LOGOUT"})
    navigate("/login")
  }
  return (
    <div className={style.navbar}>
      <div className={style.navContainer}>
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className={style.logo}>Sharmabooking</span>
        </Link>
        {user ? (
          <div>
            <span style={{textTransform:'capitalize'}}>{user.username}</span>
            <button className={style.navbtn} onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div className={style.navItems}>
            <button className={style.navbtn} onClick={()=>{navigate("/register")}} >Register</button>
            <button className={style.navbtn} onClick={()=>{navigate("/login")}}>Login</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
