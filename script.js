const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const fetchPokemon = () => {
    var pokemonPromises = []

    for(var i = 1; i <= 150; i++) {
        pokemonPromises.push(fetch(getPokemonUrl(i)).then(response => response.json()))
    }

    Promise.all(pokemonPromises)
        .then(pokemons => {
            var lisPokemons = pokemons.reduce((accumulator, pokemon) => {
                var types = pokemon.types.map(typeInfo => typeInfo.type.name)

                accumulator += `
                        <li class="card ${types[0]}">
                            <img class="card-image" alt="${pokemon.name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" />

                            <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
                            <p class="card-subtitle">${types.join(' | ')}</p>
                        </li>
                    `
                return accumulator
            }, '')

            var ul = document.querySelector('[data-js="pokedex"]')

            ul.innerHTML = lisPokemons
        })
}

// Application Start
fetchPokemon()
