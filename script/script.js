//You can edit ALL of the code here
const allEpisodes = getAllEpisodes();

function setup() {
  makePageForEpisodes(allEpisodes);
}

const rootElem = document.getElementById("root");
  


const headerContainer = document.querySelector(".header-container");

const selectMovies = document.createElement("select");
selectMovies.className = "select-movies";
selectMovies.name = "movies";
// dropDown.appendChild(selectMovies);
headerContainer.appendChild(selectMovies);
selectMovies.addEventListener('change', (e) => {
  let selectedEpisode = e.target.value;
  const moviesContainer = document.querySelectorAll(".episode-container");
  selectedEpisode = selectedEpisode.split(" ").slice(2).join(" ");
  for (let i = 0; i < moviesContainer.length; i++) {
    moviesContainer[i].style.display = 'block';
    // const episodeMovie = moviesContainer[i].firstChild.innerText.split(' ').slice(0, -2).join(' ');
    // console.log(episodeMovie)
    if (!moviesContainer[i].innerText.includes(selectedEpisode)) {
      moviesContainer[i].style.display = 'none';
      episodesButton.classList.remove('hide');
    }  
  }
  
})

const searchBar = document.createElement("input");
searchBar.className = "search";
searchBar.id = "search";
searchBar.type = "text";
searchBar.placeholder = "Search...";
searchBar.name = "search";
headerContainer.appendChild(searchBar);
searchBar.addEventListener("keyup",  (e) => {
  e.preventDefault();
  const searchString = e.target.value.toUpperCase();
  console.log(searchString);
  const filteredEpisode = allEpisodes.filter((episode) => {
    return (
      episode.name.toUpperCase().includes(searchString) ||
      episode.summary.toUpperCase().includes(searchString)
    );
  });
  while (rootElem.firstChild) {
    rootElem.removeChild(rootElem.firstChild);
  }
  let searchInfo = document.querySelector(".search-title")
  searchInfo.innerText = `Displaying: ${filteredEpisode.length}/${allEpisodes.length} episodes`;
  searchInfo.classList.remove('hide');
  if (e.target.value === '') searchInfo.classList.add('hide');

  makePageForEpisodes(filteredEpisode);
});

const searchTitle = document.createElement("h3");
searchTitle.className = "search-title hide";
 
// searchTitle.classList.remove("hide");
// if (e.target.value === "") {
//   searchTitle.classList.add("hide");
// }
headerContainer.appendChild(searchTitle);

const episodesButton = document.getElementById("episodes-home-btn");
episodesButton.addEventListener('click', (e) => {
  
   window.location.reload();
  episodesButton.classList.add('hide');
})
function makePageForEpisodes(episodeList) {
  
  // Iterating through an array of objects to generate HTML elements and contents
  episodeList.forEach((episode) => { 
    const selectOption = document.createElement("option");
    selectOption.className = 'list-option';
    selectOption.innerText = `${episodeCodeFormatter(
      episode.season,
      episode.number
    )} - ${episode.name}`;
    selectMovies.appendChild(selectOption);
////////////////////////////////////
    //  selectOption.addEventListener("change", addMe);
    //   let chosen = [];

    //  function changeMe(e) {
    //    selectOption.removeEventListener("mouseup", changeMe);
    //    selectOption.dispatchEvent(new Event("change"));
    //  }

    //  function addMe(e) {
    //    chosen.push(e.target.options[e.target.selectedIndex].value);
    //    console.log(chosen);
    //  }
    
   
    /////////////////////////////////////////////
    //
    const episodeContainer = document.createElement("div");
    episodeContainer.className = "episode-container";
    rootElem.appendChild(episodeContainer);

    const episodeName = document.createElement("h3");
    episodeName.className = "episode-name";
    episodeName.innerText = `${episode.name} - ${episodeCodeFormatter(
      episode.season,
      episode.number
    )}`;
    episodeContainer.appendChild(episodeName);

    const episodeImage = document.createElement("img");
    episodeImage.src = episode.image.medium;
    episodeContainer.appendChild(episodeImage);

    const episodeSummary = document.createElement("p");
    episodeSummary.className = "episode-summary";
    episodeSummary.innerHTML = episode.summary;
    episodeContainer.appendChild(episodeSummary);
  });
  

  
}

const source = document.createElement("h2");
source.className = "tv-maze";
source.innerHTML = "The data has (originally) come from ${TVMaze.com}";
document.body.appendChild(source);

// console.log(searchInput);
 

function episodeCodeFormatter(season, episode) {
  season = season < 10 ? "0" + season : season;
  episode = episode < 10 ? "0" + episode : episode;
  return `S${season}E${episode}`;
}


 

window.onload = setup;
