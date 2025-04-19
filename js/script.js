document.addEventListener("DOMContentLoaded", () => {
  const projectLink = document.getElementById("project-link");
  const texts = ["Projets en cours", "En construction"];
  let index = 0;

  setInterval(() => {
    menuItem.innerText = labels[index];
    index = (index + 1) % labels.length;
  }, 1800);
});
