import '../css/simulator.css';


//показывает набираемый текст      

function TextEditor(props){

    if(props.isStart){
        return (
            <div className={"text__editors "+"start-text"}>
                Кликни на кнопку "Начать" и увидишь магию:)
            </div>
        )
    }
    return (
        <div className="text__editor">
            <pre className="prev-chars">{props.prevChars}</pre>
            <pre className={props.cursorClass}>{props.currentChar}</pre>
            <pre className="next-chars">{props.nextChars}</pre>
        </div>
    )
}
export default TextEditor;


