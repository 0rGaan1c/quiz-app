import React, { useState, useRef } from "react";
import { fetchData } from "./api";
import "./QuizCategory.css";

const QuizCategory = ({ data }) => {
  const numberRef = useRef(null);
  const difficultyRef = useRef(null);
  const [isValidRange, setIsValidRange] = useState(true);
  const [isValidInput, setIsValidInput] = useState(true);

  const handleClick = () => {
    const numberOfQuestions = numberRef.current.value;
    const category = data.category;

    if (!numberOfQuestions) {
      console.log("please enter a valid number");
      setIsValidInput(false);
      setTimeout(() => {
        setIsValidInput(true);
      }, 2000);
      return;
    }
    if (numberOfQuestions < 5 || numberOfQuestions > 25) {
      console.log("choose between 5 and 25");
      setIsValidRange(false);
      setTimeout(() => {
        setIsValidRange(true);
      }, 2000);
      return;
    }

    fetchData();
  };

  return (
    <>
      <div className="quiz-category">
        <p className={isValidInput ? "error-hide" : "error-show"}>
          Please enter a valid number
        </p>
        <p className={isValidRange ? "error-hide" : "error-show"}>
          Choose between 5 and 25 questions.
        </p>
        <div className="quiz-start">
          <div className="quiz-mode">
            <select name="difficulty" id="difficulty" ref={difficultyRef}>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            <input
              type="number"
              placeholder="No. of Questions"
              ref={numberRef}
            />
          </div>
          <p onClick={handleClick}>Take Quiz</p>
        </div>
      </div>
    </>
  );
};

export default QuizCategory;
