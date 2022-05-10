import { appendFile } from "fs";
import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import Form from "./components/Form";
import { Lists } from './components/Lists';
// import Lists2 from './components/Lists2';
import { Sub, SubsResponseFromApi } from './types.d';

interface AppState {
  subs: Array<Sub>
  newSubsNumber: number
}

// const INITIALSTATE = [
//   {
//       nick: "dapelu",
//       subMonths: 3,
//       avatar: "https://i.pravatar.cc/150?u=dapelu",
//       description: "Dapelu hace de moredaror a veces",
//     },
//     {
//       nick: "Sergio Serrano",
//       subMonths: 5,
//       avatar: "https://i.pravatar.cc/150?u=sergio_serrano",
//     }
// ];

// Veamos el contrato de la api
// const respAPI : [{
//   'nick': 'Madigans',
//   'months': 3,
//   'profileUrl': 'https://algo.com',
//   'description': 'Madigans es mid-senior en Troll'
// }]; //difiere de la app

function App() {
  const [subs, setSubs] = useState<Array<Sub>>([]);
  // const [subs, setSubs] = useState<AppState["subs"]>([]);

  const [newSubsNumber, setNewSubsNumber] = useState<AppState["newSubsNumber"]>(0);

  const divRef = useRef<HTMLDivElement>(null); //iniciarlo con null

  useEffect(() => {
  //  setSubs(INITIALSTATE);

    // const fetchSubs = (): Promise<any> => {
    const fetchSubs = (): Promise<SubsResponseFromApi[]> => {
      return fetch('http://localhost:3001/subs')
              .then(res => res.json())
    }

    //map las props que necesitamos de la api para que coincidan con nuestra app =>
    const mapFromApiToSubs = (apiResponse: SubsResponseFromApi):Array<Sub> => {
        return apiResponse.map( subFromApi => {
          const {
            months: subMonths,
            profileUrl: avatar,
            nick,
            description
          } = subFromApi;

          return {
            nick,
            avatar,
            subMonths,
            description,
          }
        })
    }

    // fetch('http://localhost:3001/subs')
    // fetchSubs()
    // .then(res => res.json())
    //   .then(subs => {
    //     console.log( subs );
    //     setSubs(subs);
    //   })

    //Uso mapFromApiToSubs =>
    // fetchSubs()
    //   .then(apiSubs => {
    //     const subs = mapFromApiToSubs(apiSubs);
    //     setSubs(subs);
    //   });

      //de forma funcional:
      fetchSubs()
        .then(mapFromApiToSubs)
        .then(setSubs);
  }, []);

  const handleNewSub = (newSub: Sub):void => {
    setSubs(subs => [...subs, newSub]);
    setNewSubsNumber(n => n + 1);
  }

  return (
    <>
      <div className="App" ref={divRef}>
        <h1>midu Subs:</h1>
       <Lists subs={subs}/>
       {/* <Lists2 subs={subs} /> */}
       {/* <Form onNewSub={setSubs}/> es mejor evitar pasar useState hacia abajo*/}
       New Subs: {newSubsNumber}
       <Form onNewSub={handleNewSub}/>
      </div>
    </>
  );
}

export default App;
