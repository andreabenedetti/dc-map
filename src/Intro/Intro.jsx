function Intro() {
  return (
    <div className="w-full bg-indigo-200">
      <div className="container px-4 sm:px-0 mx-auto py-14 text-lg hyphens-auto sm:flex gap-6 items-center space-y-4">
        <div className="w-full sm:w-2/3 space-y-4">
          <p>
            L'Intelligenza Artificiale ci viene venduta come una magia immateriale, una “nuvola” neutra e priva di peso. Questa è l'illusione fondante del tecno-capitalismo. Ma la realtà è ben diversa: l'IA è un'infrastruttura fisica, pesante ed estremamente vorace. È una catena di montaggio globale che consuma suolo, prosciuga riserve idriche e divora energia. E il modo in cui verrà sviluppata in questi mesi plasmerà la società in cui vivremo per decenni.</p>
          <p>
            Come dimostrano le prime storiche manifestazioni di questi giorni contro l'insediamento dei data center in Lombardia – vere e proprie opere di colonizzazione territoriale che consumano quanto 500.000 famiglie, restituendo in cambio pochissima occupazione e zero know-how locale – il conflitto non è più solo digitale. L'estrattivismo algoritmico ha un impatto materiale e violento sui nostri territori, sull'ambiente e sulle risorse comuni.
          </p>
          <h3 className="text-3xl mt-7 mb-4 font-serif">Perché una mappatura?</h3>
          <p>Il tempo della diagnosi è finito. Non si può negoziare con un potere che rimane invisibile. Come N.i.n.a. (Né Intelligente Né Artificiale), stiamo conducendo una mappatura indipendente dei sistemi estrattivi e dei data center sul territorio: vogliamo comprendere come si sviluppa l'intelligenza artificiale e l'infrastruttura tecnologica alla sua base, per capire come poterle rendere contendibili e collettive.</p>
          <p>Mappare l'hardware del tecno-capitalismo, i suoi consumi e le sue reti significa infatti fornire alla società civile, ai sindacati e ai movimenti per la giustizia climatica le coordinate esatte per difendersi, organizzare il dissenso e immaginare alternative di sovranità tecnologica dal basso.</p>
        </div>
        <div className="w-full sm:w-1/3">
          <img src="cover-3.png" className="w-fit" />
        </div>
      </div>
      <div className="container px-4 sm:px-0 mx-auto py-14 text-lg hyphens-auto sm:flex gap-6 items-center">
        <div className="w-full sm:w-2/3 space-y-4">
          <h3 className="text-3xl mt-7 mb-4 font-serif">Come abbiamo raccolto i dati</h3>
          <p>
            Per costruire questa mappatura, stiamo raccogliendo tutti i progetti pubblicamente disponibili sul sito del <a href="https://va.mite.gov.it/it-IT/Ricerca/Via" target="">Ministero dell'Ambiente e della Sicurezza Energetica</a>, letto i documenti e estrapolato le informazioni sulle aree del territorio che verranno impattate da questi progetti.
          </p>
          <p>
            Sul portale, con la parola chiave “data center” e “datacenter”, vengono restituiti 44 progetti rilevanti in Lombardia: questi progetti riguardano <b>nuovi data center, espansioni di data center esistenti, la costruzione di gruppi energetici aggiuntivi, e la costruzione di pozzi per il trattamento delle acque.</b>
          </p>
          <p>
            I progetti presentano molti documenti di descrizione del progetto, dagli studi di fattibilità, agli impatti ambientali, fino alle planimetrie dei data centers. Abbiamo ridisegnato le aree geografiche interessate su Google Earth e compilato tutte le aree in un unico file geografico che ci permettesse di avere una visione d'insieme.
          </p>
          <p>Siamo interessatə ad approfondire:</p>
          <ul className="list-disc list-inside">
            <li>Altri casi non rappresentati sul sito del Ministero;</li>
            <li>I dettagli delle aziende che propongono i progetti di costruzione dei data center, dalla loro provenienza ai dettagli economici che le sostengono;</li>
            <li>La potenza energetica che i progetti richiedono di avere, e come verrà soddisfatto questo fabbisogno;</li>
            <li>Come la popolazione può intervenire, partecipare e dissentire nei processi decisionali di approvazione dei progetti.</li></ul>
        </div>
      </div>
    </div>
  );
}

export default Intro;
