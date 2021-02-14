import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import '../css/simulator.css'
import TextEditor from './TextEditor';
import AccuracyIndicator from './AccuracyIndicator';
import SpeedIndicator from './SpeedIndicator';
import Dialog from './Dialog';

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
            text: 'нажми кнопку нажать и увидишь магию:)',//полученный текст
            language: 'Русский язык',//язык текстаs
            currentChar: '',//символ который нужно ввести(положение курсора)
            prevChars: '',//введенные символы
            nextChars: '',//не введенные символы
            correct: 100, //корректно введенные символы в процентах
            speed: 0, // скорость печати
            dialogVisible: false, //флаг для показа\скрытия диалогового окна
            isStart: true //первый запуск приложения
        }
        this.index = 0;//позиция курсора
        this.errorCount = 0; //подсчет количества не правильно нажатых символов
        this.corrected = true; //спец флаг чтобы предовратить бесконечный подсчет ошибок
        this.onKeyHandle = this.onKeyHandle.bind(this); //привязка обработчика клавиатурного ввода

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

    //изменить язык текста
    setLang(lang) {
        this.setState({
            language: lang
        })
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
                        dialogVisible: false,
                        correct: 100,
                        speed: 0
                    })
                    this.ifCorrectSymbol();
                    console.log("ответ с сервера получен");
                })

                break;
            }
            case 'Русский язык': {
                var params = '&type=sentence&number=' + number;

                // отправка запроса на сервер
                axios.get('https://fish-text.ru/get?' + params).then(result => {
                    console.log("ответ с сервера получен");
                    // изменение текста 
                    this.setState({
                        text: result.data.text,
                        dialogVisible: false,
                        correct: 100,
                        speed: 0
                    });
                    this.ifCorrectSymbol();
                })
                break;
            }
        }
    }
    //открыть стартовое диалоговое окно
    openStartDialog() {
        this.setState({
            dialogVisible: true
        })
    }

    // генерация нового текста и старт 
    startTyping() {
        this.index = 0;
        this.errorCount = 0;
        this.generateText();
    }


    componentDidMount() {
        // this.generateText(); //генерация случайного текста
        document.onkeydown = this.onKeyHandle;
    }

    render() {
        return (
            <div className="simulator">
                <TextEditor
                    isStart={this.state.isStart}
                    prevChars={this.state.prevChars}
                    currentChar={this.state.currentChar}
                    nextChars={this.state.nextChars}
                    cursorClass={this.state.cursorClass}
                />
                <div className="control">
                    <div className="run">
                        <i className="restart-icon"></i>
                        <button onClick={() => this.openStartDialog()}>{(this.state.isStart)?'Начать':'Заново'}</button>
                    </div>
                    <AccuracyIndicator value={this.state.correct} />
                    <SpeedIndicator value={this.state.speed} />
                    <Dialog
                        visible={this.state.dialogVisible}
                        language={this.state.language}
                        setLang={(lang) => this.setLang(lang)}
                        start={() => this.startTyping()}
                    />
                </div>
            </div>
        )
    }
}
export default TypingSimulator;