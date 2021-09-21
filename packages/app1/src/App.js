import React, { useEffect, useState } from 'react';
import reducer, { changeAppNameAction } from '../reducers/app1.reducer';
import { Provider, useSelector, useDispatch } from 'react-redux';

const App=()=>{
    const state=useSelector(state=>state);
    const [appName, setAppName] = useState("");
    const dispatch = useDispatch();
    return (
        <div>
            <h1>This is App1</h1>
            App1 name: {state?.app1?.appName}<br />
            Core-ui name: {state?.coreUI?.appName}
        <div>
            <input
            type="text"
            value={appName}
            onChange={(e)=>{
                setAppName(e.target.value)
            }}
            />
            <button
                onClick={()=>dispatch(changeAppNameAction(appName))}
            >
                    Change App1 name from App1
            </button>
        </div>
            Both states together into App1 look like this
            {JSON.stringify(state)}
        </div>
    )
};

const AppWrapper=(props)=>{
    const {store}=props;
    useEffect(()=>{
        store.injectReducer("app1", reducer);
    },[])
    return (
        <Provider store={store||{}} >
        <App/>
        </Provider>
    )
}

export default AppWrapper;