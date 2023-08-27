import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/homeStyles.css';
import { BsFillPersonLinesFill } from 'react-icons/bs';
import { RiUserAddLine } from 'react-icons/ri'
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
    members: [
        { name: '' },
        { name: '' },
    ],
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

  const handleChange = (event, category, index) => {
    const { name, value } = event.target;
    const updatedCategory = [...formData[category]]
    updatedCategory[index][name] = value;
    setFormData((prevData) => ({
      ...prevData,
      [category]: updatedCategory,
    }));
  };

  const handleAddMember = () => {
    if (formData.members.length < 4) {
      setFormData((prevData) => ({
        ...prevData,
        members: [...prevData.members, { name: '' }],
      }));
    }
  };

  return (
    <div id="home">
      <div className="parent-container">
        <div className="container">
          <div className="image">
            <img src={peopleVectorArt} alt="vector art" />
          </div>
          <div className="information">
              {responseTeamName ? (
                <div className="response-message">
                    <h1>{responseTeamName}!</h1>
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
                    <input type="text" className="input" id="teamName" name="teamName" onChange={(e) => handleChange(e, 'teamName')} required />
                </div>
              </div>
              {formData.members.map((member, index) => (
                <div className="input-div one" key={index}>
                  <div className="icon">
                    <BsFillPersonLinesFill />
                  </div>
                  <div className="details">
                    <label htmlFor={`member${index + 1}`}> Member {index + 1}</label>
                    <input
                      type="text"
                      className="input"
                      id={`member${index + 1}`}
                      name={`member${index + 1}`}
                      onChange={(e) => handleChange(e, 'members', index)}
                      required
                    />
                  </div>
                </div>
              ))}
              {formData.members.length < 4 && (
                <div className="add-member"> 
                    <button type="button" onClick={handleAddMember}><RiUserAddLine /></button>
                </div>
              )}
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
