import React from "react";

const NotificationItem = ({ children }) => {

  return (
    <div style={{
      width: "300px", height: "100px", display: "flex", flexDirection: "row", alignItems: "center",
      wordWrap: "break-word", overflow: "wrap", overflowWrap: "break-word"
    }}>
      {children}
    </div>
  );

}

export default NotificationItem;