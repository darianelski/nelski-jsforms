$(document).ready(function(){

	(function(){
		var commentFormCheck = {

			isValid: true,

			init: function() {
				//вызов внутренних функций
				this._setUpListeners(); //прослушка событий
			},

			_setUpListeners: function() {
				$('#comment-form').on('submit', commentFormCheck._validateForm).on('submit', commentFormCheck._sendEmail);	
			},

			// Проверка валидации
			_validateForm: function(event){
				event.preventDefault();
				console.log('_validateForm runs');

				var form = $(this),
						inputs = form.find('textarea'),
						valid = true;

				// проходим по каждому input
				$.each(inputs, function(index, val){
					var input = $(val),
							value = input.val().trim(),
							textError = $('#textError');

					if ( value.length === 0 ){
						// показать ошибку, если сообщение пустое
						textError.fadeIn(500);
						valid = false;
					}

						// скрыть ошибку по набору текста
						input.on('keydown', function(){
							textError.fadeOut();
						});
				});

				commentFormCheck.isValid = valid;
			},

			// Перенаправление при успешной отправке
			_sendEmail: function(){
				console.log('commentFormCheck.isValid = '+ commentFormCheck.isValid);
				if (commentFormCheck.isValid === true) {
					window.location.href = 'success.html';
				} 
			},
		};

	commentFormCheck.init();

	}());

});
