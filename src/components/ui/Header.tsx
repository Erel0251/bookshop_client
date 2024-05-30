import { TextField } from '@mui/material';

function Header() {
  return (
    <header className="header">
      <section className="header__logo">
        <img src="./src/assets/images/book.jpg" alt="logo" />
        <div>BookWorm</div>
      </section>
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      <section className="header__navigation">
        <a href="#">Home</a>
        <a href="#">Shop</a>
        <a href="#">About</a>
      </section>

      <section className="header__cart">
        <div>Cart (0)</div>
      </section>
    </header>
  );
}

export default Header;
