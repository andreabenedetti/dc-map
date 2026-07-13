function Intro() {
  return (
    <div className="w-full bg-indigo-200">
      <div className="container px-4 sm:px-0 mx-auto py-14 text-lg hyphens-auto sm:flex gap-6 items-center space-y-4">
        <div className="w-full sm:w-2/3 space-y-4">
          <p className="mb-6 text-2xl text-indigo-950 font-serif">
            "Fortezze AI" raccoglie i progetti in via di valutazione e
            costruzione dei nuovi data center nei dintorni di Milano.
            Questi data center hanno svariati usi, ma nascono
            prevalentemente dalla necessità di computazione per favorire
            l'adozione di modelli di intelligenza artificiale.
          </p>
          <h3 className="text-3xl mt-7 mb-4 font-serif">Perché una mappatura?</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <h3 className="text-3xl mt-7 mb-4 font-serif">Come attivarsi?</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
        <div className="w-full sm:w-1/3">
          <img src="cover-3.png" className="w-fit" />
        </div>
      </div>
      <div className="container px-4 sm:px-0 mx-auto py-14 text-lg hyphens-auto sm:flex gap-6 items-center">
        <div className="w-full sm:w-2/3 space-y-4">
          <h3 className="text-3xl mt-7 mb-4 font-serif">Come abbiamo raccolto i dati</h3>
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
          <p>
            I progetti presentano molti documenti di descrizione del progetto, dagli studi di fattibilità, agli impatti ambientali, fino alle planimetrie dei data centers. Abbiamo ridisegnato le aree geografiche interessate su Google Earth e compilato tutte le aree in un unico file geografico che ci permettesse di avere una visione d'insieme.
          </p>
          <p>Siamo interessatə ad approfondire:</p>
          <ul className="list-decimal">
            <li>I dettagli delle aziende che propongono i progetti di costruzione dei data center, dalla loro provenienza ai dettagli economici che le sostengono;</li>
            <li>La potenza energetica che i progetti richiedono di avere, e come verrà soddisfatto questo fabbisogno;</li>
            <li>Come la popolazione può intervenire, partecipare e dissentire nei processi decisionali di approvazione dei progetti.</li></ul>
        </div>
      </div>
    </div>
  );
}

export default Intro;
