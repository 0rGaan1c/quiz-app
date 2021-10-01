import React, { useState } from "react";
import "./QuizQuestions.css";

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

const QuizQuestions = ({ questions }) => {
  const [index, setIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(questions[index]);
  const [options, setOptions] = useState(
    shuffle([
      ...currentQuestion.incorrect_answers,
      currentQuestion.correct_answer,
    ])
  );
  const [selected, setSelected] = useState(
    new Array(options.length).fill(false)
  );

  const handleSelectedClick = (idx) => {
    const newSelected = selected.map((element, index) => {
      if (index === idx) {
        return !element;
      }
      return false;
    });
    setSelected(newSelected);
  };

  return (
    <div className="quiz-question-container">
      <h1 className="main-heading">{`${index + 1}/${questions.length}`}</h1>
      <div className="quiz-question">
        <h2 className="question-heading"> {currentQuestion.question} </h2>
        <div className="options">
          {options.map((option, idx) => {
            return (
              <div
                key={idx}
                className={`${selected[idx] ? "selected" : ""} option`}
                onClick={() => {
                  handleSelectedClick(idx);
                }}
              >
                {option}
              </div>
            );
          })}
        </div>
        <button
          className={`${!selected.includes(true) ? "btn-disabled" : "btn"}`}
          disabled={!selected.includes(true)}
          onClick={() => {
            console.log("nani");
          }}
        >
          Next Question
        </button>
      </div>
    </div>
  );
};

export default QuizQuestions;
