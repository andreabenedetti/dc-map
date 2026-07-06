function Footer() {
  return (
    <div
      className={
        "container mx-auto mt-10 pt-8 pb-8 border-solid border-gray-300 border-t text-sm text-gray-400"
      }
    >
      <div className={"grid xs:grid-cols-1 md:grid-cols-3 gap-6"}>
        <p>NINA. Né intelligente né artificiale</p>
        <p>
          <a href="https://www.nina.watch/">www.nina.watch</a>
        </p>
        <p>
          <a href="https://www.instagram.com/n.i.n.a_watch/">@n.i.n.a_watch</a>
        </p>
      </div>
    </div>
  );
}

export default Footer;
