function Intro() {
  return (
    <div className="w-full bg-indigo-200">
      <div className="container px-4 sm:px-0 mx-auto py-14 font-serif text-xl hyphens-auto sm:flex gap-6 items-center">
        <div className="w-full sm:w-2/3">
          <p className="mb-6 text-2xl text-indigo-950">
            "Fortezze AI" raccoglie i progetti in via di valutazione e
            costruzione dei nuovi data center nei dintorni di Milano.
            Questi data center hanno svariati usi, ma nascono
            prevalentemente dalla necessità di computazione per favorire
            l'adozione di modelli di intelligenza artificiale.
          </p>
          <h3 className="text-3xl mt-7 mb-4">Come abbiamo raccolto i dati</h3>
          <p>
            Per costruire questa mappatura, stiamo raccogliendo tutti i
            progetti pubblicamente disponibili sul sito del Ministero
            dell'Ambiente e della Sicurezza Energetica, letto i documenti
            e estrapolato le informazioni sulle aree del territorio che
            verranno impattate da questi progetti.
          </p>
          <p>
            Sul{" "}
            <a href="https://va.mite.gov.it/it-IT/Ricerca/">portale</a>,
            cercando con la parola chiave "data center" e "datacenter", è
            possibile trovare una trentina di progetti attualmente in
            valutazione, in opera o in valutazione di ottemperanza.
          </p>
        </div>
        <div className="w-full sm:w-1/3">
          <img src="cover-2.png" className="w-fit" />
        </div>
      </div>
    </div>
  );
}

export default Intro;
