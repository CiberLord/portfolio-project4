import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import '../css/simulator.css'
import TextEditor from './TextEditor';

/*
    Родительский компонент
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
            language: 'English',//язык текста
        }
    }
    /**
        генератор случайного текста
        параметры:
            * language(обьязательный)язык на котором нужно вывести текст
                допустимые значения: 'English' , 'Russian'
            * второй параметр число(необьязательно) количество предложений в тексте
        возвращемое значение: string
     */
    generateText(language) {

        let number = (arguments[1]) ? arguments[1] : 5;

        switch (language) {
            case 'English': {
                let param = "type=all-meat" + "&sentences=" + number + "&start-with-lorem=1";

                // отправка запроса на сервер
                axios.get('https://baconipsum.com/api/?' + param).then(result => {
                    // изменение текста 
                    this.setState({
                        text: result.data.join(),
                    })
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
                })
                break;
            }
        }
    }
    

    componentDidMount() {
        this.generateText(this.state.language, 1); //генерация случайного текста
    }

    render() {
        return (
            <div className="simulator">
                <TextEditor onstart={this.onload} value={this.state.text} />
            </div>
        )
    }
}
export default TypingSimulator;