import '../css/header.css'

//шапка приложения
function Header(props) {
    return (
        <header className="header">
            <div className="container">
                <div className="row">
                    <div className="logo"></div>
                    <div className="menu">
                        <a  href="https://vk.com/yuldash1123" className="item vk"></a>
                        <a  href="http://cybergod1123@gmail.com" className="item gmail"></a>
                        <a  href="tel:89042406470" className="item cal"></a>
                    </div>
                </div>
            </div>
        </header>
    )
}
export default Header;