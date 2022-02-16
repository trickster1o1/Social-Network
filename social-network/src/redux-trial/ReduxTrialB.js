import {useSelector} from 'react-redux';

function ReduxTrialB() {
    const theme = useSelector((state)=> state.theme.value);
    return(
        <div style={{color: theme}}>
            <h1>Redux Here We Gooo</h1>
            <p>It is onnn</p>
        </div>
    )
}

export default ReduxTrialB;