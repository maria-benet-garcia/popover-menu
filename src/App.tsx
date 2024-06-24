import React, { useState, useRef, MouseEvent as ReactMouseEvent } from "react";
import Popover from "./Popover";
import RightClickMenu from "./RightClickMenu";
import "./App.css";

type Position = {
  top: number;
  left: number;
};

const App: React.FC = () => {
  const [showPopover, setShowPopover] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState<Position>({
    top: 0,
    left: 0,
  });
  const [showRightClickMenu, setShowRightClickMenu] = useState(false);
  const [rightClickMenuPosition, setRightClickMenuPosition] =
    useState<Position>({ top: 0, left: 0 });
  const popoverRef = useRef<HTMLButtonElement>(null);

  const handlePopoverClick = (event: ReactMouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // Prevent the event from propagating to the parent div
    if (event.button !== 0) return; // Only proceed if it's a left-click
    if (popoverRef.current) {
      const rect = popoverRef.current.getBoundingClientRect();
      setPopoverPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
      setShowPopover(!showPopover);
    }
  };

  const handleRightMenuClick = (event: ReactMouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation(); // Prevent the event from propagating to the parent div
    setRightClickMenuPosition({
      top: event.clientY + window.scrollY,
      left: event.clientX + window.scrollX,
    });
    setShowRightClickMenu(true);
  };

  const handleCloseMenus = () => {
    setShowPopover(false);
    setShowRightClickMenu(false);
  };

  return (
    <div className="App" onClick={handleCloseMenus}>
      <div className="container red-container">
        <label>Click on button</label>
        <button ref={popoverRef} onClick={handlePopoverClick}>
          Popover
        </button>
        {showPopover && (
          <Popover
            position={popoverPosition}
            onClose={() => setShowPopover(false)}
          />
        )}
      </div>
      <div className="container blue-container" onClick={handleRightMenuClick}>
        <label>Right click anywhere</label>
        {showRightClickMenu && (
          <RightClickMenu
            position={rightClickMenuPosition}
            onClose={() => setShowRightClickMenu(false)}
          />
        )}
      </div>
    </div>
  );
};

export default App;
