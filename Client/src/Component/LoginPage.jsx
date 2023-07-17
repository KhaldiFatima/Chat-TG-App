function LoginPage() {
  return (
    <>
      <div className='join-container'>
        <header className='join-header'>
          <h1>
            <i className='fa-brands fa-node-js'></i> Chat TG
          </h1>
        </header>
        <main className='join-main'>
          <form action='/chatpage'>
            <div className='form-control'>
              <label htmlFor='username'>User name</label>
              <input
                type='text'
                name='username'
                id='username'
                placeholder='Enter username...'
                required
              />
            </div>
            <div className='form-control'>
              <label htmlFor='room'>Room</label>
              <select name='room' id='room'>
                <option value='Academy TG Team'>Academy TG Team</option>
                <option value='Heroes Team'>Heroes Team </option>
                <option value='اللجنةالأولى'>اللجنة الأولى </option>
                <option value='اللجنة الثانية '>اللجنة الثانية </option>
                <option value='اللجنة الثالثة'>اللجنة الثالثة</option>
              </select>
            </div>
            <button type='submit' className='btn'>
              Join Chat
            </button>
          </form>
        </main>
      </div>
    </>
  );
}

export default LoginPage;
