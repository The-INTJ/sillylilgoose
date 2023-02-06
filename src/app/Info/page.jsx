import Frog from "@/components/Frog";
import RevealText from "@/components/RevealText";
import styles from "../../styles/pages/Info.module.scss";


const Info = (props) => {
  return (
    <div className={styles.main}>
      <h1>le ~plan~</h1>
      <RevealText
        activateText={true}
        text='Details: the relevant details' />
      <Frog 
        activateTongue={true} />
    </div>
  )
}

export default Info;