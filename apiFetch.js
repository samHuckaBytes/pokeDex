const pokemonChoice = document.getElementById("Pokemon")
const submitPoke = document.getElementById("submitPoke")
const pokePick = document.getElementById("yourPokePick")
const picBox = document.getElementById('picBox')
const type = document.getElementById('type')
const hp = document.getElementById('hp')
const attack = document.getElementById('attack')
const defense = document.getElementById('defense')
const sAttack = document.getElementById('sAttack')
const sDefense = document.getElementById('sDefense')
const speed = document.getElementById('speed')
const pokeMoves = document.getElementById('pokeMoves')
const pokeWeight = document.getElementById('weight')
const pokeAbilities = document.getElementById('abilities')
const abilitiesHeader = document.getElementById('abilitiesHeader')

submitPoke.addEventListener("click", async (event) => {
    event.preventDefault()
    console.log(event)

    let pokeName = pokemonChoice.value
    const pokemon = await pokeData(pokeName)
    const { Name, Types, Abilities, Stats, Stats2, Moves, Weight, Pic } = pokemon

    picBox.innerHTML = `
        <img src="${Pic}" alt="This is supposed to be your Pokemon" id="pokeImage">
    `
    pokePick.innerText = Name
    type.innerText = 'Type(s): ' + Types
    hp.innerText = Stats[0] + ':' + ' ' + Stats2[0]
    attack.innerText = Stats[1] + ':' + ' ' + Stats2[1]
    defense.innerText = Stats[2] + ':' + ' ' + Stats2[2]
    sAttack.innerText = Stats[3] + ':' + ' ' + Stats2[3]
    sDefense.innerText = Stats[4] + ':' + ' ' + Stats2[4]
    speed.innerText = Stats[5] + ':' + ' ' + Stats2[5]
    pokeMoves.innerText = 'List of Moves: ' + Moves
    pokeWeight.innerText = 'Weight: ' + Weight + ' lb'
    abilitiesHeader.innerText = 'Special Abilities:'
    pokeAbilities.innerText = Abilities[0] + '  ' + Abilities[1]
})

async function pokeData(pokeName) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
        const ourPokemon = await response.json()

        const { abilities, forms, moves, stats, types, weight, sprites } = ourPokemon

        let pAbilities = abilities.map(el => el.ability.name)
        let pForms = forms.map(el => el.name)
        let pMoves = moves.map(el => el.move.name)
        let pStatsName = stats.map(el => el.stat.name)
        let pStatsNum = stats.map(el => el.base_stat)
        let pTypes = types.map(el => el.type.name)
        let pPic = sprites.front_default

        let pokemon = {
            Name: pForms,
            Types: pTypes,
            Abilities: pAbilities,
            Stats: pStatsName,
            Stats2: pStatsNum,
            Moves: pMoves,
            Weight: weight,
            Pic: pPic,
        }

        return pokemon
    } catch (error) {
        console.log("There was a problem fetching your Pokemon.")
    }
}


