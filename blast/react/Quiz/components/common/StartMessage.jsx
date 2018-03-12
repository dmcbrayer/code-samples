import React from 'react'

const StartMessage = ({questionTime}) => (
  <div className="quiz-modal quiz-modal__content">
    <h4 className="quiz-modal__content quiz-modal__content--title">How It Works</h4>
    <p>You will be asked five questions.</p>
    <p>You will have <span className="question-time">{questionTime}</span> seconds to answer each question.</p>
    <p>Points will be awarded based on attempting to answer a question, answering questions correctly, and completing the quiz.</p>
    <p><strong>Click the play button to begin.</strong></p>
  </div>    
)

export default StartMessage