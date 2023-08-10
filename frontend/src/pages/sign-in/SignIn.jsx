function SignIn() {
  return (
    <div className="sign-in">
      <form action="" className="form-container">
        <label htmlFor="email">
          E-mail
          <input type="email" id="email" />
        </label>
        <label htmlFor="password">
          Password
          <input type="password" id="password" />
        </label>
        <div className="submit-button-container">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
