const populars = document.querySelector(".populars");
const popular = document.createElement("div");
popular.classList.add("popular");

let mealsToShow = [52771, 53014, 52777, 52841];
let readyMeals = [];
async function getMealById(i) {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + mealsToShow[i]
  );
  const data = await response.json();
  return await data;
}

async function showMeals() {
  for (let i = 0; i < 4; i++) {
    let meal = await getMealById(i);
    readyMeals.push(meal.meals[0]);
    document.querySelector(
      ".populars"
    ).innerHTML += `<div class="popular"><img src="${readyMeals[i].strMealThumb}"
           alt="">
      <div class="info"><h1>${readyMeals[i].strMeal}</h1><i class="fa-solid fa-stopwatch"></i>5 min<i class="fa-solid fa-bookmark"></i>
      </div></div>`;
  }
}

showMeals();
