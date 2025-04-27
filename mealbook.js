document.getElementById('search-btn').addEventListener('click', function() {
    const mealName = document.getElementById('meal-input').value.trim();
    const resultDiv = document.getElementById('meal-result');
    resultDiv.innerHTML = "";

    if (mealName === "") {
        resultDiv.innerHTML = "<p>Please enter a meal name.</p>";
        return;
    }

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
        .then(response => response.json())
        .then(data => {
            if (data.meals) {
                const meal = data.meals[0];

                const mealInfo = `
                    <h2>${meal.strMeal}</h2>
                    <p>${meal.strInstructions.substring(0, 300)}...</p>
                    <img src="${meal.strMealThumb}" alt="Meal Image">
                    ${meal.strYoutube ? `<p><a href="${meal.strYoutube}" target="_blank">▶️ Watch Cooking Video</a></p>` : ''}
                `;

                resultDiv.innerHTML = mealInfo;
            } else {
                resultDiv.innerHTML = "<p>⚠️ Meal not found</p>";
            }
        })
        .catch(error => {
            console.error('Error fetching meal:', error);
            resultDiv.innerHTML = "<p>❌ Something went wrong. Please try again later.</p>";
        });
});
