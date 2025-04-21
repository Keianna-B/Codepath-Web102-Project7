import React, { useState, useEffect } from "react";
import './App.css';
import { useParams, Route, Routes, useNavigate } from "react-router-dom";
import Navbar from './components/navbar';
import Crewmates from './components/crewmates';
import { createClient } from '@supabase/supabase-js';
import { supabase } from './client.jsx';

function App() {
  const [crewmates, setCrewmates] = useState([]);
  const [name, setName] = useState("");
  //const [level, setLevel] = useState(""); 
  //const [role, setRole] = useState("");
  const [color, setColor] = useState("");
  const [hat, setHat] = useState("");
  const [pet, setPet] = useState("");
  const [selectedCrewmate, setSelectedCrewmate] = useState(null);
  
  const colorOptions = ["Red", "Blue", "Green", "Pink", "Orange", "Yellow", "Black", "White", "Purple", "Brown", "Cyan", "Lime", "Maroon", "Rose", "Banana", "Gray","Tan", "Coral"];
  const hatOptions = ["None", "Crown", "It's Called Fashion", "Bird That Carries Crew", "Beanie", "Witch One", "If I Fits I Sits", "I'm the Star"];
  const petOptions = ["None", "A Goose", "Bedcrab", "Boneshaker", "Breb", "Bränt", "Chewie", "Clank", "Creb", "Flying Strawberry"];
  
  const { crewmateid, id } = useParams();
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  
  const handleHatChange = (event) => {
    setHat(event.target.value);
  };
  
  const handlePetChange = (event) => {
    setPet(event.target.value);
  };
  
  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  useEffect(() => {
    async function fetchCrewmates() {
      const { data, error } = await supabase.from('crewmates').select('*');
      if (error) {
        console.error('Error fetching data:', error.message);
      } else {
        console.log('Fetched data:', data);
        setCrewmates(data);
      }
    }
    fetchCrewmates();
  }, []);

  const handleCreateCrewmate = async () => {
    try {
      const { data, error } = await supabase.from('crewmates').insert([
        { name, hat, pet, color } 
      ]);
      if (error) {
        console.error('Error creating crewmate:', error.message);
      } else {
        console.log('Crewmate created successfully:', data);
        navigate('/gallery');
        window.location.reload();
      }
    } catch (error) {
      console.error('Error creating crewmate:', error.message);
    }
  };

  const handleEditCrewmate = async () => {
    try {
      const { data, error } = await supabase.from('crewmates').update({ name, hat, pet, color }).eq('id', selectedCrewmate.id);
      if (error) {
        console.error('Error editing crewmate:', error.message);
      } else {
        console.log('Crewmate edited successfully:', data);
        navigate('/gallery');
        window.location.reload();
      }
    } catch (error) {
      console.error('Error editing crewmate:', error.message);
    }
  };

  const handleDeleteCrewmate = async (id) => {
    try {
      const { error } = await supabase.from('crewmates').delete().eq('id', id);
      if (error) {
        console.error('Error deleting crewmate:', error.message);
      } else {
        console.log('Crewmate deleted successfully');
        const updatedCrewmates = crewmates.filter((crewmate) => crewmate.id !== id);
        setCrewmates(updatedCrewmates);
      }
    } catch (error) {
      console.error('Error deleting crewmate:', error.message);
    }
  };

  const handleSelectCrewmate = (crewmate) => {
    setSelectedCrewmate(crewmate);
    setName(crewmate.name);
    setHat(crewmate.hat);
    setPet(crewmate.pet);
    setColor(crewmate.color);
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={(
          <>
            <div className="stackpage">
              <h1 className="text">Welcome to the Crewmate Creator!</h1>
              <p className="text"> Here is where you can create your very own set of crewmates before sending them off into space!</p>
              <img className="homeimg" src="https://shimmering-stardust-c75334.netlify.app/assets/crewmates.43d07b24.png" alt="crewmates"></img>
              <img className="homeimg" src="https://shimmering-stardust-c75334.netlify.app/assets/spaceship.3d8f767c.png" alt="spaceship"></img>
            </div>
            <Navbar></Navbar>
          </>
        )} />

        <Route path="/create" element={(
          <>
            <div className="stackpage">
              <h1 className="text">Create a New Crewmate</h1>
              <p className="text"> Customize your ideal crewmate and send them into space! </p>
              <img className="createimg" src="https://shimmering-stardust-c75334.netlify.app/assets/crewmates.43d07b24.png" alt="crewmates" />
              <form className="formcontainer">
                <div className="forminput">
                  <label className="formlabels">Name:</label>
                  <input type="text" name="name" value={name} onChange={handleNameChange} placeholder="Enter name" />
                </div>
                <div className="forminput">
                  <label className="formlabels">Pet:</label>
                  <select 
                      id="pet" 
                      name="pet" 
                      value={pet} 
                      onChange={handleColorChange}
                      required
                  >
                      <option value="">Select a pet</option>
                      {petOptions.map(pet => (
                          <option key={pet} value={pet.toLowerCase()}>{pet}</option>
                      ))}
                  </select>
                </div>
                <div className="forminput">
                  <label className="formlabels">Hat:</label>
                  <select 
                      id="hat" 
                      name="hat" 
                      value={color} 
                      onChange={handleHatChange}
                      required
                  >
                      <option value="">Select a hat</option>
                      {hatOptions.map(hat => (
                          <option key={hat} value={hat.toLowerCase()}>{hat}</option>
                      ))}
                  </select>
                </div>
                <div className="forminput">
                  <label className="formlabels">Color:</label>
                  <select 
                      id="color" 
                      name="color" 
                      value={color} 
                      onChange={handleColorChange}
                      required
                  >
                      <option value="">Select a color</option>
                      {colorOptions.map(color => (
                          <option key={color} value={color.toLowerCase()}>{color}</option>
                      ))}
                  </select>
                </div>
              </form>
              <button onClick={handleCreateCrewmate}>Create</button>
            </div>
            <Navbar></Navbar>
          </>
        )} />

      <Route path="/:crewmateid" element={(
        <>
          <div className="stackpage">
            <h1 className="text">Crewmate: Alpharad </h1>
            <h2 className="text">Stats</h2>
            <h3 className="text">Color: Blue </h3>
            <h3 className="text">Hat: Crown </h3>
            <h3 className="text">Pet: None</h3>
            <p className="text">This crewmate seems a bit sussy 🧐!</p>
            <img className="createimg" src="https://shimmering-stardust-c75334.netlify.app/assets/suspect.bdfacc7e.png" alt="suspect" />
          </div>
          <Navbar></Navbar>
        </>
      )} />

        <Route path="/gallery" element={(
          <>
            <div className='stackpage'>
              <h1 className="text">Crewmate Gallery</h1>
              <p className="text">List of the crewmates on the ship!</p>
              <div className='crewmatecontainer'>
                {crewmates.map((crewmate) => (
                  <div key={crewmate.id} className="crewmate" onClick={() => handleSelectCrewmate(crewmate)}>
                    <Crewmates {...crewmate} />
                    <button onClick={() => handleDeleteCrewmate(crewmate.id)}>Delete</button>
                  </div>
                ))}
              </div>
            </div>
            <Navbar></Navbar>
          </>
        )} />

        <Route path="/edit/:id" element={(
          <>
            <Navbar></Navbar>
            <div className="stackpage">
              <h1 className="text">Update An Existing Crewmate</h1>
              <h3 className="text"> Current Crewmate Info: </h3>
              <p className="text"> current info </p>
              <img className="createimg" src="https://shimmering-stardust-c75334.netlify.app/assets/crewmates.43d07b24.png" alt="crewmates"></img>
              <form className="formcontainer">
                <div className="forminput">
                  <label className="formlabels">Name:</label>
                  <input type="text" name="name" value={name} onChange={handleNameChange} placeholder="Enter name" />
                </div>
                <div className="forminput">
                  <label className="formlabels">Hat:</label>
                  <select 
                      id="hat" 
                      name="hat" 
                      value={hat} 
                      onChange={handleHatChange}
                      required
                  >
                      <option value="">Select a hat</option>
                      {hatOptions.map(hat => (
                          <option key={hat} value={hat.toLowerCase()}>{hat}</option>
                      ))}
                  </select>
                </div>
                <div className="forminput">
                  <label className="formlabels">Pet:</label>
                  <select 
                      id="pet" 
                      name="pet" 
                      value={pet} 
                      onChange={handlePetChange}
                      required
                  >
                      <option value="">Select a pet</option>
                      {petOptions.map(pet => (
                          <option key={pet} value={pet.toLowerCase()}>{pet}</option>
                      ))}
                  </select>
                </div>
                <div className="forminput">
                  <label className="formlabels">Color:</label>
                  <select 
                      id="color" 
                      name="color" 
                      value={color} 
                      onChange={handleColorChange}
                      required
                  >
                      <option value="">Select a color</option>
                      {colorOptions.map(color => (
                          <option key={color} value={color.toLowerCase()}>{color}</option>
                      ))}
                  </select>
                </div>
              </form>
            </div>
            <button onClick={handleEditCrewmate}>Update</button>
            <button onClick={() => handleDeleteCrewmate(id)}>Delete</button>
          </>
        )} />
      </Routes>
    </div>
  );
}

export default App;