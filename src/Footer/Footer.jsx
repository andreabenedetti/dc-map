function Footer() {
  return (
    <div
      className={
        "px-4 sm:px-0 container mx-auto mt-6 pt-2 pb-8 text-sm text-slate-400 font-sans"
      }
    >
      <div className={"grid xs:grid-cols-1 md:grid-cols-3 gap-6"}>
        <div className="space-y-2"><h4 className="font-serif text-balance text-lg">Fortezze AI. Come i data center stanno diventando le nuove fortezze dell'intelligenza artificiale.</h4>
          <p>Lorem ipsum</p></div>

        <p>
          Un progetto di <a className="text-indigo-950 hover:text-blue:400 transition-colors" href="https://www.nina.watch/">www.nina.watch</a>
        </p>
        <p>
          <a href="https://www.instagram.com/n.i.n.a_watch/">@n.i.n.a_watch</a>
        </p>
      </div>
    </div>
  );
}

export default Footer;
