const populars = document.querySelector(".populars");
const popular = document.createElement("div");
popular.classList.add("popular");

let mealsToShow = [52771, 53014, 52777, 52841];
let readyMeals = [];

async function getMealById(i) {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + i
  );
  const data = await response.json();
  return await data;
}

async function showMeals() {
  let populars = document.querySelector(".populars");
  for (let i = 0; i < 4; i++) {
    let meal = await getMealById(mealsToShow[i]);
    console.log(meal);
    readyMeals.push(meal.meals[0]);
    populars.innerHTML += `<div class="popular" data-id="${readyMeals[i].idMeal}"><img src="${readyMeals[i].strMealThumb}" alt="">
      <div class="info"><h1>${readyMeals[i].strMeal}</h1><i class="fa-solid fa-stopwatch"></i>5 min<i class="fa-solid fa-bookmark"></i>
      </div></div>`;
  }
  findPopular();
  findTheMeal();
}
showMeals();

async function searchMeals(searchField) {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + searchField
  );
  const data = await response.json();
  return await data;
}

//TODO: Połącz w jedną funkcje uniwersalną showSearchedMeals oraz showMeals, na pewno da się to zrobić uniwersalne
function showSearchedMeals(searchedMeals) {
  const searchElement = document.querySelector(".populars");
  searchElement.innerHTML = `<h1>Search results</h1>`;
  for (let i = 0; i < searchedMeals.meals.length; i++) {
    searchElement.innerHTML += `<div class="popular" data-id="${searchedMeals.meals[i].idMeal}"><img src="${searchedMeals.meals[i].strMealThumb}"
           alt="">
      <div class="info"><h1>${searchedMeals.meals[i].strMeal}</h1><i class="fa-solid fa-stopwatch"></i>5 min<i class="fa-solid fa-bookmark"></i>
      </div></div>`;
  }
  findTheMeal();
}

async function search() {
  let searchValue = document.querySelector(".searchField input").value;
  let searchedMeals = await searchMeals(searchValue);
  if (searchValue) showSearchedMeals(searchedMeals);
  else {
    document.querySelector(".populars").innerHTML = `<h1>Popular</h1>`;
    await showMeals();
  }
  findPopular();
}

document.querySelector(".searchField button").addEventListener("click", search);
document.querySelector(".searchField").addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    search();
  }
});

function findPopular() {
  let favs = document.querySelectorAll(".popular");
  favs.forEach((element) => {
    let bookmark = element.querySelector(".fa-bookmark");
    bookmark.addEventListener("click", () => {
      if (!bookmark.getAttribute("style")) {
        bookmark.style.color = "red";
        document.querySelector(
          ".favs"
        ).innerHTML += `<div class="fav" data-id="${element.getAttribute(
          "data-id"
        )}">
      <img src="${element.querySelector("img").src}"
           alt="${element.querySelector("h1").textContent}"><h1>${
          element.querySelector("h1").textContent
        }</h1><i class="fa-solid fa-x"></i>
      <h1></h1>
    </div>`;
        findTheMeal();
        findFromFav();
      } else {
        removeFromPopular(element);
      }
    });
  });
}

function removeFromPopular(element) {
  let favs = document.querySelectorAll(".fav");
  element.querySelector(".fa-bookmark").removeAttribute("style");
  favs.forEach((fav) => {
    if (
      fav.querySelector("h1").textContent ===
      element.querySelector("h1").textContent
    ) {
      fav.remove();
    }
  });
}

function findFromFav() {
  let favs = document.querySelectorAll(".fav");
  favs.forEach((element) => {
    element.querySelector("i").addEventListener("click", () => {
      document.querySelectorAll(".popular").forEach((el) => {
        if (
          element.querySelector("h1").textContent ===
          el.querySelector("h1").textContent
        ) {
          el.querySelector(".fa-bookmark").removeAttribute("style");
        }
      });
      element.remove();
    });
  });
}
findFromFav();

async function findTheMeal() {
  let meals = document.querySelectorAll(".popular");
  let mealsFav = document.querySelectorAll(".fav");
  console.log(mealsFav);
  meals.forEach((element) => {
    element.addEventListener("click", async () => {
      console.log(element.getAttribute("data-id"));
      let recipe = await getMealById(element.getAttribute("data-id"));
      showRecipe(recipe);
    });
  });
  mealsFav.forEach((element) => {
    element.addEventListener("click", async () => {
      console.log(element.getAttribute("data-id"));
      let recipe = await getMealById(element.getAttribute("data-id"));
      showRecipe(recipe);
    });
  });
}

function showRecipe(recipe) {
  let recipePopup = document.querySelector(".recipePopup");
  if (recipePopup.style.display === "none") {
    recipePopup.style.display = "block";
    recipePopup.querySelector("h1").textContent = recipe.meals[0].strMeal;
    recipePopup.querySelector("img").src = recipe.meals[0].strMealThumb;
    recipePopup.querySelector("span").textContent =
      recipe.meals[0].strInstructions;
    showRecipe();
  } else if (recipePopup.style.display === "block") {
    recipePopup.querySelector("i").addEventListener("click", () => {
      recipePopup.style.display = "none";
    });
  }
}
