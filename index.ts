let page:number = 0;
let limit:number = 20;
let pokemonlist:HTMLElement = $("#pokemonlist")[0];
let prevpagebutton:HTMLButtonElement = <HTMLButtonElement>$("#prevpage")[0];
let nextpagebutton:HTMLButtonElement = <HTMLButtonElement>$("#nextpage")[0];
let returnToOverviewButton:HTMLButtonElement = <HTMLButtonElement>$("#rto")[0];
let namerow:HTMLTableRowElement = <HTMLTableRowElement>$("#namerow")[0];
let weightrow:HTMLTableRowElement = <HTMLTableRowElement>$("#weightrow")[0];
let imagerow:HTMLTableRowElement = <HTMLTableRowElement>$("#imagerow")[0];
let abilityrow:HTMLTableRowElement = <HTMLTableRowElement>$("#abilityrow")[0];

async function getdetails(url:string){
    const details = await $.get(url);
    pokemonlist.hidden = true;
    prevpagebutton.hidden = true;
    nextpagebutton.hidden = true;
    returnToOverviewButton.hidden = false;

    namerow.innerHTML = `<td>Name</td><td>${details.name}</td>`;
    weightrow.innerHTML = `<td>Weight</td><td>${details.weight}</td>`;
    imagerow.innerHTML = `<td>Image</td><td><img src="${details.sprites.front_default}"></img></td>`;
    let abilities:string = "";
    for(const ability of details.abilities){
        abilities += `<li>${ability.ability.name}</li>`;
    }
    abilityrow.innerHTML = "<td>Abilities</td><td><ul>" + abilities + "</ul></td>";

    namerow.hidden = false;
    weightrow.hidden = false;
    imagerow.hidden = false;
    abilityrow.hidden = false;
}

$(() => {
    page = 0;
    limit = 20;
    pokemonlist = $("#pokemonlist")[0];
    prevpagebutton = <HTMLButtonElement>$("#prevpage")[0];
    nextpagebutton = <HTMLButtonElement>$("#nextpage")[0];
    returnToOverviewButton = <HTMLButtonElement>$("#rto")[0];
    namerow = <HTMLTableRowElement>$("#namerow")[0];
    weightrow = <HTMLTableRowElement>$("#weightrow")[0];
    imagerow = <HTMLTableRowElement>$("#imagerow")[0];
    abilityrow = <HTMLTableRowElement>$("#abilityrow")[0];

    
    async function getpokelist(){
        const pokelist = await $.get("https://pokeapi.co/api/v2/pokemon/?limit=" + limit + "&offset=" + (page * limit));
    
        let html:string = "";
        for(const pokemon of pokelist.results){
            html += '<li><span>' + pokemon.name + '</span><button onclick="getdetails(\'' + pokemon.url + '\')">Details</button></li>';
        }
        pokemonlist.innerHTML = html;
    }

    returnToOverviewButton.hidden = true;
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
        namerow.hidden = true;
        weightrow.hidden = true;
        imagerow.hidden = true;
        abilityrow.hidden = true;
        returnToOverviewButton.hidden = true;
        prevpagebutton.hidden = false;
        nextpagebutton.hidden = false;
        pokemonlist.hidden = false;
    });
    getpokelist();
});