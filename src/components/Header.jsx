import React from 'react';
import ReactDOM from 'react-dom';
import '../css/header.css'


class Header extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <header className="header">
                <div className="container">
                    <div className="row">
                        <div className="logo"></div>
                        <div className="info">Справка</div>
                    </div>
                </div>
            </header>
        )
    }
}
export default Header;