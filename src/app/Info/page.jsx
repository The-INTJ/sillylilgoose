'use client'
import Frog from "@/components/Frog/Frog";
import RevealText from "@/components/RevealText";
import styles from "@/styles/pages/Info.module.scss";
import { getInfo, getTitle } from "@lib/functions";
import { useState, useEffect } from "react";


const Info = (props) => {

  const [info, setInfo] = useState(null);
  const [title, setTitle] = useState('Loading...');

  async function getServerData() {
    const _info = await getInfo();
    const _title = await getTitle();
    setInfo(_info);
    setTitle(_title);
  }

  useEffect(() => {
    getServerData();
  }, [])

  return (
    <div className={styles.main}>
      <h1>{title}</h1>

      {info ? Object.entries(info).map((text, index) => {
        let textArr = text.toString().split(',');
        return <RevealText
          key={index}
          activateText={true}
          labelText={textArr[0]}
          descText={textArr[1]} />
      }) : <p>looooooading...</p>}
      
      <Frog 
        activateTongue={true} />
    </div>
  )
}

export default Info;