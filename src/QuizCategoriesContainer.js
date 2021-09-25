import React from "react";
import QuizCategory from "./QuizCategory";
import htmlImg from "./images/html.png";
import javascriptImg from "./images/javascript.png";

const QuizCategoriesContainer = () => {
  const quizCategories = [
    {
      category: "html",
      img: htmlImg,
    },
    {
      category: "javascript",
      img: javascriptImg,
    },
  ];

  return (
    <div>
      {quizCategories.map((quizCategory) => {
        return <QuizCategory data={quizCategory} />;
      })}
    </div>
  );
};

export default QuizCategoriesContainer;
