import React from "react";
import "../App.css";

export default function UserPop({ onClose, item }) {
    return (
        <>
            <div className="popup-user">
                <button className="popup-close" onClick={onClose} >Close</button>
                {/* Popup content */}
            </div>
        </>
    );
}
