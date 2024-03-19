import React, { useState } from 'react';
import axios from 'axios';

function UserFinder() {
  const [drug_name, setDrugName] = useState('');
  const [medical_condition, setMedicalCondition] = useState('');
  const [sideEffects, setSideEffects] = useState([]);
  const [error, setError] = useState(null);
  
  const handleDrug = (e) => {
    setDrugName(e.target.value);
  };
  
  const handleMedical = (e) => {
    setMedicalCondition(e.target.value);
  };
  
  const fetchSideEffectsFromDatabase = async () => {
    try {
      const response = await axios.post('http://localhost:3001/NLPComponent', { Drug_name: drug_name, Medical_condition: medical_condition });
      console.log(response.data)
      setSideEffects(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching side effects:', error);
      setSideEffects([]);
      setError(error.message);
    }
  };
  

  return (
    <div>
      <h2>Analyze Side Effects</h2>
      <form>
        <div>
          <label htmlFor="Drug_name">Drug Name:</label>
          <input type="text" id="Drug_name" name="Drug_name" value={drug_name} onChange={handleDrug} />
        </div>
        <div>
          <label htmlFor="Medical_condition">Medical Condition:</label>
          <input type="text" id="Medical_condition" name="Medical_condition" value={medical_condition} onChange={handleMedical} />
        </div>
        <button type="button" onClick={fetchSideEffectsFromDatabase}>Analyze Side Effects</button>
      </form>
      {sideEffects.length > 0 && (
        <div className='side_effects'>
          <h3>Side Effects</h3>
          <ul>
            {sideEffects.map((effect, index) => (
              <li key={index}>{effect}</li>
            ))}
          </ul>
        </div>
      )}
      {error && (
        <div>
          <h3>Error</h3>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
  
}


export default UserFinder;
