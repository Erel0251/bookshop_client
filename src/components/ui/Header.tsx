function Header() {
  return (
    <header className="header">
      <section className="header__logo">
        <img src="./src/assets/images/book.jpg" alt="logo" />
        <div>BookWorm</div>
      </section>
      <section className="header__search">
        <form action="#">
          <input type="search" placeholder="Search for books" />
        </form>
      </section>
      <section className="header__navigation">
        <a href="#">All Book</a>
        <a href="#">Sale</a>
        <a href="#">About</a>
      </section>

      <section className="header__cart">
        <div>Cart</div>
      </section>
    </header>
  );
}

export default Header;
