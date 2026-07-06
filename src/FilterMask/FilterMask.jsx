import Dropdown from "../Dropdown/Dropdown";

function FilterMask({ list, filterA, labelA, filterB, labelB }) {
  return (
    <div className={"mb-4 flex space-x-2"}>
      <Dropdown list={list} filter={filterA} label={labelA} />
      <Dropdown list={list} filter={filterB} label={labelB} />
    </div>
  );
}

export default FilterMask;
