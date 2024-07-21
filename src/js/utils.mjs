
export function setupSearchButton() {
    const searchBox = document.querySelector(".searchBox");
    const searchBtn = document.querySelector(".searchBtn");
    const recipeContainer = document.querySelector(".recipe-container");
    if (searchBtn) {
        searchBtn.addEventListener("click", (e) => {
            e.preventDefault();
            console.log("Button Clicked");
        });
    }
}

export function setupHamburgerMenu() {
    const hambutton = document.querySelector(".navigation-menu");
    const mainnav = document.querySelector("nav ul");
    if (hambutton && mainnav) {
        hambutton.addEventListener("click", () => {
            mainnav.classList.toggle("open");
            hambutton.classList.toggle("open");
        });
    }
}

//footer//
export function setCurrentYear() {
    const currentYearElement = document.getElementById("currentYear");
    if (currentYearElement) {
        const currentYear = new Date().getFullYear();
        currentYearElement.textContent = currentYear;
    }
}

//initialize header and footer//
export function initializeHeaderFooter() {
    setCurrentYear();
    setupSearchButton();
    setupHamburgerMenu();
}

// Fetch recipes from API //
export async function fetchRecipes(query) {
    const url = `https://tasty.p.rapidapi.com/recipes/list?from=0&size=10&q=${encodeURIComponent(query)}`;
    const options = {
        method: "GET",
        headers: {
            "x-rapidapi-key": "97bdfcfb35mshee066a5fa7f7cc3p158394jsned4965d6ab2b",
            "x-rapidapi-host": "tasty.p.rapidapi.com"
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error("Network response was not okay");
        }
        const result = await response.json();
        console.log("Fetched data: ", result);
        return result.results;
    } catch (error) {
        console.error("fetch error:", error);
        return [];
    }
}

// Display search results //
export function displaySearchResults(recipes) {
    const recipeContainer = document.querySelector(".recipe-container");
    recipeContainer.innerHTML = ""; // Clear previous results
    if (recipes.length === 0) {
        recipeContainer.innerHTML = "<p>No results found.<p>";
        return;
    }

    recipes.forEach(recipe => {
        const recipeCard = document.createElement("div");
        recipeCard.classList.add("recipe-card");
        recipeCard.innerHTML = `
            <img src="${recipe.thumbnail_url}" alt="${recipe.name}" />    
            <h3>${recipe.name}</h3>
            <a href="/recipe-detail/index.html?id=${recipe.id}" target="_blank">View Recipe</a>
        `;
        recipeContainer.appendChild(recipeCard);
    });
}

export async function fetchRecipeById(id) {
    const url = `https://tasty.p.rapidapi.com/recipes/get-more-info?id=${encodeURIComponent(id)}`;
    const options = {
        method: "GET",
        headers: {
            "x-rapidapi-key": "97bdfcfb35mshee066a5fa7f7cc3p158394jsned4965d6ab2b",
            "x-rapidapi-host": "tasty.p.rapidapi.com" 
        }
    };

    try {
        const response = await fetch(url, options);
        if(!response.ok) {
            throw new Error("Network response was not okay");
        }
        const result = await response.json();
        console.log("Fetched recipe: ", result);
        return result;
    } catch (error) {
        console.error("fetch error:", error);
        return null;
    }
}
// Display recipe details //
export function displayRecipeDetails(recipe) {
    document.getElementById("recipe-title").textContent = recipe.name;
    document.getElementById("recipe-image").src = recipe.thumbnail_url;

    const ingredientsList = document.getElementById("recipe-ingredients");
    recipe.sections[0].components.forEach(component => {
        const li = document.createElement("li");
        li.textContent = component.raw_text;
        ingredientsList.appendChild(li);
    });

    const instructionsList = document.getElementById("recipe-instructions");
    recipe.instructions.forEach(instruction => {
        const li = document.createElement("li");
        li.textContent = instruction.display_text;
        instructionsList.appendChild(li);
    });
}
