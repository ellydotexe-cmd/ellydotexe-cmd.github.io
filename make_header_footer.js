// Shared navigation and footer.
document.querySelector("#header").innerHTML = `
<div class="site-name">
  <h1>Elly Moghtaderi</h1>
</div>
<div id="navLinks">
<a href="index.html">FILMS</a>
<a href="about.html">ABOUT</a>
<a href="cv.html">CV</a>
</div>
`;

// Footer
document.querySelector("#footer").innerHTML = `Elly Moghtaderi &#169; 2026`;

// Pick one horizontal strip per page load; keep it still until the next visit.
const headerElement = document.querySelector("#header");
const headerImagePosition = Math.random();
function updateHeaderPosition() {
  const travel = Math.max(0, headerElement.clientWidth - headerElement.clientHeight);
  headerElement.style.setProperty("--header-offset", `${-travel * headerImagePosition}px`);
}
// Preserve the selected strip when the viewport or header size changes.
new ResizeObserver(updateHeaderPosition).observe(headerElement);
updateHeaderPosition();

// Share the film's description with the listing, including in file:// previews.
// Hidden frames avoid local-file fetch restrictions; only plain text is copied.
const filmDescription = document.querySelector("#film-description");
if (window.parent !== window && filmDescription) {
  window.parent.postMessage({
    type: "portfolio-film-description",
    text: filmDescription.textContent.trim()
  }, "*");
}

document.querySelectorAll("[data-film-source]").forEach(slot => {
  const frame = document.createElement("iframe");
  frame.hidden = true;
  frame.title = "Film description source";
  frame.setAttribute("aria-hidden", "true");
  frame.tabIndex = -1;
  const receiveDescription = event => {
    if (event.source !== frame.contentWindow ||
        event.data?.type !== "portfolio-film-description" ||
        typeof event.data.text !== "string") return;
    slot.textContent = event.data.text;
    window.removeEventListener("message", receiveDescription);
    frame.remove();
  };
  window.addEventListener("message", receiveDescription);
  frame.src = slot.dataset.filmSource;
  document.body.append(frame);
});
