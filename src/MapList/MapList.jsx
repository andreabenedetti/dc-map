import { Button } from "@headlessui/react";
import Card from "../Card/Card";
import Dropdown from "../Dropdown/Dropdown";
import { useState } from "react";

function MapList({ data }) {
  const [proposer, setProposer] = useState();

  const filteredList = proposer
    ? data.filter((item) => item.proposer === proposer)
    : data;

  console.log(filteredList);

  return (
    <>
      <div
        className={
          "flex container mx-auto pt-3 pb-1 px-4 sm:px-0 sticky top-9.25 bg-white justify-center align-middle flex-wrap space-y-2 sm:space-y-0"
        }
      >
        <Dropdown
          list={data}
          search={"proposer"}
          label={"Azienda proprietaria"}
          value={proposer}
          onChange={setProposer}
        />
        <Button
          onClick={() => setProposer("")}
          className={
            "px-3 bg-mauve-300 rounded-sm text-sm hover:cursor-pointer hover:bg-mauve-200 transition-all w-full sm:w-auto"
          }
        >
          {/* onClick setProposer("") resetta lo stato di useState, e resetta il filtro */}
          Vedi tutti
        </Button>
      </div>
      <div className={"container mx-auto mt-8 mb-8"}>
        <div
          className={
            "px-4 grid grid-cols-1 gap-4 sm:px-0 sm:grid-cols-2 sm:gap-8"
          }
        >
          {filteredList.map((item, index) => (
            <Card
              key={index}
              name={item.name}
              label={item.label}
              status={item.procedure}
              company={item.proposer}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default MapList;
