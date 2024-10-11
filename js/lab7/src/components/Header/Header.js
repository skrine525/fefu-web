import './Header.css';
import logo from "./logo.png"

const logoWidth = 200;

function Header() {
    return (
        <header>
            <img src={logo} width={logoWidth} alt="logo.png"/>
        </header>
    );
}

export default Header;
