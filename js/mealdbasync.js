const searchFood = async () => {
    const searchField = document.getElementById('search-field');
    const searchValue = searchField.value ;
    searchField.value = '';
    // Clear data
    if(searchValue == ''){
        const searchResult = document.getElementById('search-result');
        searchResult.textContent = '';
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

        const res = await fetch(url);
        const data = await res.json();
        displaySearchResult(data.meals);

        // fetch(url)
        // .then(res => res.json())
        // .then(data => displaySearchResult(data.meals))
    }
    
}

const displaySearchResult = meals => {
    console.log(meals);
    const searchResult = document.getElementById('search-result');
    // searchResult.innerHTML = '';
    searchResult.textContent = '';
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


const loadMealDetail = async mealId => {
    // console.log(mealId)
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;

    const res = await fetch(url);
    const data = await res.json();
    displayMealDetail(data.meals[0])
    // fetch(url)
    // .then(res => res.json())
    // .then(data => displayMealDetail(data.meals[0]));

}

const displayMealDetail = meal => {
    const mealDetails = document.getElementById('meal-detail');
    mealDetails.textContent = '';
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