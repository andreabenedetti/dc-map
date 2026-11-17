import { EnvelopeIcon } from "@phosphor-icons/react/dist/ssr";


function Hero() {
  return (
    <div
      className={
        "container min-w-full px-4 sm:px-40 py-20 items-center justify-center space-y-3 bg-blue-50"
      }
    >
      <img src="img-2.png" className="w-70 h-auto max-w-full mx-auto" />
      <h3 className={"font-serif text-2xl text-slate-800 text-center"}>
        Partecipa alla mappatura
      </h3>
      <p className={"text-sans text-base text-slate-800 text-center"}>
        Così come N.i.n.a. non è un'isola, ma un'infrastruttura a disposizione
        di chi lotta, questa mappatura è pensata per essere utilizzata da
        chiunque ne abbia bisogno.
      </p>
      <p className={"text-sans text-base text-slate-800 text-center"}>
        Se fai parte di un collettivo ecologista, di un sindacato, di un
        gruppo di ricerca studentesco, o se sei semplicemente un cittadino o
        una cittadina che vuole opporsi a questa colonizzazione tecnologica
        sul proprio territorio, vogliamo unire le forze con te. Tutto può
        essere bene comune, dai dati ai territori, e solo collettivamente
        possiamo difenderli.
      </p>
      <div
        className={
          "w-fit mx-auto flex items-center gap-2 bg-indigo-100 px-4 py-2 transition-all hover:bg-blue-200 hover:text-blue-500"
        }
      >
        <EnvelopeIcon size={18} />{" "}
        <a href="mailto:info@nina.watch">Contattaci via mail</a>
      </div>
    </div>
  );
}

export default Hero;
