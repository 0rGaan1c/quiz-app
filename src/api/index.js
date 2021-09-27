import axios from "axios";

const url = "https://opentdb.com/api.php";

export const fetchData = async (category, difficulty, numberOfQuestions) => {
  let changeableUrl = url;
  changeableUrl = `${url}?amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}&type=multiple`;
  console.log(changeableUrl);
  try {
    const {
      data: { results },
    } = await axios.get(changeableUrl);

    return results;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCategories = async () => {
  try {
    const {
      data: { trivia_categories },
    } = await axios.get("https://opentdb.com/api_category.php");

    return trivia_categories;
  } catch (error) {
    console.log(error);
  }
};
