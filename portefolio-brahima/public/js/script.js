const roles = [
	"Développeur Fullstack Web",
	"Laravel • React • Livewire",
	"Du backend à l'interface"
];
const el = document.getElementById('typed-role');
let roleIndex = 0, charIndex = 0, deleting = false;

function tick() {
	const current = roles[roleIndex];

	if (!deleting) {
		charIndex++;
		el.textContent = current.slice(0, charIndex);
		if (charIndex === current.length) {
			deleting = true;
			setTimeout(tick, 1800);
			return;
		}
	} else {
		charIndex--;
		el.textContent = current.slice(0, charIndex);
		if (charIndex === 0) {
			deleting = false;
			roleIndex = (roleIndex + 1) % roles.length;
		}
	}

	setTimeout(tick, deleting ? 35 : 65);
}

tick();

const scrollThreshold = 40;
function handleNavScroll() {
	document.body.classList.toggle('nav-scrolled', window.scrollY > scrollThreshold);
}
window.addEventListener('scroll', handleNavScroll, { passive: true });
handleNavScroll();

document.getElementById('theme-toggle').addEventListener('click', function () {
	const html = document.documentElement;
	const next = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
	html.setAttribute('data-theme', next);
	localStorage.setItem('theme', next);
});

