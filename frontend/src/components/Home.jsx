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
    member1: '',
    member2: '',
    member3: '',
    member4: '',
    userEmail: '',
  });

  const [responseTime, setResponseTime] = useState('');
  const [responseTeamName, setResponseTeamName] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/v1/register', formData);
      console.log('Response from backend:', response.data);

      setResponseTime(`Your time is ${response.data.timestamp}`);
      setResponseTeamName(`Thank you for registering ${response.data.teamName}!`);
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
              {!responseTeamName ? (
                <div className="response-message">
                    <h1>Thank you for registering!</h1>
                    <h3>{responseTeamName}</h3>
                    <p>{responseTime}</p>
                </div>
              ) : (

            <form method="POST" onSubmit={handleSubmit}>
              <img src={codexLight} alt="vector art" />
              <h2>Register yourself!</h2>
              <div className="input-div one">
                <div className="icon">
                  <RiTeamLine />
                </div>
                <div className="details">
                  <label htmlFor="teamName">Team Name</label>
                  <input type="text" className="input" id="teamName" name="teamName" onChange={handleChange} required />
                </div>
              </div>
              <div className="input-div one">
                <div className="icon">
                  <BsFillPersonLinesFill />
                </div>
                <div className="details">
                  <label htmlFor="member1">Member One</label>
                  <input type="text" className="input" id="member1" name="member1" onChange={handleChange} required />
                </div>
              </div>
              <div className="input-div one">
                <div className="icon">
                  <BsFillPersonLinesFill />
                </div>
                <div className="details">
                  <label htmlFor="member2">Member two</label>
                  <input type="text" className="input" id="member2" name="member2" onChange={handleChange} required />
                </div>
              </div>
              <div className="input-div one">
                <div className="icon">
                  <BsFillPersonLinesFill />
                </div>
                <div className="details">
                  <label htmlFor="member3">Member three</label>
                  <input type="text" className="input" id="member3" name="member3" onChange={handleChange} />
                </div>
              </div>
              <div className="input-div one">
                <div className="icon">
                  <BsFillPersonLinesFill />
                </div>
                <div className="details">
                  <label htmlFor="member4">Member four</label>
                  <input type="text" className="input" id="member4" name="member4" onChange={handleChange} />
                </div>
              </div>
              <div className="input-div one">
                <div className="icon">
                  <HiOutlineMail />
                </div>
                <div className="details">
                  <label htmlFor="userEmail">Email of any member</label>
                  <input type="email" className="input" id="userEmail" name="userEmail" onChange={handleChange} required />
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
              )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
