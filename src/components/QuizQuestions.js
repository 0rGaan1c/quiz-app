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
  const [selected, setSelected] = useState(false);
  const [options, setOptions] = useState(
    shuffle([
      ...currentQuestion.incorrect_answers,
      currentQuestion.correct_answer,
    ])
  );

  // console.log(currentQuestion);
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
                className={`${selected ? "selected" : ""} option`}
                // onClick={() => {
                //   console.log(idx);
                //   setSelected(!selected);
                // }}
              >
                {option}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuizQuestions;
