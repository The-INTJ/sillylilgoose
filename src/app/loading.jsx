import styles from '@/styles/pages/loading.module.scss'

const loading = (props) => {
    
    return (
        <div className={styles.loading}>
            <p>Here's some candy while you wait</p>
        </div>
    )
}

export default loading;