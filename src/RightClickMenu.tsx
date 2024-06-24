import React, { useState } from "react";
import "./RightClickMenu.css";

type RightClickMenuProps = {
  position: {
    top: number;
    left: number;
  };
  onClose: () => void;
};

const RightClickMenu: React.FC<RightClickMenuProps> = ({
  position,
  onClose,
}) => {
  const [showHoverMenu, setShowHoverMenu] = useState(false);

  const handleMenuClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <div
      className="right-click-menu"
      onClick={handleMenuClick}
      style={{ top: position.top, left: position.left }}
    >
      <ul>
        <li>I do nothing</li>
        <li
          onMouseEnter={() => setShowHoverMenu(true)}
          onMouseLeave={() => setShowHoverMenu(false)}
        >
          Hover
          {showHoverMenu && (
            <div className="hover-menu">
              <ul>
                <li>Empty</li>
                <li onClick={onClose}>Close</li>
              </ul>
            </div>
          )}
        </li>
      </ul>
    </div>
  );
};

export default RightClickMenu;
