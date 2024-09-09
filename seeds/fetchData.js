const fs = require("fs");
require("dotenv").config();
async function test() {
  const strData = await fetchData();
  console.log(process.env.API_KEY);
  fs.writeFile("seeds/exercise.json", JSON.stringify(strData, null, 2), (err) =>
    err ? console.error(err) : console.log("Data successfully written.")
  );
  console.log(strData);
}
async function fetchData() {
  let options = {
    method: "GET",
    headers: { "x-api-key": process.env.API_KEY },
  };

  let arrMuscles1 = [
    "abdominals",
    "abductors",
    "adductors",
    "biceps",
    "calves",
    "chest",
    "forearms",
    "glutes",
    "hamstrings",
    "lats",
    "lower_back",
    "middle_back",
    "neck",
    "quadriceps",
    "traps",
    "triceps",
  ];

  let strData = [];

  for (let i = 0; i < arrMuscles1.length; i++) {
    try {
      let url = `https://api.api-ninjas.com/v1/exercises?muscle=${arrMuscles1[i]}`;
      const response = await fetch(url, options);
      const data = await response.json();
      // parse response as JSON
      for (let datas of data) {
        const { name, muscle, instructions } = datas;
        strData.push({ Name: name, MuscleGroup: muscle, Description: instructions });
      }
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  }
  return strData;
}
test();
