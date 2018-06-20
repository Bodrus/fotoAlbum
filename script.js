window.onload = () => {
	const $allAlbumList = document.querySelector('.left');
	const $allAlbomsLeft = document.querySelectorAll('.catalog-left');
	const $gallery = document.querySelector('.gallery');
	const $catalogName = document.querySelector('.heading');
	const $description = document.querySelector('.catalog-description');

	const $formAddAlbum = document.querySelector('#add-album-form');
	const $inputAddAlbum = $formAddAlbum.querySelector('.submit');
	const $addAlbumBottom = document.querySelector('#add-album');

	const $dellAlbumBottom = document.querySelector('#delete-album');
	const $dellAlbomForm = document.querySelector('#del-album-form');
	const $dellBottomAlbumForm = $dellAlbomForm.querySelector('.submit');
	const $selectFormDellAlbum = document.querySelector('#select-form-dell-album');
	

	const greateNewOption = (name) => {
		const newOption = document.createElement('option');
		newOption.value = name;
		newOption.textContent = name;
		$selectFormDellAlbum.appendChild(newOption);
};
	
	const listNameAlboms = new Set();
	document.querySelectorAll('.albom-name').forEach(el => {
		listNameAlboms.add(el['textContent']);
		greateNewOption(el['textContent']);
	
	});
	

	
	


	const chengeGallery = (event) => {
		$gallery.innerHTML = '';
	
		const $hisBlock = event.target.closest('.catalog-left');
		const textNameCatalog = $hisBlock.querySelector('p').textContent;
		const textDescription = $hisBlock.querySelector('.description').textContent;
	
		$catalogName.innerHTML = `<h1 class="heading">${textNameCatalog}<h1>`;
		$description.textContent = textDescription;

		const imgSelectors = $hisBlock.querySelectorAll(['img']);
		imgSelectors.forEach(el => {
			const newDiv = document.createElement('div');
			newDiv.classList.add('gallery-item');
			newDiv.innerHTML = `<img class="gallery-image" src="${el['src']}" alt="">`;
			newDiv.addEventListener('click', showBigImage);
			$gallery.append(newDiv);
	});
  };

	
	const showBigImage = ({target}) => {
		const show = document.querySelector('.show');
		const src = target.src;
		const imgShow = document.querySelector('.img-show');
		const img = imgShow.querySelector('img');
		const span = imgShow.querySelector('span');

		img.src = src;
		show.style.display = 'block';	

		span.addEventListener('click', (() => show.style.display = 'none'));
	};

	const greateNewAlbum = (name, description = null) => {
		const newDiv = document.createElement('div');
		newDiv.classList.add('catalog-left');
		const newP = document.createElement('p');
		newP.classList.add('albom-name');
		newP.textContent = name;
		const newPdescription = document.createElement('p');
		newPdescription.classList.add('description');
		if (description) {
			newPdescription.textContent = description;
		}
		newDiv.appendChild(newP);
		newDiv.appendChild(newPdescription);
		newDiv.addEventListener('click', chengeGallery);

		return newDiv;
	};



	
	
	const addAlbum = () => {
		document.querySelectorAll('.albom-name').forEach(el => listNameAlboms.add(el['textContent']));

		const input = document.querySelector('#dell-catalog-input-name');
		const textarea = document.querySelector('#dell-catalog-textarea-description');
		
		if (input.value && !listNameAlboms.has(input.value)) {
			const newAlbumList = greateNewAlbum(input.value, textarea.value);
			greateNewOption(input.value);
			$allAlbumList.appendChild(newAlbumList);


			input.value = '';
			textarea.value = '';
		}
		// введите имя альбома!!!! или имена дублируются
	};

	const dellAlbom = () => {
		$dellAlbomForm.querySelectorAll('option').forEach(el => {
			if (el.selected) {
				$allAlbomsLeft.forEach(elem => {
					if (elem.querySelector('.albom-name').textContent === el.value) {
						 elem.remove();
					}
				})
			}
		})	
	};


	
	$allAlbomsLeft.forEach(el => {
		el.addEventListener('click', chengeGallery);
	});

	$addAlbumBottom.addEventListener('click', (() => {
		$formAddAlbum.classList.toggle('open-close');
		

	}));

	$inputAddAlbum.addEventListener('click', addAlbum);

	$dellAlbumBottom.addEventListener('click', (() => {
		$dellAlbomForm.classList.toggle('open-close');
		

	}));

	$dellBottomAlbumForm.addEventListener('click', dellAlbom);

};







