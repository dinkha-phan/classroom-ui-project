import React from "react";
import { useLocalContext } from "../../context/context";

function CardView() {
    const { showProfile, setShowProfile } = useLocalContext();
    const handleOnCloseDialog = () => {
        setShowProfile(false);
    }

    return (
        <div>
            
        </div>
    )
}

export default CardView