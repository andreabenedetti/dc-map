import StaticMap from "../Map/StaticMap";

function Card({ key, name, map, status, company, label }) {
  return (
    <div className={"flex gap-4"} key={key}>
      <div className={"w-1/3 sm:w-1/4"}>
        <StaticMap name={name} className={"rounded-t-md mb-2"} />
      </div>
      <div className={"w-2/3 sm:w-3/4"}>
        <h2 className={"text-xl font-display font-semibold"}>{label}</h2>
        <div className={" mt-1 pt-1 capitalize"}>
          <p className={"text-xs font-bold text-rose-600 "}>azienda</p>
          <p>{company}</p>
        </div>
        <div className={"mt-1 pt-1 "}>
          <p className={"text-xs font-bold text-rose-600"}>Stato</p>
          <p>{status}</p>
        </div>
        <div className={"mt-1 pt-1"}>
          <p className={"text-xs font-bold text-rose-600"}>
            Titolo del progetto
          </p>
          <p>{name}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
