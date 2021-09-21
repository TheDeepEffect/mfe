import { changeAppNameAction } from "app1/exports"
import React, { useState } from "react";
import { useDispatch } from "react-redux";

export const NameChanger = () => {
    const [name, setName] = useState("");
    const dispatch = useDispatch();
    return <div>
        <h1>Change State of app1 from core-ui</h1>
        <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
        <button
            onClick={() => dispatch(changeAppNameAction(name))}
        >Change App1 name from core ui</button>
    </div>
}