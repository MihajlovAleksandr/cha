import logo from "./assets/logo.png"
import "./Styles/Header.css"
export function Header(){
    return (
        <header>
        <img src={logo} alt="Unicorn Logo" />
        <p>Team Unicorns</p>
    </header>
    );
}