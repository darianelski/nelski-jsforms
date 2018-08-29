$(document).ready(function(){

	(function(){
		var registrationForm = {

			isValid: true,

			init: function() {
				//вызов внутренних функций
				this._setUpListeners(); //прослушка событий
				$("#notify--present").hide();
			},

			_setUpListeners: function() {
				$('#registration-form').on('submit', registrationForm._validateForm).on('submit', registrationForm._sendEmail);	
			},

			// Проверка валидации
			_validateForm: function(event){
				event.preventDefault();
				console.log('_validateForm runs');

				var form = $(this),
						inputs = form.find('input'),
						//_validEmail = 'mail@mail.com',
						valid = true;

				// проходим по каждому input
				$.each(inputs, function(index, val){
					var input = $(val),
							value = input.val().trim(),
							formGroup = input.parents('.input__wrap'),
							placeholder = input.find('placeholder').text().toLowerCase(),
							textError = 'Введите ' + input.attr('placeholder'),
							tooltip = $('<div class="notify notify--error mt-25 " id="notify">' + textError + '</div>');
					console.log(textError);
					if ( value.length === 0 ){
						// показать ошибку, если сообщение пустое
						//tooltip.insertBefore(input); 
						formGroup.find('#notify').remove();
						tooltip.prependTo(formGroup); 
						valid = false;
					} else {
						formGroup.find('#notify').remove();
					}

					// Проверка на валидность email 
					if (input.attr('type').toLowerCase() === 'email'){
						if (value !== '') {
							var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
							if(pattern.test(value)) {
		
								formGroup.find('#notify').remove();
								console.log('Email is VALID');
							} else {
								formGroup.find('#notify').remove();
								textError = 'Неверный формат email';
								tooltip = $('<div class="notify notify--error mt-25" id="notify">' + textError + '</div>');
								tooltip.prependTo(formGroup); 
								valid = false;
								console.log('Email is INVALID');
							}
						}
					}

					// Проверка на существующий email 
					let inpMail = $("input[type='email']").val(); 

					if(inpMail.toLowerCase() ==='mail@mail.com'){ 
					console.log('Упс, занято'); 
					$('#notify--present').show(); 
					valid = false; 

					} else if(inpMail.trim() === '') { 
					console.log('Введите данные!'); 
					valid = false; 
					}else{ 
					formGroup.find('#notify--present').remove(); 
					console.log('Свободно!'); 
					valid = true; 
					}


					// скрыть ошибку по клику на input
					input.on('focus', function(){
						formGroup.find('#notify').remove();
					});

				});

				registrationForm.isValid = valid;

			 },

			 _sendEmail: function(){
			 	console.log('registrationForm.isValid = '+ registrationForm.isValid);
			 	if (registrationForm.isValid === true) {
			 		console.log('Форма отправлена');
			 		window.location.href = 'success.html';
			 	} else {
			 		console.log('Что-то пошло не так');
			 	}
			 },



	};

	registrationForm.init();

	}());

});


