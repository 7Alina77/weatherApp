import Title from "../atoms/Title";
import Navigation from "./Navigation";

function Header() {
  return (
    <header className="bg-gray-100">
      <Title />
      <Navigation />
    </header>
  )
}

export default Header;