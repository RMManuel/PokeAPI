const API_URL="https://pokeapi.co/api/v2/pokemon"

document.addEventListener("DOMContentLoaded", ()=>{
  MostrarTodos();
  const containerMuestra = document.getElementById("contenedor-de-muestra");
const btnBusqueda=document.getElementById("btnBuscar");
btnBusqueda.addEventListener("click",async ()=>{
  let buscador=document.getElementById("buscador").value
  let cartas=await getJSONData(API_URL+"/"+buscador);
  console.log(cartas);
  containerMuestra.innerHTML="";
  MostrarDatos(cartas)
})



async function MostrarTodos() {
  try {
    let pokemons = await getJSONData(API_URL);
    console.log(pokemons);

    let arregloPokemon = pokemons.data.results;
    for (let i = 0; i < arregloPokemon.length; i++) {
      let pokemon = arregloPokemon[i];
      let name = pokemon.name;
      let url = pokemon.url;
      let info = await getJSONData(url); // Esperar la respuesta de getJSONData
      console.log(info);
      MostrarDatos(info);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}


async function MostrarDatos(array) {
  let pokemonId = array.data.id;
  let pokemonInfo = array.data;
  console.log(pokemonId);
  let imagenSRC = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
  
  let each = document.createElement("div");
  each.classList.add("containerXPokemon");
  let img = document.createElement("img");
  img.classList.add("img-pokemon")
  img.src = imagenSRC;
  let info = document.createElement("div");
  info.classList.add("container-info-pokemon");
  let name = pokemonInfo.name;
  let tipos = pokemonInfo.types;

  info.innerHTML += `<h4><strong>${name}</strong>#${pokemonId}</h4>`;

  for (const types of tipos) {
    try {
      const tipoInfo = await getJSONData(types.type.url);
      console.log("Información del tipo:", tipoInfo);
      
  
      info.innerHTML += `
        <div class="tipo-pokemon"><h5>${tipoInfo.data.name}</h5></div>
      `;
    } catch (error) {
      console.error("Error al obtener información del tipo:", error);
    }
  }

  each.appendChild(img);
  each.appendChild(info);
  containerMuestra.appendChild(each);
}


})

let getJSONData = function(url){
  let result = {};
  return fetch(url)
  .then(response => {
    if (response.ok) {
      return response.json();
    }else{
      throw Error(response.statusText);
    }
  })
  .then(function(response) {
        result.status = 'ok';
        result.data = response; 
        return result;
  })
  .catch(function(error) {
      result.status = 'error';
      result.data = error;
      return result;
  });
}
