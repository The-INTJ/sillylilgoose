'use client'
import Frog from "@/components/Frog";
import styles from "@/styles/pages/frog/Frog.module.scss";
import { getTitle } from "@lib/functions";
import { useState, useEffect } from "react";


const FrogPage = () => {

  const [title, setTitle] = useState('Loading...');
  const [numFrogs, setNumFrogs] = useState(1);

  function getFrogs() {
    let frogArray = [];
    for (let index = 0; index < numFrogs; index++) {
      frogArray.push(<Frog 
        activateTongue={true}
        orientation={Math.random()}
        moves={Math.random() > 0.5} />);
    }
    return frogArray;
  }

  async function getServerData() {
    const _title = await getTitle('frog');
    setTitle(_title);
  }

  useEffect(() => {
    getServerData();
  }, [])

  return (
    <div className={styles.main}>
      <h1>{title}</h1>
      <button className={styles.frogContainer} onClick={() => setNumFrogs(numFrogs + 1)}>
        <Frog />
        {getFrogs()}
      </button>
    </div>
  )
}

export default FrogPage;