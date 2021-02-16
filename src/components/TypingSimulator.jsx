import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import '../css/simulator.css'
import TextEditor from './TextEditor';
import AccuracyIndicator from './AccuracyIndicator';
import SpeedIndicator from './SpeedIndicator';
import Dialog from './Dialog';
import ResultDialog from './ResultDialog';
import Timer from './Timer';


/*
    этот компонент отвечает за точность , скорость печати, набора текста, таймера и ...
*/

class TypingSimulator extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: '',//полученный текстначать
            language: 'Русский язык',//язык текста
            currentChar: '',//символ который нужно ввести(положение курсора)
            prevChars: '',//введенные символы
            nextChars: '',//не введенные символы
            correct: 100, //корректно введенные символы в процентах
            speed: 0, // скорость печати
            dialogVisible: false, //флаг для показа\скрытия диалогового окна
            resultDVisible: false, //флаг для показа\скрытия результирующего окна
            isStart: true, //первый запуск приложения
            seconds: 0,
            minutes: 0 //таймер
        }
        this.index = 0;//позиция курсора
        this.errorCount = 0; //подсчет количества не правильно нажатых символов
        this.corrected = true; //спец флаг чтобы предовратить бесконечный подсчет ошибок

        this.ready = true; //старт таймера
        this.startTime = 0; // стартове время        
        this.spList = [0]; //список изменений скорости
        this.countTime=0; //счетчик таймера
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
        
        //проверка введенного символа на соответсвие
        if (event.key === this.state.currentChar) {
            
            //запуск таймеров
            if (this.ready) {
                console.log('timer enable');
                this.startTime = performance.now() / 1000;
                this.ready = false;
    
                this.tId=setInterval(()=>{
                    let currenttime=performance.now();
                    if(currenttime-this.countTime>=1000){
                        this.countTime=currenttime;
                        if(this.state.seconds===59){
                            this.setState(prevState=>({
                                seconds:0,
                                minutes:prevState.minutes+1
                            }))
                        }else{
                            this.setState(prevState=>({
                                seconds: prevState.seconds+1
                            }))
                        }
                    }
                
                },100)
                //измеряет скорость каждые 2секунды
                this.timerId = setInterval(() => {
                    let currentSpeed = Math.round(this.index * 60 / ((performance.now() / 1000) - this.startTime))
                    this.spList.push(currentSpeed);
                    this.setState({
                        speed: currentSpeed
                    })
                    this.lastIndex = this.index;
                }, 2000)
            }
    

            this.corrected = true;
            this.ifCorrectSymbol(this.props.value);


            // если текст полностью набран
            if (this.index > this.state.text.length) {

                this.ready = true;//вернуть начало таймера подсчета скорости
                clearInterval(this.timerId);//отключить измерение скорости
                clearInterval(this.tId);
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

    //изменить язык нового текста
    setLang(lang) {
        this.setState({
            language: lang
        })
    }

    // генератор случайного текста
    generateText() {

        let number = 2;//количество предложени
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
            let text = (result.data.text) ? result.data.text : result.data.join();
            if (text.length < 200) {
                this.generateText();
            } else {
                console.log(text.length);
                this.setState({
                    text: text,
                    dialogVisible: false,
                    resultDVisible: false,
                    isStart: false,
                    correct: 100
                });
                this.ifCorrectSymbol();
                console.log("ответ с сервера получен");
            }
        })
    }
    //открыть стартовое диалоговое окно
    openStartDialog() {
        /*
            эта функция выходит из режима печати и отключает таймеры, открывает окно для генерации нового текста
         */
        clearInterval(this.tId);
        clearInterval(this.timerId);
        document.onkeydown = null;
        this.setState({
            dialogVisible: true
        })
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
            speed: 0,
            correct: 0,
            isStart: true,
            resultDVisible: false,
            seconds: 0,
            minutes: 0
        });
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
                            <i className={(this.state.isStart) ? 'start-icon' : 'restart-icon'}></i>
                            <button onClick={() => this.openStartDialog()}>{(this.state.isStart) ? 'Начать' : 'Заново'}</button>
                        </div>
                        <Timer minite={this.state.minutes} second={this.state.seconds}/>
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
                            time={this.state.minutes+":"+this.state.seconds}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
export default TypingSimulator;