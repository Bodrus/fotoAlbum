window.onload = () => {
	
	const $selectFormDellAlbum = document.querySelector('#select-form-dell-album'); // в форме(новом окне) выбираем родителя для OPTION dell
	const $selectFormEditAlbum = document.querySelector('#select-form-edit-album'); // в форме(новом окне) выбираем родителя для OPTION edit
	
	const listNameAlboms = []; // список существующих альбомов
	
                       // УДАЛЕНИЕ  АЛЬБОМА /////

	// Функция создания и добовления елемнта OPTION в родительский select dell.
	const greateNewOptionDell = (name) => {
		const newOption = document.createElement('option');
		newOption.value = name;
		newOption.textContent = name;
		$selectFormDellAlbum.appendChild(newOption);
	};
// Функция создания и добовления елемнта OPTION в родительский select edit.
	const greateNewOptionEdit = (name) => {
		const newOption = document.createElement('option');
		newOption.value = name;
		newOption.textContent = name;
		$selectFormEditAlbum.appendChild(newOption);	
	};
	// Удалить OPTION из select DELL
	const deleteOptionDell = (name) => {
		const selected = $selectFormDellAlbum.querySelectorAll('option');
		
		selected.forEach(el => {
			if (el.value === name) {
				$selectFormDellAlbum.removeChild(el);
			}
		})
	};

// Удалить OPTION из select Edit
	const deleteOptionEdit = (name) => {
    document.querySelector('#select-form-edit-album').querySelectorAll('option').forEach(el => {
			if (el.value === name) {
				document.querySelector('#select-form-edit-album').removeChild(el);
			}
		})
		 
	};

	// Удалить имя альбома из мисива всех альбомов
	const deleteInlistNameAlboms = (name) => {
		const pos = listNameAlboms.indexOf(name);
		listNameAlboms.splice(pos, 1);	
	};
	
	// Запускается при загрузке страници ///////////////////////////////////////////////////////////////
	document.querySelectorAll('.albom-name').forEach(el => {  // перебор всех имен АЛЬБОМОВ
		listNameAlboms.push(el['textContent']); // Добовление имени АЛЬБОМА в массив
		greateNewOptionDell(el['textContent']); // Добовляем Имя Альбома в OPTION dell
		greateNewOptionEdit(el['textContent']); // Добовляем Имя Альбома в OPTION edit
	});

	console.log(listNameAlboms)
	
	//////////////////////////////////////////////////////////////////////////////////////////////////////////

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
				deleteOptionDell(pText);
				deleteInlistNameAlboms(pText);
				deleteOptionEdit(pText);
				
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
		newDiv.addEventListener('click', DisplayingListOfPhotos);
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
			greateNewOptionDell(name);
			greateNewOptionEdit(name);

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

const DisplayingListOfPhotos = (event) => {
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

//////////////  END   /////////////

////// Редактировать Альбом  /////////////
///// Получаем текущие данные альбома /////
const getAlbumDetails = () => {
	let nameCheckOption;

	$selectFormEditAlbum.querySelectorAll('option').forEach(el => {
			 if (el.selected) {
				 nameCheckOption = el.value;
			 }
	});
	console.log(nameCheckOption)
	document.querySelectorAll('.catalog-left').forEach(el => {
		console.log(el)
		if (el.firstElementChild.textContent === nameCheckOption) {
			const name = el.querySelector('.albom-name').textContent;
			const description = el.querySelector('.description').textContent;
			console.log(name)
			document.querySelector('#edit-catalog-input-name').value = name;
			document.querySelector('#edit-catalog-textarea-description').value = description;
		}
	})		
};
///////// Меняем на новые данные альбома /////////////
const editAlbom = () => {
	let nameCheckOption;
		$selectFormEditAlbum.querySelectorAll('option').forEach(el => {
			 if (el.selected) {
				 nameCheckOption = el.value;
			 }
	});
	document.querySelectorAll('.catalog-left').forEach(el => {
		if (el.firstElementChild.textContent === nameCheckOption) {
			const newName = document.querySelector('#edit-catalog-input-name').value;
			const newDescription = document.querySelector('#edit-catalog-textarea-description').value;
			el.firstElementChild.textContent = newName;
			el.querySelector('.description').textContent = newDescription;
			deleteInlistNameAlboms(nameCheckOption); // удаляем старое имя из масива имен фотоальбомов
			listNameAlboms.push(newName); // добовляем новое имя в масив имен фотоальбомов
			
			greateNewOptionDell(newName); // создаем  новый OPTION Dell
			greateNewOptionEdit(newName); // создаем новый OPTION Edit
			
			deleteOptionDell(nameCheckOption); // удаляем старый dell option из формы
			deleteOptionEdit(nameCheckOption); // удаляем старый edit option из формы

			document.querySelector('#edit-catalog-input-name').value = '';
			document.querySelector('#edit-catalog-textarea-description').value = '';

		}
	});

	console.log(nameCheckOption);

	// закрываем форму для редактирования альбома
	document.querySelector('#edit-album-form').classList.toggle('open-close');	
};

/////////////  END   /////////




/////////////  Навешивание событий ////////////////

	document.querySelectorAll('.catalog-left').forEach(el => {
		el.addEventListener('click', DisplayingListOfPhotos);
	});

  //  Открываем форму для удаления каталога
	document.querySelector('#delete-album').addEventListener('click', (() => {
		document.querySelector('#del-album-form').classList.toggle('open-close');
	}));
	///

	/// закрываем форму удаления альбомов
	document.querySelector('#button-close').addEventListener('click', (() => {
		document.querySelector('#del-album-form').classList.toggle('open-close');
	}));
	///
	
	/// удаляем выбрынный альбом
	document.querySelector('#button-dell').addEventListener('click', deleteAlbum);
	///


	/// открываем форму добовления альбома
	document.querySelector('#add-album').addEventListener('click', (() => {
		document.querySelector('#add-album-form').classList.toggle('open-close');
	}));
	// закрываем форму
	document.querySelector('#add-button-close').addEventListener('click', (() => {
		document.querySelector('#add-album-form').classList.toggle('open-close');
	}));
	// навешиваем событие на добовление альбома
	document.querySelector('#button-add').addEventListener('click', addAlbum);

	// открываем форму для редактирования альбома
	document.querySelector('#edit-album').addEventListener('click', (() => {
		document.querySelector('#edit-album-form').classList.toggle('open-close');
	}));
	// закрываем форму для редактирования альбома
	document.querySelector('#edit-button-close').addEventListener('click', (() => {
		document.querySelector('#edit-album-form').classList.toggle('open-close');
	}));
	
 // редактируем форму - получаем описание альбома
 document.querySelector('#button-edit-choose').addEventListener('click',getAlbumDetails);

 // редактируем форму - меняем данные альбома
 document.querySelector('#button-edit').addEventListener('click', editAlbom);

};






