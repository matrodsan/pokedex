const pokemonImage = document.querySelector('.pokemon__image');

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const data = await APIResponse.json();
    return data;
}

const renderPokemon = async (pokemon) => {
    const data = await fetchPokemon(pokemon);
    $(".pokemon__name").html(data.name.toUpperCase() + ' - ' + data.id);
    $(".pokemon__height").html(data.height / 10 + " m");
    $(".pokemon__weight").html(data.weight / 10 + " kg");
    pokemonImage.src = data['sprites']['other']['dream_world']['front_default'];
    $(".info__badges").html("");
    for (key in data.types) {
        var aux = data['types'][key]['type']['name'];
        $(".info__badges").append('<span class="badge badge-'+ aux +'">'+ aux +'</span>');
    }
}

renderPokemon('150');