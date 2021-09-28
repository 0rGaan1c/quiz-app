import { useState, useEffect, useRef } from "react";
import { fetchCategories, fetchData } from "./api";
import "./App.css";

function App() {
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [numberOfQuestions, setNumberOfQuestions] = useState("10");
  const categoryRef = useRef(null);
  const difficultyRef = useRef(null);

  useEffect(() => {
    const fetchAPI = async () => {
      setCategories(await fetchCategories());
    };

    fetchAPI();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const category = categoryRef.current.value;
    const difficulty = difficultyRef.current.value;
    const reg = new RegExp("^[0-9]+$");

    if (!numberOfQuestions.match(reg)) {
      console.log("number is invalid");
    }

    const fetchAPI = async () => {
      setQuestions(await fetchData(category, difficulty, numberOfQuestions));
    };
    fetchAPI();
  };

  return (
    <div className="App">
      <h1 class="main-heading">Quiz</h1>

      <form class="start-quiz-form">
        <select ref={categoryRef} class="select-fields">
          {categories.map(({ id, name }) => {
            return (
              <option key={id} value={id}>
                {name}
              </option>
            );
          })}
        </select>

        <select ref={difficultyRef} class="select-fields">
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
        />
        <button onClick={handleSubmit} class="btn">
          Take Quiz
        </button>
      </form>
    </div>
  );
}

export default App;
