import { useState } from "react";

export default function useFormInput(initValue) {
  const [value, setValue] = useState(initValue);

  function onChange(e) {
    setValue(e.target.value);
  }

  return { value, onChange };
}
