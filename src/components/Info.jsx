import '../css/info.css';

function Info(props){

    return(
        <div>
            <div className="container">
                <div className="info">
                    <h1>Как должны располагаться пальцы при слепой печати?</h1>
                    <img src='/images/info-image.jpg' alt=""/>
                    <p>Данную вкладку я добавил просто чтобы, протестировать работу с роутингом в ReactJs</p>
                    <p>
                        При создании приложения для получения данных с api подключил библеотеку axiosJs.
                        Вместо функциональных компонентов писал на классах, потому что React я начал изучать недавно, и пока что 
                        работу с хуками не изучал
                    </p>
                </div>    
            </div>    
        </div>
    )
}
export default Info;