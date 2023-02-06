const Login = (props)  => {
    return (
        <div>
            <h1>Login</h1>
            <div>
                <input type='text' />
                <input type='password' />
                <button onClick={() => props.setLoggedIn()}>LOGIN</button>
                <p>{props.loggedIn}</p>
            </div>
        </div>
    )
}

export default Login;