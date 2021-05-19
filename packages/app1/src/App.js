import React, { useEffect, useState } from 'react';
import reducer, { changeAppNameAction } from '../reducers/app1.reducer';
import { Provider, useSelector, useDispatch } from 'react-redux';

const App=()=>{
    const state=useSelector(state=>state);
    const [appName, setAppName] = useState("");
    const dispatch = useDispatch();
    return (
        <div>
        App name:{JSON.stringify(state)}
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
                Change name
            </button>
        </div>
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