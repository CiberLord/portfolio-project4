import React from 'react';
import ReactDOM from 'react-dom';

/*
    показывает исходный текст
    здесь должен находится: 
        кастомный курсор 
        текст
        зеленым будет помечатся набранный текст(тоже отдельный компонент)            
*/

class TextEditor extends React.Component{
    constructor(props){
        super(props);


    }

    render(){

        return (
            <div>
                {this.props.value}
            </div>
        )
    }
}

export default TextEditor;