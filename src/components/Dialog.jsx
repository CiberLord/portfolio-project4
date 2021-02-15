import React from 'react';
import ReactDOM from 'react-dom';
import '../css/dialog.css';
import Portal from './Portal';


//диалоговое окно которое будет срабатывать при рестарте и нажатии на кнопку начать
//
class Dialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            langList: false //флаг 
        }
    }
    //показать или скрыть спико выбра текста
    triggeLangList(){
        this.setState({
            langList: !this.state.langList 
        })

    }
    startTyping(){
        this.props.start();
    }

    //измененеие языка генерируемого текста
    setLang(lang){
        this.props.setLang(lang);
        this.triggeLangList();
    }

    render() {
        if(this.props.visible){//диалогове окно открывается
            return (
                <Portal>
                    <div className="modal-bg">
                        <div className="dialog-container">
                            <div className="lang-menu">
                                <div onClick={()=>this.triggeLangList()}>{this.props.language}<i className="lang-list-icon"></i></div>
                                {this.state.langList &&
                                    <ul className="lang-type">
                                        <li onClick={(event)=>this.setLang(event.target.textContent)}>English</li>
                                        <li  onClick={(event)=>this.setLang(event.target.textContent)}>Русский язык</li>
                                    </ul>
                                }
                            </div>
                            <h2 className="dialog-title">Приготовься печатать. Жми!</h2>
                            <button className="start-button" onClick={()=>this.startTyping()}>Начать</button>
                        </div>
                    </div>
                </Portal>
            )
        }else{
            return null;
        }
    }
}
export default Dialog;