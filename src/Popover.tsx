import React, { useState, useRef, useEffect } from "react";
import HoverMenu from "./HoverMenu";
import "./Popover.css";

type PopoverProps = {
  position: {
    top: number;
    left: number;
  };
  onClose: () => void;
};

const Popover: React.FC<PopoverProps> = ({ position, onClose }) => {
  const [showHoverMenu, setShowHoverMenu] = useState(false);
  const [hoveringOverHover, setHoveringOverHover] = useState(false);
  const hoverRef = useRef<HTMLLIElement>(null);
  const hoverMenuRef = useRef<HTMLDivElement>(null);

  // Close hover menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        hoverRef.current &&
        hoverMenuRef.current &&
        !hoverRef.current.contains(event.target as Node) &&
        !hoverMenuRef.current.contains(event.target as Node)
      ) {
        setShowHoverMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handlePopoverClose = () => {
    setShowHoverMenu(false); // Close the HoverMenu
    onClose(); // Close the Popover
  };

  const handleItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    const itemText = (event.target as HTMLElement).textContent;
    if (itemText === "Hover") {
      setShowHoverMenu(!showHoverMenu); // Toggle the hover menu
    } else if (itemText === "Close") {
      setShowHoverMenu(false); // Close the hover menu
    }
  };

  const handleMouseEnter = () => {
    setHoveringOverHover(true);
    setShowHoverMenu(true);
  };

  const handleHoverMenuClose = () => {
    setShowHoverMenu(false); // Close only the HoverMenu
  };

  const handleMouseLeave = () => {
    setHoveringOverHover(false);
    // Close the hover menu if not hovering over either the "Hover" button or the HoverMenu itself
    setTimeout(() => {
      if (
        !hoveringOverHover &&
        !hoverRef.current?.contains(document.activeElement as Node)
      ) {
        setShowHoverMenu(false);
      }
    }, 200); // Adjust delay time as needed
  };

  return (
    <div className="popover" style={{ top: position.top, left: position.left }}>
      <ul>
        <li onClick={handleItemClick}>Hello</li>
        <li onClick={handlePopoverClose}>Close</li> {/* Close the Popover */}
        <li
          ref={hoverRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleItemClick}
        >
          Hover
          {showHoverMenu && (
            <HoverMenu
              showEntireMenu={true}
              onClose={handleHoverMenuClose} // Pass close handler to HoverMenu
              ref={hoverMenuRef}
            />
          )}
        </li>
      </ul>
    </div>
  );
};

export default Popover;
