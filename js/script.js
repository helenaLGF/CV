// Ce fichier est pour toute fonctionnalité JavaScript que vous souhaitez ajouter
// Par exemple, pour un effet de défilement fluide vers les sections

document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
