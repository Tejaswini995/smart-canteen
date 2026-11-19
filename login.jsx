function Login() {
  function handleLogin() {
    alert("Button is working!");
  }

  return (
    <div>
      <h1>Online Shopping</h1>
      <h2>Login</h2>

      <input type="email" placeholder="Enter email" />
      <br /><br />

      <input type="password" placeholder="Enter password" />
      <br /><br />

      <button onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default Login;