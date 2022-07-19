// async function getRandomRecipe() {
//   const resp = await fetch(
//     "https://www.themealdb.com/api/json/v1/1/random.php"
//   );
//   console.log(resp);
//   const respData = await resp.json();
//   console.log(respData);
// }

// getRandomRecipe();
// async function getRandomRecipe() {
//   const response = await fetch(
//     "https://www.themealdb.com/api/json/v1/1/random.php"
//   );
//   const data = await response.json();
//   odpalTo(data, true);
// }

const populars = document.querySelector(".populars");
const popular = document.createElement("div");
popular.classList.add("popular");

// function odpalTo(data) {
//   popular.innerHTML = `
//       <img src="${data.meals[0].strMealThumb}"
//            alt="">
//       <div class="info"><h1>${data.meals[0].strMeal}</h1><i class="fa-solid fa-stopwatch"></i>5 min<i class="fa-solid fa-bookmark"></i>
//       </div>`;
//   populars.appendChild(popular);
// }

//Tutaj zaczynam sobie robić rzecz odnośnie popularnych, a nie losowych
let mealsToShow = [52771, 53014, 52777, 52841];
let readyMeals = [];
async function getMealById(i) {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + mealsToShow[i]
  );

  // console.log(data);
  const data = await response.json();
  return await data;
}

async function makeArray() {
  for (let i = 0; i < 4; i++) {
    let meal = await getMealById(i);
    readyMeals.push(meal.meals[0]);
  }
  return readyMeals;
}

console.log(readyMeals);

async function showMeals() {
  await makeArray();
  for (let i = 0; i < 4; i++) {
    document.querySelector(
      ".populars"
    ).innerHTML += `<div class="popular"><img src="${readyMeals[i].strMealThumb}"
           alt="">
      <div class="info"><h1>${readyMeals[i].strMeal}</h1><i class="fa-solid fa-stopwatch"></i>5 min<i class="fa-solid fa-bookmark"></i>
      </div></div>`;
  }
}
showMeals();
