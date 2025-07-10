const input = document.getElementById("input");
const searchBtn = document.getElementById("Search");
const result = document.getElementById("result");

searchBtn.addEventListener('click', () => {
  const name = input.value.trim();
  const apiKey = "7044c2d"; // Your API key
  const url = `https://www.omdbapi.com/?t=${encodeURIComponent(name)}&apikey=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.Response === "True") {
        result.innerHTML = `
          <h3>${data.Title} (${data.Year})</h3>
          <img src="${data.Poster}" width="200" />
          <p><strong>Plot:</strong> ${data.Plot}</p>
          <p><strong>Actors:</strong> ${data.Actors}</p>
          <p><strong>IMDB Rating:</strong> ${data.imdbRating}</p>
        `;
      } else {
        result.innerHTML = `<p>Movie not found.</p>`;
      }
    })
    .catch(error => {
      console.error("Error fetching data:", error);
      result.innerHTML = `<p>Something went wrong.</p>`;
    });
});

        