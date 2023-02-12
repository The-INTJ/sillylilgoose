import styles from '@/styles/pages/Login.module.scss'

const Login = (props) => {
    function checkInput(e) {
        if (e.target.value.toLowerCase() === 'frog10') {
            props.setLoggedIn(true);
        }
    }
    return (
        <div className={styles.loginContainer}>
            <h1>Login</h1>
            <input type='password' onInput={(e) => checkInput(e)} />
            <p>Favorite animal and our aniversay (just the day)</p>
        </div>
    )
}

export default Login;