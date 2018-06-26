window.onload = () => {
	
	
	
	
const listNameAlboms = []; // список существующих альбомов


											// УДАЛЕНИЕ ФОТОГРАФИИ ИЗ АЛЬБОМА //
const checket = ({target}) => {
	target.parentElement.classList.toggle('checket');
	target.parentElement.classList.toggle('foto');
};

const addFotoToDelFotoForm = () => {
	const contenerDellFoto = document.querySelector('.contener-dell-foto');
	document.querySelector('.center').querySelectorAll('img').forEach(el => {
		const srcFoto = el.src;
		const newDiv = document.createElement('div');
		newDiv.classList.add('foto');
		newDiv.addEventListener('click', checket);
		newDiv.innerHTML = `<img src=${srcFoto} alt="">`;
		contenerDellFoto.appendChild(newDiv);
	})	
};

const dellFoto = () => {
	const arrFotoSrcChecket = [];
	document.querySelector('.center').classList.toggle('hiden');
	document.querySelectorAll('.checket img').forEach(el => {
		console.log(el.src);
		 arrFotoSrcChecket.push(el.src);
	});

	const nameAlbumChecket = document.querySelector('.heading').textContent;
	

	document.querySelectorAll('.albom-name').forEach(el => {
		if (el.textContent === nameAlbumChecket) {
			el.parentElement.querySelectorAll('img').forEach(el => {
				if (arrFotoSrcChecket.includes(el.src)) {
					el.remove();
				}
			})
		}
	});

	const contenerFotoCentr = document.querySelector('.contener-dell-foto');
	contenerFotoCentr.querySelectorAll('img').forEach(el => {
		if (arrFotoSrcChecket.includes(el.src)) {
			document.querySelector('.gallery-item').remove()	
		}
	});
	
	clearFormDellFoto();
};

const clearFormDellFoto = () => {
	document.querySelector('#del-foto-form').classList.toggle('open-close');
	document.querySelector('.center').classList.toggle('hiden');
	const contenerDellFoto = document.querySelector('.contener-dell-foto');
	contenerDellFoto.innerHTML = '';
};
											// END //

												// ДОБАВЛЕНИЕ ФОТОГРАФИИ в АЛЬБОМ //
	const clearFormAddFoto = () => {
		document.querySelector('#add-foto-input-name').value = '';
	};
	
	const addFoto = () => {
		const url = document.querySelector('#add-foto-input-name').value;

		if (document.querySelector('#firstDescription')) {
			document.querySelector('.heading').textContent = '<-- ВЫБЕРЕТЕ НУЖНЫЙ АЛЬБОМ!!';
			document.querySelector('.heading').style.color = 'red';
			return;
		} else if (!url) {
			document.querySelector('.heading').textContent = 'ВЫБЕРЕТЕ НУЖНОЕ ФОТО!!';
			document.querySelector('.heading').style.color = 'red';
			return;
		}
		
		const nameActivAlbum = document.querySelector('.heading').textContent;
		
		document.querySelectorAll('.albom-name').forEach(el => {
			if (el.textContent === nameActivAlbum) {
				const newImg = document.createElement('img');
				newImg.src = url;
				newImg.alt = "";
				el.parentElement.appendChild(newImg);

				const newDiv = document.createElement('div');
				newDiv.classList.add('gallery-item');
				newDiv.innerHTML = `<img class="gallery-image" src="${url}" alt="">`;
				newDiv.addEventListener('click', showBigImage);
				document.querySelector('.gallery').append(newDiv);
			}
		});
		clearFormAddFoto()
	};									

												// END //


	
                       // УДАЛЕНИЕ  АЛЬБОМА /////

	// Функция создания и добовления елемнта OPTION в родительский select dell.
	const greateNewOptionDell = (name) => {
		const newOption = document.createElement('option');
		newOption.value = name;
		newOption.textContent = name;
		document.querySelector('#select-form-dell-album').appendChild(newOption);
	};
// Функция создания и добовления елемнта OPTION в родительский select edit.
	const greateNewOptionEdit = (name) => {
		const newOption = document.createElement('option');
		newOption.value = name;
		newOption.textContent = name;
		document.querySelector('#select-form-edit-album').appendChild(newOption);	
	};
	// Удалить OPTION из select DELL
	const deleteOptionDell = (name) => {
		const selected = document.querySelector('#select-form-dell-album').querySelectorAll('option');
		
		selected.forEach(el => {
			if (el.value === name) {
				document.querySelector('#select-form-dell-album').removeChild(el);
			}
		})
	};



// Удалить OPTION из select Edit
	const deleteOptionEdit = (name) => {
    document.querySelector('#select-form-edit-album').querySelectorAll('option').forEach(el => {
			if (el.value === name) {
				document.querySelector('#select-form-edit-album').removeChild(el);
			}
		});
		 
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

	
	
	//////////////////////////////////////////////////////////////////////////////////////////////////////////




// Проходимся по коллекции OPTION, выбираем элемент выбранный в форме для удаления
	const deleteAlbum = () => {
		let nameCheckOption;
		// определяем выбранное имя альбома в форме для удаления и записываем его в переменную
		document.querySelector('#select-form-dell-album').querySelectorAll('option').forEach(el => {
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
		});

		if (document.querySelector('.heading').textContent === nameCheckOption) {
			document.querySelector('.albumName').innerHTML = '<p class="heading" id="firstDescription">Учебный проект - фотогалерея. <br>Максим Бодрус</p>';
			document.querySelector('.gallery').innerHTML = '';
		}
	};
	

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
		} else {
			document.querySelector('.heading').textContent = 'ТАКОЙ АЛЬБОМ УЖЕ СУЩЕСТВУЕТ!!';
			document.querySelector('.heading').style.color = 'red';
			return;
		}
		
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

const DisplayingListOfPhotos = ({target}) => {
	const $gallery = document.querySelector('.gallery');
	const $catalogName = document.querySelector('.albumName');
	const $description = document.querySelector('.catalog-description');
	$gallery.innerHTML = '';
	
	const $hisBlock = target.closest('.catalog-left');
	const textNameCatalog = $hisBlock.querySelector('p').textContent;
	const textDescription = $hisBlock.querySelector('.description').textContent;
	
	$catalogName.innerHTML = `<p class="heading">${textNameCatalog}<p>`;
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
///// Функция очистки формы /////
const clearFormEdit = () => {
	document.querySelector('#edit-catalog-input-name').value = '';
	document.querySelector('#edit-catalog-textarea-description').value = '';
};
///// Получаем текущие данные альбома /////
const getAlbumDetails = () => {
	let nameCheckOption;

	document.querySelector('#select-form-edit-album').querySelectorAll('option').forEach(el => {
		if (el.selected) {
			nameCheckOption = el.value;		
		}
		clearFormEdit();
	});
	
	document.querySelectorAll('.catalog-left').forEach(el => {
		
		if (el.firstElementChild.textContent === nameCheckOption) {
			
			const name = el.querySelector('.albom-name').textContent;
			const description = el.querySelector('.description').textContent;
			
			document.querySelector('#edit-catalog-input-name').value = name;
			if (!description) {
				document.querySelector('#edit-catalog-textarea-description').value = 'нет описания';
			} else {
				document.querySelector('#edit-catalog-textarea-description').value = description;
			}
		}
	});		
};

///////// Меняем на новые данные альбома /////////////
const editAlbom = () => {
	let nameCheckOption;
		document.querySelector('#select-form-edit-album').querySelectorAll('option').forEach(el => {
			 if (el.selected) {
				 nameCheckOption = el.value;
			 }
	});
	document.querySelectorAll('.catalog-left').forEach(el => {
		if (el.firstElementChild.textContent === nameCheckOption) {
			const newName = document.querySelector('#edit-catalog-input-name').value 
				? document.querySelector('#edit-catalog-input-name').value 
				: 'Альбом без имени';
			
			const newDescription = document.querySelector('#edit-catalog-textarea-description').value;
			el.firstElementChild.textContent = newName;
			el.querySelector('.description').textContent = newDescription;

			if (newName !== nameCheckOption) {
				deleteInlistNameAlboms(nameCheckOption); // удаляем старое имя из масива имен фотоальбомов
				listNameAlboms.push(newName); // добовляем новое имя в масив имен фотоальбомов
				greateNewOptionDell(newName); // создаем  новый OPTION Dell
				greateNewOptionEdit(newName); // создаем новый OPTION Edit
				deleteOptionDell(nameCheckOption); // удаляем старый dell option из формы
				deleteOptionEdit(nameCheckOption); // удаляем старый edit option из формы
				document.querySelector('.heading').textContent = newName;
			}
			document.querySelector('.catalog-description').textContent = newDescription;

			clearFormEdit();
		}
	});

	

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
	// редактируем форму - закрываем форму для редактирования альбома
	document.querySelector('#edit-button-close').addEventListener('click', (() => {
		document.querySelector('#edit-album-form').classList.toggle('open-close');
	}));
	// редактируем форму - навесить событие очистки формы на кнопку ОТМЕНА
	document.querySelector('#edit-button-close').addEventListener('click', clearFormEdit);
	
	// редактируем форму - получаем описание альбома
	document.querySelector('#button-edit-choose').addEventListener('click', getAlbumDetails);

	// редактируем форму - меняем данные альбома
	document.querySelector('#button-edit').addEventListener('click', editAlbom);

	// ддобавляем фотографию - навесить событие на кнопку добавления фотографии
	document.querySelector('#add-foto').addEventListener('click', (() => {
		document.querySelector('#add-foto-form').classList.toggle('open-close');
	}));


	// добавляем фотографию - навесить событие на кнопку "добавить" в форме добавления фотографии
	document.querySelector('#button-add-foto').addEventListener('click', addFoto);

	document.querySelector('#button-add-foto').addEventListener('click', (() => {
		document.querySelector('#add-foto-form').classList.toggle('open-close');
	}));
	//добавляем фотографию - навесить событие на кнопку ОТМЕНА
	document.querySelector('#button-close-form-foto').addEventListener('click', (() => {
		document.querySelector('#add-foto-form').classList.toggle('open-close');
	}));
	document.querySelector('#button-close-form-foto').addEventListener('click', clearFormAddFoto);

	// удалить фотографию - навесить событие на кнопку удаления фотографии
	document.querySelector('#delete-foto').addEventListener('click', (() => {
		if (document.querySelector('#firstDescription')) {
			document.querySelector('.heading').textContent = '<-- ВЫБЕРЕТЕ НУЖНЫЙ АЛЬБОМ!!';
			document.querySelector('.heading').style.color = 'red';
			return;
		}
		document.querySelector('#del-foto-form').classList.toggle('open-close');
		document.querySelector('.center').classList.toggle('hiden');
		addFotoToDelFotoForm();
	}));
	//удалить фотографию - навесить событие на кнопку удалить в форме удаления
	document.querySelector('#button-dell-foto').addEventListener('click', dellFoto);
	document.querySelector('#button-dell-foto').addEventListener('click', clearFormDellFoto);

	

	document.querySelector('#button-dell-foto').addEventListener('click', (() => {
		document.querySelector('#del-foto-form').classList.toggle('open-close');	
	}));

	document.querySelector('#button-close-foto').addEventListener('click', clearFormDellFoto);



};






