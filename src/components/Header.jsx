import '../css/header.css'
import { NavLink } from 'react-router-dom';

//шапка приложения
function Header(props) {
    return (
        <header className="header">
            <div className="container">
                <div className="row">
                    <div className="logo"></div>
                    <div className="menu">
                        <NavLink activeClassName="link-active" className="main-button" to="/home">Тренажер</NavLink>
                        <NavLink activeClassName="link-active" className="info-button" to="info">Справка</NavLink>
                    </div>
                </div>
            </div>
        </header>
    )
}
export default Header;