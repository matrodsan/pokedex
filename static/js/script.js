const pokemonImage = document.querySelector('.pokemon__image');
let pokemonIndex = 1;


const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`);
    
    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }
    
}

const renderPokemon = async (pokemon) => {
    const data = await fetchPokemon(pokemon);

    if (data) {
        $(".pokemon__name").html(data.name.toUpperCase() + ' - ' + data.id);
        $(".pokemon__height").html(data.height / 10 + " m");
        $(".pokemon__weight").html(data.weight / 10 + " kg");
        pokemonImage.src = data['sprites']['other']['dream_world']['front_default'];
        $(".info__badges").html("");
        for (key in data.types) {
            var aux = data['types'][key]['type']['name'];
            $(".info__badges").append('<span class="badge badge-'+ aux +'">'+ aux +'</span>');
        }
        $('#searchInput').val('');
        pokemonIndex = data.id;
    } else {
        $(".pokemon__name").html('Not Found');
        $(".pokemon__height").html("- m");
        $(".pokemon__weight").html("- kg");
        $(".info__badges").html("");
    }

}

$('.button__prev').click(function (event) {
    event.preventDefault();
    if (pokemonIndex > 1) {
        pokemonIndex--;
        renderPokemon(`${pokemonIndex}`);
    }
})

$('.button__next').click(function (event) {
    event.preventDefault();
    pokemonIndex++;
    renderPokemon(`${pokemonIndex}`);
})

$('.search__input').submit(function (e) { 
    e.preventDefault();
    renderPokemon($('#searchInput').val());
    $("#searchInput").blur();
});

renderPokemon('1');