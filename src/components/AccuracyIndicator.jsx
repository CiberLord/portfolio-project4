import React from 'react';
import ReactDOM from 'react-dom';

/**
 * показатель точности ввода
 */
class AccuracyIndicator extends React.Component{
    constructor(props){
        super(props);
       
        
    }

    render(){

        return (
            <div className="accuracy">
                <div>{this.props.value}%</div>
                <p className="accuracy-icon">точность</p>
            </div>
        )
    }
}

export default AccuracyIndicator;