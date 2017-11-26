let page:number = 0;
const limit:number = 20;
let pokemonlist:HTMLElement;
let prevpagebutton:HTMLButtonElement;
let nextpagebutton:HTMLButtonElement;
let returnToOverviewButton:HTMLButtonElement;
let namerow:HTMLTableRowElement;
let weightrow:HTMLTableRowElement;
let imagerow:HTMLTableRowElement;
let abilityrow:HTMLTableRowElement;

function hidePokemonlist():void{
    pokemonlist.hidden = true;
    prevpagebutton.hidden = true;
    nextpagebutton.hidden = true;
}
function showPokemonlist():void{
    pokemonlist.hidden = false;
    prevpagebutton.hidden = false;
    nextpagebutton.hidden = false;
}
function hideDetails():void{
    returnToOverviewButton.hidden = true;
    namerow.hidden = true;
    weightrow.hidden = true;
    imagerow.hidden = true;
    abilityrow.hidden = true;
}
function showDetails():void{
    returnToOverviewButton.hidden = false;
    namerow.hidden = false;
    weightrow.hidden = false;
    imagerow.hidden = false;
    abilityrow.hidden = false;
}
async function getdetails(url:string){
    const details = await $.get(url);
    namerow.innerHTML = `<td>Name</td><td>${details.name}</td>`;
    weightrow.innerHTML = `<td>Weight</td><td>${details.weight}</td>`;
    imagerow.innerHTML = `<td>Image</td><td><img src="${details.sprites.front_default}"></img></td>`;
    let abilities:string = "";
    for(const ability of details.abilities){
        abilities += `<li>${ability.ability.name}</li>`;
    }
    abilityrow.innerHTML = "<td>Abilities</td><td><ul>" + abilities + "</ul></td>";
    hidePokemonlist();
    showDetails();
}
async function getpokelist(){
    const pokelist = await $.get("https://pokeapi.co/api/v2/pokemon/?limit=" + limit + "&offset=" + (page * limit));
    let html:string = "";
    for(const pokemon of pokelist.results){
        html += '<li><span>' + pokemon.name + '</span><button onclick="getdetails(\'' + pokemon.url + '\')">Details</button></li>';
    }
    pokemonlist.innerHTML = html;
}
$(() => {
    pokemonlist = $("#pokemonlist")[0];
    prevpagebutton = <HTMLButtonElement>$("#prevpage")[0];
    nextpagebutton = <HTMLButtonElement>$("#nextpage")[0];
    returnToOverviewButton = <HTMLButtonElement>$("#rto")[0];
    namerow = <HTMLTableRowElement>$("#namerow")[0];
    weightrow = <HTMLTableRowElement>$("#weightrow")[0];
    imagerow = <HTMLTableRowElement>$("#imagerow")[0];
    abilityrow = <HTMLTableRowElement>$("#abilityrow")[0];
    
    hideDetails();
    $("#nextpage").click(function(){
        page++;
        prevpagebutton.disabled = false;
        getpokelist();
    });
    $("#prevpage").click(function(){
        page--;
        if(page === 0)prevpagebutton.disabled = true;
        getpokelist();
    });
    $("#rto").click(function(){
        hideDetails();
        showPokemonlist();
    });
    getpokelist();
});