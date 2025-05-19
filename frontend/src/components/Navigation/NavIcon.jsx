// vocalendar/frontend/src/components/Navigation/NavIcon.jsx
import React from 'react';

const NavIcon = ({ icon: Icon, label, isActive, onClick }) => {
  return (
    <button
      className={`
        flex items-center justify-center p-2 transition-colors
        ${isActive ? 'text-purple-600' : 'text-gray-600 hover:text-purple-500'}
      `}
      onClick={onClick}
      aria-label={label}
    >
      {Icon}
      <span className="sr-only">{label}</span>
    </button>
  );
};

export default NavIcon;