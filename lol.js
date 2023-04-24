function loadData(event) {
  event.preventDefault();

  let search;
  // check if no input
  // set default search to bond
  if (!$("input").val()) {
    search = "bond";
  } else {
    search = $("input").val();
    $("input").val("");
  }

  // api and end points
  // create search with user input
  const api = "&api_key=feb6f0eeaa0a72662967d77079850353";
  const endpoint = `https://api.themoviedb.org/3/search/movie?query=${search}${api}`;
  const poster = "https://image.tmdb.org/t/p/w500/";

  let gridHtml = "";
  let selectedHtml = "";

  $.getJSON(endpoint, function(data) {

    // if no results display error message
    if (data.results.length == 0) {
      $(".error").html("No data found, search again.");
    }

    // create the film layout
    for (let i = 0; i < data.results.length; i++) {
      const movieResults = data.results[i];
      
      // check if the poster_path is null or undefined
      if (!movieResults.poster_path) {
        // skip this movie and move on to the next one
        continue;
      }
    
      gridHtml += `<li data-tmdb-id="${movieResults.id}">
        <img class="poster" src="${poster}${movieResults.poster_path}">
      </li>`;
    }
    
    $(".films").html(gridHtml);

    // handle click of poster image
    $(".poster").on("click", function() {
      const tmdbId = $(this).parent().data("tmdb-id");
      const embedUrl = `https://embed.smashystream.com/playere.php?tmdb=${tmdbId}`;
      const embedHtml = `<div class="embed-container"><iframe src="${embedUrl}" frameborder="0" allowfullscreen ></iframe></div>`;
      $(".films").empty();
      $(".selectedFilm").html(embedHtml);
    });
    
  });
}


// start app
// use submit to load the data
const form = $(".form");
form.submit(loadData);
