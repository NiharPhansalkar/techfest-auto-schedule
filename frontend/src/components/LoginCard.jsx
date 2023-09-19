import React, { useEffect } from 'react';
import { BsFillPersonLinesFill } from 'react-icons/bs';
import { MdPassword } from 'react-icons/md';
import codexLight from '../assets/codex_light.png';

function LoginCard() {
  useEffect(() => {
    function addFocusClass(event) {
      const parent = event.target.parentNode.parentNode;
      parent.classList.add('focus');
    }

    function removeFocusClass(event) {
      const parent = event.target.parentNode.parentNode;
      if (event.target.value === '') {
        parent.classList.remove('focus');
      }
    }

    document.querySelectorAll('.input').forEach((input) => {
      input.addEventListener('focus', addFocusClass);
      input.addEventListener('blur', removeFocusClass);

      return () => {
        input.removeEventListener('focus', addFocusClass);
        input.removeEventListener('blur', removeFocusClass);
      };
    });
  }, []);

  return (
    <form method="POST">
      <img src={codexLight} alt="codex logo" />
      <h2>Login</h2>
      <div className="input-div">
        <div className="icon">
          <BsFillPersonLinesFill />
        </div>
        <div className="details">
          <label htmlFor="username">Username</label>
          <input type="text" className="input" id="username" name="username" required />
        </div>
      </div>
      <div className="input-div">
        <div className="icon">
          <MdPassword />
        </div>
        <div className="details">
          <label htmlFor="password">Password</label>
          <input type="password" className="input" id="password" name="password" required />
        </div>
      </div>
      <button className="glowing-btn" type="submit">
        <span className="glowing-txt">
          LO
          <span className="faulty-letter">G</span>
          IN
        </span>
      </button>
    </form> 
  );
}

export default LoginCard;
