import React from 'react';
import ReactDOM from 'react-dom';
import '../css/dialog.css';
import Portal from './Portal';


class ResultDialog extends React.Component{
    constructor(props){
        super(props);


    }

    render(){

        if(this.props.visible){
            return (
                <Portal>
                    <div className="modal-bg">
                        <div className="dialog-container">
                            <h2 className="dialog-title">Завершено</h2>
                            <div className="row">
                                <div className="rd-i">
                                    <div>средняя скорость:</div>
                                    <div>{this.props.speed}</div>
                                </div>
                                <div className="rd-i">
                                    <div>точность:</div>
                                    <div>{this.props.correct}</div>
                                </div>
                            </div>
                            <div className="row ">
                                <button className="start-button" onClick={()=>this.props.begin()}>Вернуться</button>
                            </div>
                        </div>
                    </div>
                </Portal>
            )
        }else{
            return null;
        }
    }

}

export default ResultDialog;