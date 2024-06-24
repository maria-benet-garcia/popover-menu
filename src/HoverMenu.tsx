import React, {forwardRef, useEffect, useRef, useState} from "react";
import "./HoverMenu.css";

type HoverMenuProps = {
    showEntireMenu: boolean;
  onClose: () => void; // Add onClose prop to handle menu close
};

const HoverMenu = forwardRef<HTMLDivElement, HoverMenuProps>(
  ({ onClose, showEntireMenu }, ref) => {
    const [showSubHoverMenu, setShowSubHoverMenu] = useState(false);
    const [marginTop, setMarginTop] = useState(0);
    const menuRef = useRef<HTMLUListElement>(null);
    const handleHoverClick = () => {
      setShowSubHoverMenu(true); // Show the sub hover menu
    };

    const handleSubHoverClose = () => {
      setShowSubHoverMenu(false); // Close the sub hover menu
    };

    useEffect(() => {
      if (menuRef.current) {
        const menuWidth = menuRef.current.offsetWidth;
        setMarginTop(menuWidth);
      }
    }, []);

    console.log('margin top es ', marginTop)

    return (
      <div ref={ref} className="hover-menu">
         <ul ref={menuRef}>
          {showEntireMenu && (
            <>
              <li>Hello</li>
              <li>Spacemaker</li>
              <li>World</li>
              <li onClick={onClose}>Close</li> {/* Close only the HoverMenu */}
            </>
          )}
          <li className="hover-item" onMouseEnter={handleHoverClick}>
            Hover
            {showSubHoverMenu && (
              <HoverMenu showEntireMenu={false} onClose={handleSubHoverClose} />
            )}
          </li>
        </ul>
      </div>
    );
  },
);

export default HoverMenu;
