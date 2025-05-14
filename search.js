document.addEventListener("DOMContentLoaded", function() {
  const searchInput = document.querySelector("#search-input");

  searchInput.addEventListener("keydown", function(event) {
    if (event.code === "Enter") {
      search();
    }
  });

  function search() {
    const input = searchInput.value;

    window.location.href =
      "https://www.google.com/search?q=" + input + "&rlz=1C1ONGR_enUS1092US1092&oq=" + input + "&gs_lcrp=EgZjaHJvbWUqEggAEAAYQxjjAhixAxiABBiKBTISCAAQABhDGOMCGLEDGIAEGIoFMg8IARAuGEMYsQMYgAQYigUyDAgCEAAYQxiABBiKBTIMCAMQLhhDGIAEGIoFMgwIBBAAGEMYgAQYigUyDAgFEC4YQxiABBiKBTIGCAYQRRg8MgYIBxBFGDzSAQgyMzYyajBqN6gCALACAA&sourceid=chrome&ie=UTF-8"
  }
});
