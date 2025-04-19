document.addEventListener("DOMContentLoaded", () => {
  const projectLink = document.getElementById("project-link");
  const texts = ["Projets en cours", "En construction"];
  let index = 0;

  setInterval(() => {
    index = (index + 1) % texts.length;
    projectLink.textContent = texts[index];
  }, 2000);
});
