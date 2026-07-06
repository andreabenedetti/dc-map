import { Field, Select, Label } from "@headlessui/react";

function Dropdown({ list, search, label, value, onChange }) {
  const distinctValues = new Set();

  list.forEach((item) => {
    distinctValues.add(item[search]);
  });
  let options = Array.from(distinctValues);

  return (
    <Field className={"space-x-2"}>
      <Label className={"text-sm text-mauve-400"}>{label}</Label>
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={
          "px-2.5 py-2 border border-solid border-mauve-300 rounded-sm"
        }
      >
        <option>Seleziona un'azienda</option>
        {/* onChange permette di aggiornare il valore, e.target.value indica QUALE valore aggiornare */}
        {options.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </Select>
    </Field>
  );
}

export default Dropdown;
