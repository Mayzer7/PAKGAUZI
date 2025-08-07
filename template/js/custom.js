$(document).ready(function () {
	var quoteSwiper1 = new Swiper(".quote-slider-first", {
		direction: "vertical",
		effect: "slide",
		loop: false,
		allowTouchMove: false,
	});

	var $Speed = 1000;
	
	var imageSwiper1 = new Swiper(".image-slider-first", {
		mousewheel: true,
		speed: $Speed,
		loop: false,
		longSwipesRatio: 0.01,
		followFinger: true,
		grabCursor: true,
		watchSlidesProgress: true,
		parallax: true,
		lazy: {
			loadPrevNext: true,
		},
		navigation: {
			nextEl: ".org-slider-first .swiper-button-next",
			prevEl: ".org-slider-first .swiper-button-prev",
		},
		pagination: {
			el: ".org-slider-first .swiper-pagination",
			type: "bullets",
			clickable: true,
		},
		breakpoints: {
			100: {
				mousewheel: false,
			},
			1024: {
				mousewheel: true,
			},
		},
	});
	
	imageSwiper1.controller.control = quoteSwiper1;
	quoteSwiper1.controller.control = imageSwiper1;


  var quoteSwiper2 = new Swiper(".quote-slider-second", {
		direction: "vertical",
		effect: "slide",
		loop: false,
		allowTouchMove: false,
	});
	
	var $Speed = 1000;
	
	var imageSwiper2 = new Swiper(".image-slider-second", {
		mousewheel: true,
		speed: $Speed,
		loop: false,
		longSwipesRatio: 0.01,
		followFinger: true,
		grabCursor: true,
		watchSlidesProgress: true,
		parallax: true,
		lazy: {
			loadPrevNext: true,
		},
		navigation: {
			nextEl: ".org-slider-second .swiper-button-next",
			prevEl: ".org-slider-second .swiper-button-prev",
		},
		pagination: {
			el: ".org-slider-second .swiper-pagination",
			type: "bullets",
			clickable: true,
		},
		breakpoints: {
			100: {
				mousewheel: false,
			},
			1024: {
				mousewheel: true,
			},
		},
	});
	
	imageSwiper2.controller.control = quoteSwiper2;
	quoteSwiper2.controller.control = imageSwiper2;


	if($('[data-tabs=scheme-type]').length){
		const schemeTabs = new GraphTabs('scheme-type');
	}


	var schemeSwiper = new Swiper(".scheme-swiper", {
		direction: 'horizontal',
		slidesPerView: 1,
		mousewheel: true,
		speed: $Speed,
		loop: false,
		longSwipesRatio: 0.01,
		followFinger: true,
		grabCursor: true,
		watchSlidesProgress: true,
		parallax: true,
		lazy: {
			loadPrevNext: true,
		},
		observeParents: true,
		observer: true,
		observeSlideChildren: true,
		navigation: {
			nextEl: " .swiper-button-next",
			prevEl: " .swiper-button-prev",
		},
	});


	class ItcTabs {
		constructor(target, config) {
			const defaultConfig = {};
			this._config = Object.assign(defaultConfig, config);
			this._elTabs = typeof target === 'string' ? document.querySelector(target) : target;
			this._elButtons = this._elTabs.querySelectorAll('.tabs__btn');
			this._elPanes = this._elTabs.querySelectorAll('.tabs__pane');
			this._eventShow = new Event('tab.itc.change');
			this._init();
			this._events();
		}
		_init() {
			this._elTabs.setAttribute('role', 'tablist');
			this._elButtons.forEach((el, index) => {
				el.dataset.index = index;
				el.setAttribute('role', 'tab');
				this._elPanes[index].setAttribute('role', 'tabpanel');
			});
		}
		show(elLinkTarget) {
			const elPaneTarget = this._elPanes[elLinkTarget.dataset.index];
			const elLinkActive = this._elTabs.querySelector('.tabs__btn_active');
			const elPaneShow = this._elTabs.querySelector('.tabs__pane_show');
			if (elLinkTarget === elLinkActive) {
				return;
			}
			elLinkActive ? elLinkActive.classList.remove('tabs__btn_active') : null;
			elPaneShow ? elPaneShow.classList.remove('tabs__pane_show') : null;
			elLinkTarget.classList.add('tabs__btn_active');
			elPaneTarget.classList.add('tabs__pane_show');
			this._elTabs.dispatchEvent(this._eventShow);
			elLinkTarget.focus();
		}
		showByIndex(index) {
			const elLinkTarget = this._elButtons[index];
			elLinkTarget ? this.show(elLinkTarget) : null;
		};
		_events() {
			this._elTabs.addEventListener('click', (e) => {
				const target = e.target.closest('.tabs__btn');
				if (target) {
					e.preventDefault();
					this.show(target);
				}
			});
		}
	}

	if($('[data-tabs=scheme-type]').length){
	// инициализация .tabs как табов
	new ItcTabs('.tabs-info');
	new ItcTabs('.tabs-info-exp');
	$('.scheme__wrap').scrollLeft(100);
	}

	$('#feedback_tel').inputmask("+7 (999)-999-99-99");
	$('#feedback_date').inputmask("Дата: 99/99/9999");
	$('#feedback_time').inputmask("Время: 99:99");

	$('#feedback_tel_1').inputmask("+7 (999)-999-99-99");
	$('#feedback_date_1').inputmask("Дата: 99/99/9999");
	$('#feedback_time_1').inputmask("Время: 99:99");


	$('#feedback_date').on('change', function() {
		var inputDate = $(this).val();
		var trimmedString = inputDate.substring(6);
		var isValidDate = moment(trimmedString, "DD/MM/YYYY", true).isValid();
	
		if (!isValidDate) {
			// Очистка поля ввода или выполнение других действий при недопустимой дате
			$(this).val('');
			// Создание элемента <label>
			var errorLabel = $('<label>', {
				id: 'feedback_date-error',
				class: 'error',
				for: 'feedback_date',
				text: '! Неверная дата'
			});

			// Вставка элемента после #feedback_date
			$('#feedback_date').after(errorLabel);
		}
	});

	$('#feedback_time').on('change', function() {
		var inputTime = $(this).val();
		var trimmedString = inputTime.substring(7);
		var format = "HH:mm";
		var isValidTime = moment(trimmedString, format, true).isValid();
	
		if (!isValidTime) {
			$(this).val('');
			// Создание элемента <label> с сообщением об ошибке
			var errorLabel = $('<label>', {
				id: 'feedback_time-error',
				class: 'error',
				for: 'feedback_time',
				text: '! Неверное время'
			});
	
			// Вставка элемента после #feedback_time, если его еще нет
			$(this).after(errorLabel);
		}
	});

	$('#feedback_date_1').on('change', function() {
		var inputDate = $(this).val();
		var trimmedString = inputDate.substring(6);
		console.log(trimmedString)
		var isValidDate = moment(trimmedString, "DD/MM/YYYY", true).isValid();

		console.log(isValidDate)
	
		if (!isValidDate) {
			// Очистка поля ввода или выполнение других действий при недопустимой дате
			$(this).val('');
			// Создание элемента <label>
			var errorLabel = $('<label>', {
				id: 'feedback_date-error',
				class: 'error',
				for: 'feedback_date',
				text: '! Неверная дата'
			});

			// Вставка элемента после #feedback_date
			$(this).after(errorLabel);
		}
	});

	$('#feedback_time_1').on('change', function() {
		var inputTime = $(this).val();
		var trimmedString = inputTime.substring(7);

		var format = "HH:mm";

		var isValidTime = moment(trimmedString, format, true).isValid();
		// var isValidTime = moment().add(trimmedString, 'days').calendar();;
		console.log(isValidTime)
	
		if (!isValidTime) {
			$(this).val('');
			// Создание элемента <label> с сообщением об ошибке
			var errorLabel = $('<label>', {
				id: 'feedback_time-error_1',
				class: 'error',
				for: 'feedback_time_1',
				text: '! Неверное время'
			});
	
			// Вставка элемента после #feedback_time, если его еще нет
			$(this).after(errorLabel);
		}
	});
	
	
	function parseDMY(value) {
		var date = value.split("/");
		var d = parseInt(date[0], 10),
			m = parseInt(date[1], 10),
			y = parseInt(date[2], 10);
		return new Date(y, m - 1, d);
	}



	// Input file
	const inputs = document.querySelectorAll('.input__file');
	if (inputs) {
		Array.prototype.forEach.call(inputs, function (input) {
			let label = input.nextElementSibling,
				labelVal = label.querySelector('.input__file-button-text').innerText;
			input.addEventListener('change', function (e) {
				let countFiles = '';
				if (this.files && this.files.length >= 1) countFiles = this.files.length;
				if (countFiles)
					// label.querySelector('.input__file-button-text').innerText = 'Выбрано файлов: ' + countFiles;
					label.querySelector('.input__file-button-text').innerText = this.files[0].name;else label.querySelector('.input__file-button-text').innerText = labelVal;
			});
		});
	}

	const selectedOptions = document.querySelectorAll('.select-options li')

	selectedOptions.forEach((el) => {
		if (!el.getAttribute('rel')) {
			el.style.display = 'none'
		}
	})


	const inputFileWraps = document.querySelectorAll('.feedback__file')

	inputFileWraps.forEach((inputFileWrap) => {
		const inputHidden = inputFileWrap.querySelector('.feedback__input-fileval')
		const inputFile = inputFileWrap.querySelector('.input__file')

		inputFile.addEventListener('change', () => {

			if (inputFile.files.length != 0) {
				inputHidden.value = inputFile.files[0].name
			} else {
				inputHidden.value = null
			}
		})
	})


	$(document).on("change", ".input__file-1", function (e) {
		if (this.files.length != 0) {
			$('[name="file_input"], [name="feedback_prog"]').valid();
		}
	});

	$(document).on("change", ".input__file-2", function (e) {
		if (this.files.length != 0) {
			$('[name="file_input_1"], [name="feedback_prog_1"]').valid();
		}
	});


	$("#feedback_form").validate({
		ignore: ":hidden",
		errorPlacement: function(error, element) {
      if (element.attr("name") == "feedback_agree") {
        error.insertBefore(element);
      } else {
        error.insertAfter(element);
      }
    },
    rules: {
			feedback_name: "required",
			feedback_comp: "required",
			feedback_email: "required",
			feedback_tel: "required",
			feedback_title: "required",
			feedback_file: {
				extension: "png|jpeg|jpg|pdf|doc|docx|txt",
			},
			feedback_agree: "required",
			feedback_prog: {
				require_from_group: [1, '.input-group'],
			},
			file_input: {
				require_from_group: [1, '.input-group'],
			},
      
      // compound rule
      email: {
        required: true,
        email: true
      },
    },
    submitHandler: function(form) {
		submit_this_form(form)
    },

	messages: {
		feedback_name: "! Вы не заполнили это поле",
		feedback_comp: "! Вы не заполнили это поле",
		feedback_tel: "! Вы не заполнили это поле",
		feedback_file: "! Неверный формат",
		feedback_title: "! Вы не заполнили это поле",
		feedback_prog: {
			require_from_group: "! Заполните одно из полей"
		},
		feedback_agree: "! Вы не заполнили это поле",
		file_input: {
			require_from_group: "! Заполните одно из полей"
		},
		feedback_email: {
			required: "! Вы не заполнили это поле",
			email: "! Введите корректный адрес"
		}
	}
  });

/*
form 1 submission
 */
function submit_this_form(form){
	$('.sidebar-back, .sidebar').removeClass('show');
	$('.sidebar-back, .sidebar[data-sb="status_process"]').addClass('show');
	var formData = new FormData(form);
	var action = form.getAttribute('action');
	var method = form.getAttribute('method');
	$.ajax({
		type: method,
		url: action,
		data: formData,
		processData: false,
		contentType: false,
		dataType: "html",
		success: function(response){
			if(response==='success'){
				setTimeout(function(){
					$('.sidebar[data-sb="status_process"]').removeClass('show');
					$('.sidebar[data-sb="status_ok"]').addClass('show');
					form.reset();
					form.querySelector('.input__file-button-text').innerText = "Прикрепить файл"
				},1000);
			}
			if(response==='error'){
				setTimeout(function(){
					$('.sidebar[data-sb="status_process"]').removeClass('show');
					$('.sidebar[data-sb="status_fail"]').addClass('show');
					form.reset();
					form.querySelector('.input__file-button-text').innerText = "Прикрепить файл"
				},1000);
			}
		},
	});
	return false;
} 
 


	$("#feedback_form_1").validate({
		ignore: ":hidden",
		errorPlacement: function(error, element) {
      if (element.attr("name") == "feedback_agree1") {
        error.insertBefore(element);
      } else {
        error.insertAfter(element);
      }
    },
    rules: {
			feedback_name1: "required",
			feedback_comp1: "required",
			feedback_email1: "required",
			feedback_tel1: "required",
			feedback_file1: {
				extension: "png|jpeg|jpg|pdf|doc|docx|txt",
			},
			feedback_title1: "required",
			feedback_agree1: "required",
			feedback_prog1: {
				require_from_group: [1, '.input-group-1'],
			},
			file_input1: {
				require_from_group: [1, '.input-group-1'],
			},
      
      // compound rule
      email: {
        required: true,
        email: true
      },
    },
    submitHandler: function(form) {
		submit_this_form(form)
    },
		messages: {
			feedback_name1: "! Вы не заполнили это поле",
			feedback_comp1: "! Вы не заполнили это поле",
			feedback_tel1: "! Вы не заполнили это поле",
			feedback_file1: "! Неверный формат",
			feedback_title1: "! Вы не заполнили это поле",
			feedback_prog1: {
				require_from_group: "! Заполните одно из полей"
			},
			feedback_agree1: "! Вы не заполнили это поле",
			file_input_1: {
				require_from_group: "! Заполните одно из полей"
			},
			feedback_email1: {
				required: "! Вы не заполнили это поле",
				email: "! Введите корректный адрес"
			}
		}
  });


	$('.btn-tab-next').click(function() {
		const tabContainer = $(this).closest('.tabs__panel');
		const tabsPanes = tabContainer.find('.tabs__content .tabs__pane');
		const currentPane = tabContainer.find('.tabs__content .tabs__pane.tabs__pane_show');
	
		const currentIndex = tabsPanes.index(currentPane);
		const nextIndex = (currentIndex === tabsPanes.length - 1) ? 0 : currentIndex + 1;
	
		currentPane.removeClass('tabs__pane_show');
		tabsPanes.eq(nextIndex).addClass('tabs__pane_show');
	
		const tabsBtns = tabContainer.find('.scheme__svg .tabs__btn');
		const currentBtn = tabContainer.find('.scheme__svg .tabs__btn.tabs__btn_active');
	
		const currentBtnIndex = tabsBtns.index(currentBtn);
		const nextBtnIndex = (currentBtnIndex === tabsBtns.length - 1) ? 0 : currentBtnIndex + 1;
	
		currentBtn.removeClass('tabs__btn_active');
		tabsBtns.eq(nextBtnIndex).addClass('tabs__btn_active');
	
		return false; // Добавлено, чтобы предотвратить перезагрузку страницы при клике на кнопку
	});

	
	$('#feedback_form_1 .select-options li').click(function() {
		var selectedValue = $(this).text();
		console.log(selectedValue)
		
		if (selectedValue === 'Другое (напишите)') {
			$('#another-event_1').slideDown(); // Плавно показываем блок
			console.log(1)
		} else {
			$('#another-event_1').slideUp(); // Плавно скрываем блок
		}
	});

	$('#feedback_form .select-options li').click(function() {
		var selectedValue = $(this).text();
		console.log(selectedValue)
		
		if (selectedValue === 'Другое (напишите)') {
			$('#another-event').slideDown(); // Плавно показываем блок
			console.log(1)
		} else {
			$('#another-event').slideUp(); // Плавно скрываем блок
		}
	});


	// Скролл к якорям
	const smoothScrollLinks = document.querySelectorAll('.smooth-scroll');

	// Обходим все ссылки и добавляем обработчик события клика
	smoothScrollLinks.forEach(link => {
		link.addEventListener('click', smoothScroll);
	});

	// Функция для плавного скролла
	function smoothScroll(event) {
		event.preventDefault(); // Отменяем стандартное действие ссылки

		const targetId = this.getAttribute('href'); // Получаем идентификатор якоря
		const targetElement = document.querySelector(targetId); // Находим соответствующий элемент

		if (targetElement) {
			// Выполняем плавную прокрутку к элементу
			targetElement.scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		}
	}


	$('#feedback_form .honor-guests').change(function() {
		if ($(this).is(':checked')) {
			$('.guests').slideDown();
		} else {
			$('.guests').slideUp();
		}
	});

	$('#feedback_form_1 .honor-guests').change(function() {
		if ($(this).is(':checked')) {
			$('.guests').slideDown();
		} else {
			$('.guests').slideUp();
		}
	});


	// Show all btn
	const showMore = document.querySelector('.show-more');

	if (showMore) {
		const productsLength = document.querySelectorAll('.docs__item').length;
		let items = 4;
	
		showMore.addEventListener('click', () => {
			items = 9;
			const array = Array.from(document.querySelector('.docs__items ol').children);
			const visItems = array.slice(0, items)

			visItems.forEach(el => el.classList.add('is-visible'));

			if (visItems.length === productsLength) {
				showMore.style.display = 'none';
			}
		})
	}
	//content box simplebar
	if (document.querySelector('.sidebar-content')) {
		document.querySelector('.sidebar-content').parentNode.style.overflow = "hidden"
		new SimpleBar(document.querySelector('.sidebar-content'));
	}
	
})