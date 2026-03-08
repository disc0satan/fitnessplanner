import React, { useState } from 'react';
import './App.scss';
import InputForm from './components/InputForm';
import FitnessPlan from './components/FitnessPlan';
import { fetchFitnessPlan } from './api/openrouter';

function App() {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generatePlan = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const parsedData = await fetchFitnessPlan(formData);
      setPlan(parsedData);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      {loading ? (
        <div className="status-container">
          <div className="spinner"></div>
          <p>CRAFTING YOUR PLAN...</p>
        </div>
      ) : error ? (
        <div className="status-container error">
          <p>⚠️ {error}</p>
          <button onClick={() => setError(null)}>BACK TO FORM</button>
        </div>
      ) : !plan ? (
        <InputForm onGenerate={generatePlan} />
      ) : (
        <FitnessPlan data={plan} onBack={() => setPlan(null)} />
      )}
    </div>
  );
}

export default App;
