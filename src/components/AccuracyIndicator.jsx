import '../css/simulator.css';
 // показатель точности ввода
 
function AccuracyIndicator(props) {

    return (
        <div className="accuracy">
            <div>{props.value}%</div>
            <p className="accuracy-icon">точность</p>
        </div>

    )
}


export default AccuracyIndicator;