// async function getRandomRecipe() {
//   const resp = await fetch(
//     "https://www.themealdb.com/api/json/v1/1/random.php"
//   );
//   console.log(resp);
//   const respData = await resp.json();
//   console.log(respData);
// }

getRandomRecipe();
async function getRandomRecipe() {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );
  const data = await response.json();
  odpalTo(data, true);
}
const populars = document.querySelector(".populars");
const popular = document.createElement("div");
popular.classList.add("popular");

function odpalTo(data) {
  popular.innerHTML = `
      <img src="${data.meals[0].strMealThumb}"
           alt="">
      <div class="info"><h1>${data.meals[0].strMeal}</h1><i class="fa-solid fa-stopwatch"></i>5 min<i class="fa-solid fa-bookmark"></i>
      </div>`;
  populars.appendChild(popular);
}
