const searchBtn = document.getElementById("button-search");
const searchInput = document.getElementById("search-field");

searchInput.addEventListener("keypress", function(event) {
    // event.preventDefault();
    if (event.key == 'Enter') {
        searchBtn.click();
    }
});



document.getElementById('error-message').style.display = 'none';
const searchFood = () => {
    const searchField = document.getElementById('search-field');
    const searchValue = searchField.value ;
    searchField.value = '';
    // document.getElementById('error-message').style.display = 'none';
    // Clear data
    const searchResult = document.getElementById('search-result');
        searchResult.textContent = '';
    if(searchValue == ''){
        
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
          <h4 class = "text-secondary text-center">Please write something to display</h4>
        `
        searchResult.appendChild(div);
    }
    else{
         // load Data
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`
        fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.meals))
        .catch(error => displayError(error))
    }
    
}


const displayError = error => {
    document.getElementById('error-message').style.display = 'block';
}


const displaySearchResult = meals => {
    const searchResult = document.getElementById('search-result');
    // searchResult.innerHTML = '';         (agear data clear korbe)
    searchResult.textContent = '';      /* (ager data clear korbe) */
    if(meals ==null){
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
          <h4 class = "text-secondary text-center">No result found</h4>
        `
        searchResult.appendChild(div);
    }
    else{
        meals.forEach(meal => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
              <div onclick= "loadMealDetail(${meal.idMeal})" class="card h-100">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${meal.strMeal}</h5>
                    <p class="card-text">${meal.strInstructions.slice(0,200)}</p>
                </div>
            </div>
            `
            searchResult.appendChild(div);
        })
    }
}


const loadMealDetail = mealId => {
    // console.log(mealId)
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayMealDetail(data.meals[0]));

}

const displayMealDetail = meal => {
    console.log(meal);
    const mealDetails = document.getElementById('meal-detail');
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${meal.strMeal}</h5>
          <p class="card-text">${meal.strInstructions.slice(0,150)}</p>
          <a href="${meal.strYoutube}" class="btn btn-primary">Go somewhere</a>
        </div>
    `;
    mealDetails.appendChild(div);
}