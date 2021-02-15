import '../css/simulator.css'


//показатель скорости печати
 
function SpeedIndicator(props){

    return (
        <div className="accuracy">
        <div>{props.value}<span className="cl">симв/мин</span></div>
        <p className="speed-icon">скорость</p>
    </div>
    )
}

export default SpeedIndicator;