import React from 'react'
import { Sub } from '../types.d';

interface Props {
  subs: Array<Sub>
}
// interface Props {
//   subs: Array<{
//     nick: string
//     avatar: string
//     subMonths: number
//     description?: string
//   }>
// }

export const Lists = ({subs}: Props) => {
// export const Lists = (props: Props) => {
//   const { subs } = props;
  return (
    <ul>
      {subs.map((sub) => {
            return (
              <li key={sub.nick}>
                <img src={sub.avatar} alt={`Avatar for ${sub.nick}`} />
                <h4>
                  {sub.nick} (<small>{sub.subMonths}</small>)
                </h4>
                <p>{sub.description?.substring(0,100)}</p>
              </li>
            );
          })}
    </ul>
  )
}
