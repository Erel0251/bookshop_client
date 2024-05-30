// src/Footer.js

function Footer() {
  return (
    <>
      <footer className="footer">
        <section className="footer__logo">
          <img src="./src/assets/images/book.jpg" alt="logo" />
          <div>2024</div>
        </section>
        <section className="footer__navigation">
          <div>Navigation</div>
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Shop</a>
          <a href="#">Cart</a>
          <a href="#">Contact</a>
        </section>
        <section className="footer__location">
          <div>Location</div>
          <p>1234 Main St</p>
          <p>San Francisco, CA</p>
          <p>94123</p>
        </section>
      </footer>
    </>
  );
}

export default Footer;
