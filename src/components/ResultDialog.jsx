import React from 'react';
import '../css/dialog.css';
import Portal from './Portal';
import {CSSTransition} from 'react-transition-group';

class ResultDialog extends React.Component {
    constructor(props) {
        super(props);


    }

    render() {
        return (
            <CSSTransition
                in={this.props.visible}
                timeout={300}
                classNames="modal-bg"
                mountOnEnter
                unmountOnExit
            >
                <Portal>
                    <div className="modal-bg">
                        <div className="dialog-container">
                            <h2 className="dialog-title">Завершено</h2>
                            <div className="row">
                                <div className="rd-i">
                                    <div>средняя скорость: {this.props.speed}симв/мин</div>
                                </div>
                                <div className="rd-i">
                                    <div>точность: {this.props.correct}%</div>
                                </div>
                                <div className="rd-i">
                                    <div>время: {this.props.time}</div>
                                </div>
                            </div>
                            <div className="row ">
                                <button className="start-button exit-button" onClick={() => this.props.begin()}>Выход</button>
                            </div>
                        </div>
                    </div>
                </Portal>
            </CSSTransition>
        )  
    }

}

export default ResultDialog;