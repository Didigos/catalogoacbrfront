import { useEffect, useState } from "react";
import styles from "./HamburgerMenu.module.css";
import { useNavigate } from "react-router";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    
    const checkAuth = () => {
      const user = localStorage.getItem("user");
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };
    checkAuth();
  }, []);

    const logOut = () => {
      localStorage.removeItem("user");
      setIsLoggedIn(false);
      navigate('/');
    };


  return (
    <div className={styles.container}>
      {/* Botão hambúrguer */}
      <button
        className={`${styles.hamburger} ${isOpen ? styles.open : ""}`}
        onClick={toggleMenu}
        aria-label="Menu"
      >
        <span />
        <span />
        <span />
      </button>

      {/* Menu lateral */}
      <nav className={`${styles.menu} ${isOpen ? styles.show : ""}`}>
        <ul>
          {isLoggedIn ? (
            <>
            <li><a onClick={logOut}>Logout</a></li>
            <li><a href="/admin">Painel Admin</a></li>
            </>

          ) : (
            <li><a href="/login">Login</a></li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default HamburgerMenu
