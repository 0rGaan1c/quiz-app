import { useState, useEffect, useRef } from "react";
import { fetchCategories, fetchData } from "./api";
import "./App.css";

function App() {
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const categoryRef = useRef(null);
  const difficultyRef = useRef(null);
  const numberOfQuestionsRef = useRef(null);

  useEffect(() => {
    const fetchAPI = async () => {
      setCategories(await fetchCategories());
    };

    fetchAPI();
  }, []);

  const handleSubmit = async () => {
    const category = categoryRef.current.value;
    const difficulty = difficultyRef.current.value;
    const numberOfQuestions = numberOfQuestionsRef.current.value;

    const fetchAPI = async () => {
      setQuestions(await fetchData(category, difficulty, numberOfQuestions));
    };
    fetchAPI();
  };

  return (
    <div className="App">
      <h1>Quiz</h1>

      <select ref={categoryRef}>
        {categories.map(({ id, name }) => {
          return (
            <option key={id} value={id}>
              {name}
            </option>
          );
        })}
      </select>

      <select ref={difficultyRef}>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <input type="number" value="10" ref={numberOfQuestionsRef} />
      <button onClick={handleSubmit}>Take Quiz</button>
    </div>
  );
}

export default App;
