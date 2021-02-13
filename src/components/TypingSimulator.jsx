import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import '../css/simulator.css'
import TextEditor from './TextEditor';
import AccuracyIndicator from './AccuracyIndicator';
import SpeedIndicator from './SpeedIndicator';

/*
    именно тут будет храниться все основные состояния приложения
        - измерение скорости печати
        - показание вводимого текста в реальном времени
        - обработчик клавиатурного ввода
        - измерение точности ввода
*/

class TypingSimulator extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: '',//полученный текст
            language: 'Russian',//язык текстаs
            currentChar: '',//символ который нужно ввести(положение курсора)
            prevChars: '',//введенные символы
            nextChars: '',//не введенные символы
            correct: 100
        }
        this.index = 0;//позиция курсора
        this.errorCount = 0;
        this.corrected = true;
        this.onKeyHandle = this.onKeyHandle.bind(this);

    }

    // метод вызывается при правильном вводе символа: переводит курсор на следующий символ
    ifCorrectSymbol() {
        this.setState({
            prevChars: this.state.text.slice(0, this.index),
            currentChar: this.state.text.charAt(this.index),
            nextChars: this.state.text.slice(this.index + 1),
            cursorClass: 'correct-cursor'
        });
        this.index++;
    }

    // обработка клавиатурного ввода-
    onKeyHandle(event) {

        if (event.key === this.state.currentChar) {
            this.corrected = true;
            this.ifCorrectSymbol(this.props.value);
        } else if (event.key !== 'Shift') {

            //подсчет количества ошибок
            if (this.corrected) {
                this.corrected = false;
                this.errorCount++;
                let p = (this.errorCount * 100 / this.state.text.length);
                this.setState({
                    correct: (100 - p).toFixed(2)
                })
            }

            this.setState({
                cursorClass: 'uncorrect-cursor'
            })
        }
    }

    // генератор случайного текста
    generateText() {

        let number = 2;

        switch (this.state.language) {
            case 'English': {
                let param = "type=all-meat" + "&sentences=" + number + "&start-with-lorem=1";

                // отправка запроса на сервер
                axios.get('https://baconipsum.com/api/?' + param).then(result => {
                    // изменение текста 
                    this.setState({
                        text: result.data.join(),
                    })
                    this.ifCorrectSymbol();
                    console.log("ответ с сервера получен");
                })

                break;
            }
            case 'Russian': {
                var params = '&type=sentence&number=' + number;

                // отправка запроса на сервер
                axios.get('https://fish-text.ru/get?' + params).then(result => {
                    console.log("ответ с сервера получен");
                    // изменение текста 
                    this.setState({
                        text: result.data.text,
                    });
                    this.ifCorrectSymbol();
                })
                break;
            }
        }
    }

    restart(target) {

        // показать окно старта 
        //сгенериовать текст
        this.index = 0;
        this.generateText();
        target.blur();
    }


    componentDidMount() {
        this.generateText(); //генерация случайного текста
        document.onkeydown = this.onKeyHandle;
    }

    render() {
        return (
            <div className="simulator">
                <TextEditor
                    prevChars={this.state.prevChars}
                    currentChar={this.state.currentChar}
                    nextChars={this.state.nextChars}
                    cursorClass={this.state.cursorClass}
                />
                <div className="control">
                    <div className="restart">
                        <i className="restart-icon"></i>
                        <button onClick={(event) => this.restart(event.target)}></button>
                    </div>
                    <AccuracyIndicator value={this.state.correct} />
                    <SpeedIndicator value={0}/>
                </div>
            </div>
        )
    }
}
export default TypingSimulator;