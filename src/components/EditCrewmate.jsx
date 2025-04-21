import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client.jsx';

const EditCrewmate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [inputs, setInputs] = useState({
        name: "",
        color: "",
        hat: "",
        pet: ""
    });
    
    // Fetch crewmate data when component mounts
    useEffect(() => {
        const fetchCrewmate = async () => {
            try {
                const { data, error } = await supabase
                    .from('crewmates')
                    .select('*')
                    .eq('id', id)
                
                if (error) {
                    throw error;
                }
                
                if (data) {
                    setInputs({
                        name: data.name,
                        color: data.color,
                        hat: data.hat,
                        pet: data.pet
                    });
                }
            } catch (error) {
                console.error('Error fetching crewmate:', error);
            }
        };
        
        fetchCrewmate();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const updateCrewmate = async (e) => {
        e.preventDefault();
        
        try {
            const { error } = await supabase
                .from('crewmates')
                .update({
                    name: inputs.name,
                    color: inputs.color,
                    hat: inputs.hat,
                    pet: inputs.pet
                })
                .eq('id', id);
                
            if (error) {
                throw error;
            }
            
            alert('Crewmate updated successfully!');
            navigate('/');
        } catch (error) {
            console.error('Error updating crewmate:', error);
            alert('Error updating crewmate');
        }
    };
    
    const deleteCrewmate = async () => {
        if (window.confirm('Are you sure you want to delete this crewmate?')) {
            try {
                const { error } = await supabase
                    .from('crewmates')
                    .delete()
                    .eq('id', id);
                    
                if (error) {
                    throw error;
                }
                
                alert('Crewmate deleted successfully!');
                navigate('/');
            } catch (error) {
                console.error('Error deleting crewmate:', error);
                alert('Error deleting crewmate');
            }
        }
    };

    // Color, hat, & pet options
    const colorOptions = ["Red", "Blue", "Green", "Pink", "Orange", "Yellow", "Black", "White", "Purple", "Brown", "Cyan", "Lime", "Maroon", "Rose", "Banana", "Gray","Tan", "Coral"];
    const hatOptions = ["None", "Crown", "It's Called Fashion", "Bird That Carries Crew", "Beanie", "Witch One", "If I Fits I Sits", "I'm the Star"];
    const petOptions = ["None", "A Goose", "Bedcrab", "Boneshaker", "Breb", "Bränt", "Chewie", "Clank", "Creb", "Flying Strawberry"];
    
    return (
        <div className="content">
            <h2>Edit Crewmate</h2>

            <form className="crewmate-form" >
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={inputs.name} 
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="color">Color:</label>
                    <select 
                        id="color" 
                        name="color" 
                        value={inputs.color} 
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a color</option>
                        {colorOptions.map(color => (
                            <option key={color} value={color.toLowerCase()}>{color}</option>
                        ))}
                    </select>
                </div>
                
                <div className="form-group">
                    <label htmlFor="hat">Hat:</label>
                    <select 
                        id="hat" 
                        name="hat" 
                        value={inputs.hat} 
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a hat</option>
                        {hatOptions.map(hat => (
                            <option key={hat} value={hat.toLowerCase()}>{hat}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="pet">Pet:</label>
                    <select 
                        id="pet" 
                        name="pet" 
                        value={inputs.pet} 
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a pet</option>
                        {petOptions.map(pet => (
                            <option key={pet} value={pet.toLowerCase()}>{pet}</option>
                        ))}
                    </select>
                </div>
                
                <div className="form-actions">
                    <button type="submit" className="submit-btn" onClick={updateCrewmate}>Update Crewmate</button>
                    <button type="button" className="delete-btn" onClick={deleteCrewmate}>Delete Crewmate</button>
                </div>
            </form>
        </div>
    );
};

export default EditCrewmate;