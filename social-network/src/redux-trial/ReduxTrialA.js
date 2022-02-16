import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import {changeTheme, defaultTheme} from '../features/theme';
import {useSelector} from 'react-redux';

function ReduxTrialA() {
    const currentTheme = useSelector((state)=>state.theme.value);
    let [theme, setTheme] = useState(currentTheme);

    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(changeTheme(theme));
    }, [theme]);
    function themeChanger() {
        localStorage.setItem('user-theme',theme);
        dispatch(changeTheme(theme));
    }

    return(
        <>
            <select className="form-select" onChange={(e)=>setTheme(e.target.value)}>
                <option selected>{theme}</option>
                <option>blue</option>
                <option>red</option>
                <option>green</option>
            </select> <br />
            <div style={{'display':'flex','justifyContent':'flex-end','gap':'.5em'}}>
            <button className='btn btn-primary' onClick={themeChanger}>Set</button> <button className="btn btn-secondary" onClick={()=>dispatch(defaultTheme())} >Default</button>
            </div>
        </>
    )
}

export default ReduxTrialA;