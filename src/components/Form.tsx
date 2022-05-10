import { Sub } from '../types.d';
import useNewSubForm from '../hook/useNewSubForm';

// interface FormState {
//   nick : string
//   subMonths: number
//   avatar: string
//   description: string
// }

interface FormProps {
  // onNewSub:  React.Dispatch<React.SetStateAction<Sub[]>> //para no usar useState que viene del padre:
  onNewSub: (newSub:Sub) => void;
}

const Form = ({ onNewSub }: FormProps) => {

  // const [inputValues, setInputValues] = useState<FormState['inputValues']>(INITIAL_STATE);

  // const [inputValues, dispatch] = useReducer(formReducer, INITIAL_STATE);
  const [inputValues, dispatch] = useNewSubForm()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    dispatch({
      type: "change_value",
      payload: {
        inputName: name,
        inputValue: value
      }
    });

    // setInputValues({ //ahora con reducer 
    //   ...inputValues,
    //   [e.target.name] : e.target.value
    // });
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // onNewSub(subs => ([...subs, inputValues])); segun la linea16 =>
    onNewSub(inputValues); //el input value es de tipo Sub
    // handleClear();
    dispatch({type: 'clear'});
  }

  const handleClear = () => {
    // setInputValues(INITIAL_STATE); //con reducer:
    dispatch({type: 'clear'})

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

        <button type='submit'>Save new sub!</button>
        <button type='button' onClick={handleClear}>Clear the form</button>
      </form>
    </div>
  )
}

export default Form;