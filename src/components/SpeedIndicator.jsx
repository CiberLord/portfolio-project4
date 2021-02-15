import React from 'react';
import ReactDOM from 'react-dom';
import '../css/simulator.css'


/**
 * показатель скорости печати
 */

class SpeedIndicator extends React.Component{
    constructor(props){
        super(props);


    }

    render(){

        return (


            <div className="accuracy">
                <div>{this.props.value}<span className="cl">симв/мин</span></div>
                <p className="speed-icon">скорость</p>
            </div>
        )
    }

}
export default SpeedIndicator;