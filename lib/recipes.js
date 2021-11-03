export async function getAllRecipes() {
    const res = await fetch('http://breww.local/wp-json/wp/v2/recipes');
    const allRecipes = await res.json();

    if (!allRecipes) {
        return {
            notFount: true,
        };
    }

    return {
        allRecipes,
    };
}

export async function getAllRecipesId() {
    const res = await fetch('http://breww.local/wp-json/wp/v2/recipes');
    const allRecipes = await res.json();

    return allRecipes.map((recipe) => {
        return {
            params: {
                id: recipe.id.toString(),
            },
        };
    });
}

export async function getSingleRecipe(id) {
    const res = await fetch(`http://breww.local/wp-json/wp/v2/recipes/${id}`);
    const recipeData = await res.json();

    if (!recipeData) {
        return {
            notFount: true,
        };
    }

    return {
        recipeData,
    };
}
