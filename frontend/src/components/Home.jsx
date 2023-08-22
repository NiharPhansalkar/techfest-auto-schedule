import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/homeStyles.css';
import { BsFillPersonLinesFill } from 'react-icons/bs';
import { HiOutlineMail } from 'react-icons/hi';
import { RiTeamLine } from 'react-icons/ri';
import codexLight from '../assets/codex_light.png';
import peopleVectorArt from '../assets/people_vector.svg';

function Home() {
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

  const [formData, setFormData] = useState({
    teamName: '',
    memberOne: '',
    memberTwo: '',
    memberThree: '',
    memberFour: '',
    userEmail: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/v1/register', formData);
      console.log('Response from backend:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div id="home">
      <div className="parent-container">
        <div className="container">
          <div className="image">
            <img src={peopleVectorArt} alt="vector art" />
          </div>
          <div className="information">
            <form method="POST" onSubmit={handleSubmit}>
              <img src={codexLight} alt="vector art" />
              <h2>Register yourself!</h2>
              <div className="input-div one">
                <div className="icon">
                  <RiTeamLine />
                </div>
                <div className="details">
                  <h5>Team Name</h5>
                  <input type="text" className="input" id="team-name" name="team-name" onChange={handleChange} required />
                </div>
              </div>
              <div className="input-div one">
                <div className="icon">
                  <BsFillPersonLinesFill />
                </div>
                <div className="details">
                  <h5>Member One</h5>
                  <input type="text" className="input" id="member-one" name="member-one" onChange={handleChange} required />
                </div>
              </div>
              <div className="input-div one">
                <div className="icon">
                  <BsFillPersonLinesFill />
                </div>
                <div className="details">
                  <h5>Member two</h5>
                  <input type="text" className="input" id="member-two" name="member-two" onChange={handleChange} required />
                </div>
              </div>
              <div className="input-div one">
                <div className="icon">
                  <BsFillPersonLinesFill />
                </div>
                <div className="details">
                  <h5>Member three</h5>
                  <input type="text" className="input" id="member-three" name="member-three" onChange={handleChange} />
                </div>
              </div>
              <div className="input-div one">
                <div className="icon">
                  <BsFillPersonLinesFill />
                </div>
                <div className="details">
                  <h5>Member four</h5>
                  <input type="text" className="input" id="member-four" name="member-four" onChange={handleChange} />
                </div>
              </div>
              <div className="input-div one">
                <div className="icon">
                  <HiOutlineMail />
                </div>
                <div className="details">
                  <h5>Email of any member</h5>
                  <input type="email" className="input" id="user-email" name="user-email" onChange={handleChange} required />
                </div>
              </div>
              <button className="glowing-btn" type="submit">
                <span className="glowing-txt">
                  REG
                  <span className="faulty-letter">I</span>
                  STER
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
