import styles from '@/styles/foundational/loading.module.scss'

const loading = (props) => {
    
    return (
        <div className={styles.loading}>
            <p>Here's some candy while you wait</p>
        </div>
    )
}

export default loading;