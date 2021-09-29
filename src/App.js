import { useState, useEffect, useRef } from "react";
import { fetchCategories, fetchData } from "./api";
import "./App.css";
import QuizQuestions from "./components/QuizQuestions";

function App() {
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [error, setError] = useState(false);
  const [numberOfQuestions, setNumberOfQuestions] = useState("10");
  const categoryRef = useRef(null);
  const difficultyRef = useRef(null);

  useEffect(() => {
    const fetchAPI = async () => {
      setCategories(await fetchCategories());
    };

    fetchAPI();
  }, []);

  useEffect(() => {
    if (questions.length > 0) {
      setLoadingQuestions(false);
      setIsQuizStarted(true);
    }
  }, [questions]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const category = categoryRef.current.value;
    const difficulty = difficultyRef.current.value;
    const reg = new RegExp("^[0-9]+$");

    if (!numberOfQuestions.match(reg)) {
      console.log("number is invalid");
      setError(true);
      return;
    }

    setLoadingQuestions(true);
    const fetchAPI = async () => {
      setQuestions(await fetchData(category, difficulty, numberOfQuestions));
    };
    fetchAPI();
  };

  if (loadingQuestions) {
    return (
      <div className="loading">
        <div className="one"></div>
        <div className="two"></div>
        <div className="three"></div>
      </div>
    );
  }

  return (
    <div className="App">
      {isQuizStarted ? (
        <QuizQuestions questions={questions} />
      ) : (
        <div class="start-quiz-container">
          <h1 className="main-heading">Quiz</h1>
          <form className="start-quiz-form">
            <select ref={categoryRef} className="select-fields">
              {categories.map(({ id, name }) => {
                return (
                  <option key={id} value={id}>
                    {name}
                  </option>
                );
              })}
            </select>

            <select ref={difficultyRef} className="select-fields">
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            <input
              type="text"
              value={numberOfQuestions}
              onChange={(e) => {
                setNumberOfQuestions(e.target.value);
              }}
              placeholder="No. of Questions"
              class={`${error ? "error" : ""}`}
            />
            <button onClick={handleSubmit} className="btn">
              Take Quiz
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
