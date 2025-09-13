import { useState } from "react";
import styles from "./HamburgerMenu.module.css";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
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
          <li><a href="/">Início</a></li>
          <li><a href="#about">Login</a></li>
          <li><a href="#contact">Contato</a></li>
        </ul>
      </nav>
    </div>
  );
}

export default HamburgerMenu
