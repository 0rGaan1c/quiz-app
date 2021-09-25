import React, { useRef } from "react";
import "./QuizCategory.css";

const QuizCategory = ({ data }) => {
  const numberRef = useRef(null);

  const handleClick = () => {
    const numberOfQuestions = numberRef.current.value;
    if (!numberOfQuestions) {
      console.log("please enter a valid number");
    }
    if (numberOfQuestions < 5 && numberOfQuestions > 25) {
      console.log("choose between 5 and 25");
      return;
    }
  };

  return (
    <>
      <div className="quiz-category">
        <img src={data.img} alt={data.type} />
        <div className="quiz-start">
          <div className="quiz-mode">
            <select name="difficulty" id="difficulty">
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
