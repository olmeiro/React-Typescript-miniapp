import {useState} from 'react';
import { Sub } from '../types.d';

// interface FormState {
//   nick : string
//   subMonths: number
//   avatar: string
//   description: string
// }
interface FormState {
 inputValues: Sub
}

interface FormProps {
  // onNewSub:  React.Dispatch<React.SetStateAction<Sub[]>> //para no usar useState que viene del padre:
  onNewSub: (newSub:Sub) => void;
}

const Form = ({ onNewSub }: FormProps) => {

  const [inputValues, setInputValues] = useState<FormState['inputValues']>({
    nick: '',
    subMonths: 0,
    avatar: '',
    description: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputValues({
      ...inputValues,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // onNewSub(subs => ([...subs, inputValues])); segun la linea16 =>
    onNewSub(inputValues); //el input value es de tipo Sub
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* <input onChange={evt => {
           setInputValues({
            ...inputValues,
            [evt.target.name] : evt.target.value
          })
        }} value={inputValues.nick} type='text' name='nick' placeholder='nick' /> */}
        <input onChange={handleChange} value={inputValues.nick} type='text' name='nick' placeholder='nick' />
        <input onChange={handleChange} value={inputValues.subMonths} type='number' name='subMonths' placeholder='subMonths' />
        <input onChange={handleChange} value={inputValues.avatar} type='text' name='avatar' placeholder='avatar' />
        <textarea onChange={handleChange} value={inputValues.description} name='description' placeholder='description' />

        <button>Save new sub!</button>
      </form>
    </div>
  )
}

export default Form;