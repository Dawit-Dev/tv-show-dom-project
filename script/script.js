//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  // rootElem.textContent = `Got ${episodeList.length} episode(s)`;

  const header = document.createElement("h2");
  header.className = "tv-maze";
  header.innerHTML = "The data has (originally) come from TVMaze.com";
  document.body.appendChild(header);

  console.log(episodeList);

  // Iterating through an array of objects to generate HTML elements and contents
  episodeList.forEach((episode) => {
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
function episodeCodeFormatter(season, episode) {
  season = season < 10 ? "0" + season : season;
  episode = episode < 10 ? "0" + episode : episode;
  return `S${season}E${episode}`;
}
window.onload = setup;
