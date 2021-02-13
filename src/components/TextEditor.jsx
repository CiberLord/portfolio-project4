import React from 'react';
import ReactDOM from 'react-dom';

import '../css/simulator.css';

/*
    показывает исходный текст
    здесь должен находится: 
        кастомный курсор 
        текст
        зеленым будет помечатся набранный текст(тоже отдельный компонент)            
*/

class TextEditor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentChar: '',//символ который нужно ввести(положение курсора)
            prevChars: '',//введенные символы
            nextChars: '',//не введенные символы
        }

        this.index = 0 //разделитель между введенным и не введенными символыми
        this.onKeyHandle=this.onKeyHandle.bind(this);
    }

    // метод вызывается при правильном вводе символа: переводит курсор на следующий символ
    ifCorrectSymbol(value) {
        this.setState({
            prevChars: value.slice(0, this.index),
            currentChar: value.charAt(this.index),
            nextChars: value.slice(this.index + 1),
            cursorClass: 'correct-cursor'
        });
        this.index++;
    }

    // обработка клавиатурного ввода-
    onKeyHandle(event) {
        console.log(event.key);
        if (event.key === this.state.currentChar) {
            this.ifCorrectSymbol(this.props.value);
        } else if (event.key !== 'Shift') {
            this.setState({
                cursorClass: 'uncorrect-cursor'
            })
        }
    }
    componentWillReceiveProps(props){
        this.ifCorrectSymbol(props.value); //обновшление текста
    }

    componentDidMount() {
        document.onkeydown = this.onKeyHandle;//привязка обработчика клавиатурного ввода к дом

    }   

    render() {



        return (
            <div className="text__editor">
                <pre className="prev-chars">{this.state.prevChars}</pre>
                <pre className={this.state.cursorClass}>{this.state.currentChar}</pre>
                <pre className="next-chars">{this.state.nextChars}</pre>
            </div>
        )
    }
}

export default TextEditor;


