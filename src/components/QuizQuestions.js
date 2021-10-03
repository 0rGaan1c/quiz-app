import React, { useState, useEffect } from "react";
import he from "he";
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
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
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

  useEffect(() => {
    setCurrentQuestion(questions[index]);
    setSelected(new Array(options.length).fill(false));
    setOptions(
      shuffle([
        ...currentQuestion.incorrect_answers,
        currentQuestion.correct_answer,
      ])
    );
  }, [index, currentQuestion, questions, options.length]);

  const handleSelectedClick = (idx) => {
    const newSelected = selected.map((element, index) => {
      if (index === idx) {
        return !element;
      }
      return false;
    });
    setSelected(newSelected);
  };

  const handleNextQuestionClick = () => {
    const userAnswer = options[selected.indexOf(true)];
    if (currentQuestion.correct_answer === userAnswer) {
      setScore(score + 1);
    }
    setIndex(index + 1);
  };

  const handleSeeResult = () => {
    const userAnswer = options[selected.indexOf(true)];
    if (currentQuestion.correct_answer === userAnswer) {
      setScore(score + 1);
    }
    setShowResult(true);
  };

  const handlePlayAgain = () => {
    window.location.reload();
  };

  return (
    <div className="quiz-question-container">
      {showResult ? (
        <>
          <h1 className="main-heading">Finished</h1>
          <div className="quiz-container">
            <h2 className="sub-heading">
              You got {score} out of {questions.length} right.
            </h2>
            <button className="btn" onClick={handlePlayAgain}>
              Play Again
            </button>
          </div>
        </>
      ) : (
        <>
          <h1 className="main-heading">{`${index + 1}/${questions.length}`}</h1>
          <div className="quiz-container">
            <h2 className="sub-heading">
              {he.decode(currentQuestion.question)}
            </h2>
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
                    {he.decode(option)}
                  </div>
                );
              })}
            </div>
            {index === questions.length - 1 ? (
              <button
                className={`${
                  !selected.includes(true)
                    ? "btn-disabled btn-disabled-results"
                    : "btn btn-results"
                }`}
                disabled={!selected.includes(true)}
                onClick={handleSeeResult}
              >
                See results
              </button>
            ) : (
              <button
                className={`${
                  !selected.includes(true) ? "btn-disabled" : "btn"
                }`}
                disabled={!selected.includes(true)}
                onClick={handleNextQuestionClick}
              >
                Next Question
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default QuizQuestions;
