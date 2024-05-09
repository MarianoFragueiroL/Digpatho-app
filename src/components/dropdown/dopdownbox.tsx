import React, { useState, ReactNode } from 'react';
import styles from './DropdownMenu.module.css';

interface DropdownMenuProps {
  icon?: ReactNode;
  children: ReactNode;
  label?:string
}
const DropdownMenu: React.FC<DropdownMenuProps> = ({ icon, children, label}) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleMouseEnter = () => {
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  return (
    <div
      className={styles.dropdown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={'d-flex justify-content-center '+styles.c_Container}>
        <div className={styles.iconLabelContainer}>
          {icon}
          {label &&
            <span className={styles.label}>{label}</span>
          }
        </div>
      </div>
      {isVisible && (
        <ul className={styles.dropdownMenu}>
          {children}
        </ul>
      )}
    </div>
  );
}

export default DropdownMenu;