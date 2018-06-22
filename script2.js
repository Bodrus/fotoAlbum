

window.onload = () => {
	
	const $selectFormDellAlbum = document.querySelector('#select-form-dell-album'); // в форме(новом окне) выбираем родителя для OPTION 
	const $allAlbomsLeft = document.querySelectorAll('.catalog-left');
	const listNameAlboms = []; // список существующих альбомов
	
                       // УДАЛЕНИЕ  АЛЬБОМА /////

	// Функция создания и добовления елемнта OPTION в родительский select.
	const greateNewOption = (name) => {
		const newOption = document.createElement('option');
		newOption.value = name;
		newOption.textContent = name;
		$selectFormDellAlbum.appendChild(newOption);
	};
	// Удалить OPTION из select
	const deleteOption = (name) => {
		const selected = $selectFormDellAlbum.querySelectorAll('option');
		selected.forEach(el => {
			if (el.value === name) {
				$selectFormDellAlbum.removeChild(el);
			}
		})
	};
	// Удалить имя OPTION из мисива всех альбомов
	const deleteInlistNameAlboms = (name) => {
		const pos = listNameAlboms.indexOf(name);
		listNameAlboms.splice(pos, 1);	
	};
	
	// Запускается при загрузке страници
	document.querySelectorAll('.albom-name').forEach(el => {  // перебор всех имен АЛЬБОМОВ
		listNameAlboms.push(el['textContent']); // Добовление имени АЛЬБОМА в массив
		greateNewOption(el['textContent']); // Добовляем Имя Альбома в OPTION
	});

  console.log(listNameAlboms)

// Проходимся по коллекции OPTION, выбираем элемент выбранный в форме для удаления
	const deleteAlbum = () => {
		let nameCheckOption;
		// определяем выбранное имя альбома в форме для удаления и записываем его в переменную
		$selectFormDellAlbum.querySelectorAll('option').forEach(el => {
			if (el.selected) {
				nameCheckOption = el.value;
			}
		});
		
		document.querySelectorAll('.catalog-left').forEach(el => {
			const pText = el.firstElementChild.textContent;
			if (pText === nameCheckOption) {
				document.querySelector('.left').removeChild(el);
				deleteOption(pText);
				deleteInlistNameAlboms(pText);
			}
		})
	};
	console.log(listNameAlboms);

	/////////////////////////////////////////////////////////////////////////// end

/// Добавление Альбома ///

const addAlbum = () => {
	/// Создать новый альбом
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

	console.log(listNameAlboms)

		const input = document.querySelector('#add-catalog-input-name');
		const textarea = document.querySelector('#add-catalog-textarea-description');
		const name = input.value;
		const description = textarea.value;

		if (name && !listNameAlboms.includes(name)) {
			const newAlbum = greateNewAlbum(name, description);
			document.querySelector('.left').appendChild(newAlbum);
			greateNewOption(name);
			listNameAlboms.push(name);
			input.value = '';
			textarea.value = '';	
		}
		console.log(listNameAlboms)
};
/////////////  END  ///////////

//// Отображение списка фотографий   /////
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

const chengeGallery = (event) => {
	const $gallery = document.querySelector('.gallery');
	const $catalogName = document.querySelector('.heading');
	const $description = document.querySelector('.catalog-description');
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
//DisplayingListOfPhotos

//////////////  END   /////////////
/////////////  Навешивание событий ////////////////

	$allAlbomsLeft.forEach(el => {
		el.addEventListener('click', chengeGallery);
	});

  //  Открываем форму для удаления каталога
	document.querySelector('#delete-album').addEventListener('click', (() => {
		document.querySelector('#del-album-form').classList.toggle('open-close');
	}));
	///

	/// удаляем выбрынный альбом
	document.querySelector('#button-dell').addEventListener('click', deleteAlbum);
	///
	
	/// закрываем форму удаления альбомов
	document.querySelector('#button-close').addEventListener('click', (() => {
		document.querySelector('#del-album-form').classList.toggle('open-close');
	}));
	///


	/// открываем форму добовления товара
	document.querySelector('#add-album').addEventListener('click', (() => {
		document.querySelector('#add-album-form').classList.toggle('open-close');
	}));
	// закрываем форму
	document.querySelector('#add-button-close').addEventListener('click', (() => {
		document.querySelector('#add-album-form').classList.toggle('open-close');
	}))
	// навешиваем событие на добовление альбома
	document.querySelector('#button-add').addEventListener('click', addAlbum);

};


