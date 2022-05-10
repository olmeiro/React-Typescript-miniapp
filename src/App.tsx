import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import Form from "./components/Form";
import { Lists } from './components/Lists';
// import Lists2 from './components/Lists2';
import { Sub } from './types.d';

interface AppState {
  subs: Array<Sub>
  newSubsNumber: number
}

const INITIALSTATE = [
  {
      nick: "dapelu",
      subMonths: 3,
      avatar: "https://i.pravatar.cc/150?u=dapelu",
      description: "Dapelu hace de moredaror a veces",
    },
    {
      nick: "Sergio Serrano",
      subMonths: 5,
      avatar: "https://i.pravatar.cc/150?u=sergio_serrano",
    }
];

function App() {
  // const [subs, setSubs] = useState<Array<Sub>>([]);
  const [subs, setSubs] = useState<AppState["subs"]>([]);
  // const [newSubsNumber, setNewSubsNumber] = useState<AppState["newSubsNumber"]>(0);

  const divRef = useRef<HTMLDivElement>(null); //iniciarlo con null

  useEffect(() => {
   setSubs(INITIALSTATE);
  }, []);

  const handleNewSub = (newSub: Sub):void => {
    setSubs(subs => [...subs, newSub]);
  }

  return (
    <>
      <div className="App" ref={divRef}>
        <h1>midu Subs:</h1>
       <Lists subs={subs}/>
       {/* <Lists2 subs={subs} /> */}
       {/* <Form onNewSub={setSubs}/> es mejor evitar pasar useState hacia abajo*/}
       <Form onNewSub={handleNewSub}/>
      </div>
    </>
  );
}

export default App;
