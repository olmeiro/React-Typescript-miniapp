import React from 'react'

interface Props {
  subs: Array<{
    nick: string
    avatar: string
    subMonths: number
    description?: string
  }>
}

const Lists2: React.FunctionComponent<Props> = ({subs}) => {


  //de tener un renderAlgo de seguro mejor tenemos un componente:

  const renderList = (): JSX.Element[] => {
    return subs.map((sub) => {
      return (<li key={sub.nick}>
        <img src={sub.avatar} alt={`Avatar for ${sub.nick}`} />
        <h4>
          {sub.nick} (<small>{sub.subMonths}</small>)
        </h4>
        <p>{sub.description?.substring(0, 100)}</p>
      </li>)
    })
  }

   
  return (
    <ul>
     {renderList()}
    </ul>
  )
}

export default Lists2;
