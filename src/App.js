import Header from "./components/Header/Header";
import Card from "./components/UI/Card";
import Menu from "./components/Menu/Menu";
import classes from "./App.module.css";
import CartContextProvider from "./components/context/CartContextProvider";

function App() {
  return (
    <CartContextProvider>
      <Header />
      <div className={classes["below-header"]}>
        <Card className>
          <Menu />
        </Card>
      </div>
    </CartContextProvider>
  );
}

export default App;
