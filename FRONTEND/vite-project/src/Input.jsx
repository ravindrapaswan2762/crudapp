import { Input } from "@/components/ui/input"
import { useState } from "react";

export function InputField({ val, className, ...props }) {

  const [documentNo, setDocumentNo] = useState(val);

  const handleChange = (event) => {
    setDocumentNo(event.target.value);
  };

  return <Input onChange={(event)=>handleChange(event)} value={documentNo} type="text" className={className} {...props} />
}
