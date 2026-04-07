'use client'
import Frog from "@/components/Frog";
import RevealText from "@/components/RevealText";
import styles from "@/styles/pages/info/Info.module.scss";
import { getInfo, getTitle } from "@lib/functions";
import { useCachedData } from "@lib/hooks";

const getServerData = async () => {
  const info = await getInfo();
  const title = await getTitle();
  return { info, title };
};

const Info = () => {
  const data = useCachedData('infoData', getServerData);
  const info = data?.info ?? null;
  const title = data?.title ?? 'Loading...';

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