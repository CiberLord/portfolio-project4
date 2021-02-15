import '../css/simulator.css';

function Timer(props){
    return (
        <div className="accuracy">
        <div>{props.minite}:{props.second}</div>
        <p >таймер</p>
    </div>
    )
}
export default Timer;