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
          "flex container mx-auto py-3 sticky top-9.25 bg-white justify-center"
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
            "p-1.5 px-3 bg-mauve-300 rounded-sm text-sm hover:cursor-pointer hover:bg-mauve-200 transition-all"
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
