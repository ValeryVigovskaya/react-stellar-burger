import { useState, SyntheticEvent} from "react";


export function useForm<T>(inputValues:T) {
    const [values, setValues] = useState<T>(inputValues);
  
    const handleChange = (event: SyntheticEvent<HTMLInputElement>) => {
      const {value, name} = event.target as HTMLInputElement;
      setValues({...values, [name]: value});
    };
    return {values, handleChange, setValues};
  }