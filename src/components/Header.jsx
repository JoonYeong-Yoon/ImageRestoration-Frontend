import React from "react";
import { motion } from "framer-motion";

export default function Header({ isLoggedIn, onLogin, onLogout }) {
  return (
    <header className="top-header">
      <motion.div
        className="logo"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        Re:Memory
      </motion.div>

      {/* <div className="menu-group">
        {!isLoggedIn && (
          <motion.button
            className="menu-btn"
            onClick={onLogin}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.button>
        )}

        {isLoggedIn && (
          <motion.button
            className="menu-btn"
            onClick={onLogout}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Logout
          </motion.button>
        )}
      </div> */}
    </header>
  );
}
