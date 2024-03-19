import React, { useState } from 'react';
import NLPComponent from './NLPComponent';

function Dashboard() {
  const [isVisible, setIsVisible] = useState(false);
  const handleToggle = () => {
    setIsVisible(!isVisible);
  };

  const [isDrugReactionVisible, setIsDrugReactionVisible] = useState(false);
  const handleToggleDrugReaction = () => {
    setIsDrugReactionVisible(!isDrugReactionVisible);
    setIsVisible(false);
  };

  const questions = [
    { text: "Are there previous conclusive reports on this reaction?", values: { Yes: 1, No: 0, "Do Not Know": 0 } },
    { text: "Did the adverse event appear after the suspected drug was administered?", values: { Yes: 2, No: -1, "Do Not Know": 0 } },
    { text: "Did the adverse event improve when the drug was discontinued or a specific antagonist was administered?", values: { Yes: 1, No: 0, "Do Not Know": 0 } },
    { text: "Did the adverse event reappear when the drug was readministered?", values: { Yes: 2, No: -1, "Do Not Know": 0 } },
    { text: "Are there alternative causes that could on their own have caused the reaction?", values: { Yes: -1, No: 2, "Do Not Know": 0 } },
    { text: "Did the reaction reappear when a placebo was given?", values: { Yes: -1, No: 1, "Do Not Know": 0 } },
    { text: "Was the drug detected in the blood (or other fluids) in concentrations known to be toxic?", values: { Yes: 1, No: 0, "Do Not Know": 0 } },
    { text: "Was the reaction more severe when the dose was increased or less severe when the dose was decreased?", values: { Yes: 1, No: 0, "Do Not Know": 0 } },
    { text: "Did the patient have a similar reaction to the same or similar drug in any previous exposure?", values: { Yes: 1, No: 0, "Do Not Know": 0 } },
    { text: "Was the adverse event confirmed by any objective evidence?", values: { Yes: 1, No: 0, "Do Not Know": 0 } },
  ];

  function calculateTotal() {
    let total = 0;

    questions.forEach((question, index) => {
      const value = parseInt(document.getElementById(`question${index + 1}`).value);
      total += question.values[Object.keys(question.values)[value + 1]];
    });

    let interpretation;
    if (total >= 9) {
      interpretation = "Definite";
    } else if (total >= 5) {
      interpretation = "Probable";
    } else if (total >= 1) {
      interpretation = "Possible";
    } else {
      interpretation = "Doubtful";
    }

    alert(`Total Score: ${total}\nInterpretation: ${interpretation}`);
  }

  return (
    <div className="dashboard-container">
      <div className="left-panel" id="right">
        <button onClick={handleToggle}>Cause Detection</button>
      </div>
      <div className="left-panell" id="right">
        <button onClick={handleToggleDrugReaction}>Drug_reaction</button>
      </div>
      {isVisible && (
        <div className="right-panel">
          {questions.map((question, index) => (
            <div key={index}>
              <label htmlFor={`question${index + 1}`}>{`${index + 1}. ${question.text}`}</label><br />
              <select id={`question${index + 1}`} name={`question${index + 1}`}>
                <option value="0">Select</option>
                {Object.keys(question.values).map((response, responseIndex) => (
                  <option key={responseIndex} value={responseIndex - 1}>
                    {response}
                  </option>
                ))}
              </select>
            </div>
          ))}
          <button type="button" onClick={calculateTotal}>
            Calculate Total
          </button>
        </div>
      )}
      {isDrugReactionVisible && (
        <div className="right-panell">
          <NLPComponent />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
