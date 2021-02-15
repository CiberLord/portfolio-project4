import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { icon } from '../images/reset.svg';
import '../css/simulator.css'
import TextEditor from './TextEditor';
import AccuracyIndicator from './AccuracyIndicator';
import SpeedIndicator from './SpeedIndicator';
import Dialog from './Dialog';
import ResultDialog from './ResultDialog';

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
            resultDVisible: true, //флаг для показа\скрытия результирующего окна
            isStart: true //первый запуск приложения
        }
        this.index = 0;//позиция курсора
        this.errorCount = 0; //подсчет количества не правильно нажатых символов
        this.corrected = true; //спец флаг чтобы предовратить бесконечный подсчет ошибок

        this.ready = true; //старт таймера
        this.startTime = 0; // стартове время
        this.spList = [0]; //список изменений скорости

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

    // обработка клавиатурного ввода
    onKeyHandle(event) {
        //запуск таймера
        if (this.ready) {
            console.log('timer enable');
            this.startTime = performance.now() / 1000;
            this.ready = false;

            //измеряет скорость каждую секундку
            this.timerId = setInterval(() => {
                let currentSpeed = Math.round(this.index * 60 / ((performance.now() / 1000) - this.startTime))
                this.spList.push(currentSpeed);
                this.setState({
                    speed: currentSpeed
                })
                this.lastIndex = this.index;
            }, 1400)
        }

        //проверка введенного символа на соответсвие
        if (event.key === this.state.currentChar) {
            this.corrected = true;
            this.ifCorrectSymbol(this.props.value);


            // если текст полностью набран
            if (this.index > this.state.text.length) {

                this.ready = true;//вернуть начало таймера подсчета скорости
                clearInterval(this.timerId);//отключить измерение скорости

                //измерение общей скорости
                let midSpeed = Math.round(this.spList.reduce((sum, cur) => sum + cur, 0) / this.spList.length);
                console.log(midSpeed);
                this.setState({
                    speed: midSpeed,
                    resultDVisible: true
                })
                document.onkeydown = null;
            }

        } else if (event.key !== 'Shift') {
            // this.lasttime=this.lasttime-0.1
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
    generateText(lan) {

        let number = 1;//количество предложени
        let apiPath = '';
        if (this.state.language === 'English') {
            apiPath = 'https://baconipsum.com/api/?type=all-meat&sentences=' + number + '&start-with-lorem=1';
        }
        else if (this.state.language === 'Русский язык') {
            apiPath = 'https://fish-text.ru/get?&type=sentence&number=' + number;
        }
        //отправка запроса к апи
        axios.get(apiPath).then(result => {
            // изменение текста 

            this.setState({
                text: (result.data.text) ? result.data.text : result.data.join(),
                dialogVisible: false,
                resultDVisible: false,
                isStart: false,
                correct: 100,
                speed: 0
            });
            this.ifCorrectSymbol();
            console.log("ответ с сервера получен");
        })
    }
    //открыть стартовое диалоговое окно
    openStartDialog() {
        /*
            эта функция выходит из режима печати и отключает таймеры, открывает окно для генерации нового текста
         */
        clearInterval(this.timerId);
        document.onkeydown = null;
        this.setState({
            dialogVisible: true
        })
    }
    openResultDialog(){
        this.setStart()
    }

    // генерация нового текста и переход в режим печати
    startTyping() {
        this.setStart();
        this.generateText();
    }

    //переход приложения в исходное состояние
    setStart() {
        this.ready = true;
        this.index = 0;
        this.spList = [];
        document.onkeydown = this.onKeyHandle;
        this.errorCount = 0;
        this.setState({
            isStart: true,
            resultDVisible: false
        });
    }


    componentDidMount() {

    }

    render() {
        return (
            <div className="container">
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
                            <button onClick={() => this.openStartDialog()}>{(this.state.isStart) ? 'Начать' : 'Заново'}</button>
                        </div>
                        <AccuracyIndicator value={this.state.correct} />
                        <SpeedIndicator value={this.state.speed} />
                        <Dialog
                            visible={this.state.dialogVisible}
                            language={this.state.language}
                            setLang={(lang) => this.setLang(lang)}
                            start={() => this.startTyping()}
                        />
                        <ResultDialog
                            begin={() => this.setStart()}
                            visible={this.state.resultDVisible}
                            correct={this.state.correct}
                            speed={this.state.speed}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
export default TypingSimulator;