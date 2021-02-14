import React from 'react';
import ReactDOM from 'react-dom';

import '../css/simulator.css';

/*
    показывает исходный текст
    здесь должен находится: 
        кастомный курсор 
        текст
         зеленым будет помечатся набранный текст         
*/

class TextEditor extends React.Component {
    constructor(props) {
        super(props);
    
    }

    render() {
        
        if(this.props.isStart){
            return (
                <div className={"text__editors "+"start-text"}>
                    Кликни на кнопку "Начать" и увидишь магию:)
                </div>
            )
        }
        return (
            <div className="text__editor">
                <pre className="prev-chars">{this.props.prevChars}</pre>
                <pre className={this.props.cursorClass}>{this.props.currentChar}</pre>
                <pre className="next-chars">{this.props.nextChars}</pre>
            </div>
        )
    }
}

export default TextEditor;


