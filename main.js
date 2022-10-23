const createLink = (url, className) => {
	const link = document.createElement('link');
	link.setAttribute('rel', 'stylesheet');
	link.setAttribute('href', url);
	if (className) link.setAttribute('class', className);
	document.querySelector('head').appendChild(link);
}
const createEl = (tag, attrs) => {
	const el = Object.assign(document.createElement(tag), attrs);
	document.querySelector('head').appendChild(el);
}
const removeEl = (selector) => {
	document.querySelectorAll(selector)?.forEach(el => el.remove());
}


let {href} = window.location;
let url = new URL(href);
let file = url.searchParams.get('file');

if (file) {
	const files = file.split('|');
	files.forEach(file => createLink(file));
}

if (url.searchParams.get('lightTheme') === "true") {
	document.querySelector('html').classList.remove('theme-dark');
	document.querySelector('html').classList.add('theme-light');
}

window.addEventListener('message', event => {
	const data = JSON.parse(event.data);

	const actions = {
		reset() {
			const props = document.documentElement.getAttribute('style').split(';').slice(0, 2).map(e => e += ';').join(' ');
			document.documentElement.setAttribute('style', props);
		},
		setProp() {
			document.documentElement.style.setProperty(`--${data.variable}`, data.value);
		},
		removeProp() {
			document.documentElement.style.removeProperty(`--${data.variable}`);
		},
		addFont() {
			const tag = document.querySelector(`#font-${data.index}`)
			if (!tag) {
				createEl('style', {
					id: `font-${data.index}`,
					className: 'customfont',
					innerText: data.text
				})
			} else {
				tag.innerHTML = data.text;
			}
		},
		removeFont() {
			removeEl(`#font-${data.index}`)
		},
		addAddon() {
			if (!document.querySelector(`.${data.class}`)) {
				createEl('style', {
					className: data.class,
					textContent: `@import url('${data.text}')`
				});
			}
		},
		removeAddon() {
			removeEl(`.${data.class}`);
		},
		toggleModal() {
			if (data.visible) {
				document.querySelector('#modal').classList.remove('HIDDEN');
				document.querySelector('#popout').classList.add('HIDDEN');
			} else {
				document.querySelector('#modal').classList.add('HIDDEN');
				document.querySelector('#popout').classList.remove('HIDDEN');
			}
		}
	}

	actions[data.action]?.();
})