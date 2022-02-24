const createLink = (url) => {
	const link = document.createElement('link');
	link.setAttribute('rel', 'stylesheet');
	link.setAttribute('href', url);
	document.querySelector('head').appendChild(link);
}

let {href} = window.location;
let url = new URL(href);
let file = url.searchParams.get('file');

if (file) {
	if (file.includes('|')) {
		const files = file.split('|');
		files.forEach(file => createLink(file));
	} else {
		createLink(file);
	}
}
let lightTheme = url.searchParams.get('lightTheme');
if (lightTheme === "true") {
	document.querySelector('html').classList.remove('theme-dark');
	document.querySelector('html').classList.add('theme-light');
}

// New theme editor stuff 👀
window.addEventListener('message', event => {
	const data = JSON.parse(event.data);

	if (data.action === 'reset') {
		const props = document.documentElement.getAttribute('style').split(';').slice(0, 2).map(e => e += ';').join(' ');
		document.documentElement.setAttribute('style', props);
	}

	if (data.action === 'setProperty') {
		document.documentElement.style.setProperty(`--${data.variable}`, data.value);
	}
	if (data.action === 'removeProperty') {
		document.documentElement.style.removeProperty(`--${data.variable}`);
	}

	if (data.action === 'addFont') {
		if (!document.querySelector(`#font-${data.index}`)) {
			const tag = document.createElement('style');
			tag.setAttribute('id', `font-${data.index}`);
			tag.setAttribute('class', 'customfont');
			tag.innerText = data.text;

			document.querySelector('head').appendChild(tag);
		} else {
			document.querySelector(`#font-${data.index}`).innerHTML = data.text;
		}
	}
	if (data.action === 'removeFont') {
		document.querySelector(`#font-${data.index}`)?.remove();
	}

	if (data.action === 'addAddon') {
		const tag = document.createElement('style');

		tag.className = data.class;
		tag.textContent = `@import url('${data.text}');`;
		document.querySelector('head').appendChild(tag);
	}
	if (data.action === 'removeAddon') {
		document.querySelectorAll(`.${data.class}`)?.forEach(el => el.remove());
	}

	if (data.action === 'toggleModal') {
		document.querySelector('#modal').classList.toggle('HIDDEN');
		document.querySelector('#popout').classList.toggle('HIDDEN');
	}
})