import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Header.css'

export default function Header() {
  const [open, setOpen] = useState(false);
  
  const menuVariants = {
  open: {
    transition: { staggerChildren: 0.08, delayChildren: 0.15 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};
;
  const itemVariants = {
  open: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.25, ease: "easeOut" }
  },
  closed: {
    opacity: 0,
    x: -15,
    transition: { duration: 0.2, ease: "easeIn" }
  }
};
const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

useEffect(() => {
  function handleResize() {
    setIsDesktop(window.innerWidth > 768);
  }
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);

 
   useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 768 && open) {
        setOpen(false);
      }
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [open]);

  return (
    <>
    <header>
            <div className="Aura">
              <h1>Aura.</h1>
            </div>
            <button id="btn-menu" className={open ? "active" : ""} onClick={() => setOpen(!open)}>
              <span className="bar"></span>
            </button>
        <nav className={open ? "open" : ""}>
            
            <motion.ul
              initial={isDesktop ? false : "closed"}
              animate={isDesktop ? false : open ? "open" : "closed"}
              variants={isDesktop ? {} : menuVariants}
            >
                <motion.li variants={itemVariants}><a href="/Philosophy">Philosophy</a></motion.li>
                <motion.li variants={itemVariants}><a href="/Features">App Features</a></motion.li>
                <motion.li variants={itemVariants}><a href="/Community">Community</a></motion.li>
                <motion.li variants={itemVariants}><a href="/Download">Get Started</a></motion.li>
            </motion.ul>
        </nav>
    </header>
    <div className="header-spacer"></div>
    </>
  )
}
