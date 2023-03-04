const el = {
	create(tag, attrs) {
		const el = Object.assign(document.createElement(tag), attrs);
		document.querySelector('head').appendChild(el);
	},
	remove(selector) {
		document.querySelectorAll(selector)?.forEach(el => el.remove());
	}
}

let {href} = window.location;
let url = new URL(href);
let file = url.searchParams.get('file');

const checkFile = async(file) => {
	try {
		const req = await fetch(file);
		console.log(req);
	} catch (error) {
		console.error(error);
	}
}

if (file) {
	const files = file.split('|');

	checkFile(file);
	
	files.forEach(file => {
		const link = document.createElement('link');
		link.setAttribute('rel', 'stylesheet');
		link.setAttribute('href', file);
		document.querySelector('head').appendChild(link);
	});
}

if (url.searchParams.get('lightTheme') === "true") {
	document.querySelector('html').classList.remove('theme-dark');
	document.querySelector('html').classList.add('theme-light');
}

window.addEventListener('message', event => {
	const data = JSON.parse(event.data);

	const actions = {
		setPreview() {
			document.querySelector('#preview').textContent = data.text;
		},
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
				el.create('style', {
					id: `font-${data.index}`,
					className: 'customfont',
					innerText: data.text
				})
			} else {
				tag.innerHTML = data.text;
			}
		},
		removeFont() {
			el.remove(`#font-${data.index}`)
		},
		addAddon() {
			if (!document.querySelector(`.${data.class}`)) {
				el.create('style', {
					className: data.class,
					textContent: `@import url('${data.text}')`
				});
			}
		},
		removeAddon() {
			el.remove(`.${data.class}`);
		},
		toggleModal() {
			if (data.visible) {
				document.querySelector('#modal').classList.remove('HIDDEN');
				document.querySelector('#popout').classList.add('HIDDEN');
			} else {
				document.querySelector('#modal').classList.add('HIDDEN');
				document.querySelector('#popout').classList.remove('HIDDEN');
			}
		},
		toggleTheme() {
			if (document.documentElement.classList.contains('theme-dark')) {
				document.querySelectorAll('.theme-dark')?.forEach(el => {
					el.classList.add('theme-light');
					el.classList.remove('theme-dark');
				});
			} else {
				document.querySelectorAll('.theme-light')?.forEach(el => {
					el.classList.add('theme-dark');
					el.classList.remove('theme-light');
				});
			}

		}
	}

	actions[data.action]?.();
})