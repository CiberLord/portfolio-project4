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
            <div>
                <p>точность</p>
                <div>{this.props.value}%</div>
            </div>
        )
    }
}

export default AccuracyIndicator;