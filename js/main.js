jQuery(document).ready(function($){
	//open/close mega-navigation
	$('.cd-dropdown-trigger').on('click', function(event){
		event.preventDefault();
		toggleNav();
	});

	//close meganavigation
	$('.cd-dropdown .cd-close').on('click', function(event){
		event.preventDefault();
		toggleNav();
	});

	// CORRECTION : Délégation d'événements pour les éléments créés dynamiquement
	// On mobile - open submenu (avec délégation d'événements)
	$(document).on('click', '.has-children > a', function(event){
		// Vérifier si on est en mode mobile (largeur < 1024px par exemple)
		if ($(window).width() < 1024) {
			event.preventDefault();
			var selected = $(this);
			selected.next('ul').removeClass('is-hidden').end().parent('.has-children').parent('ul').addClass('move-out');
		}
	});

	// CORRECTION : Fonction pour initialiser menuAim (appelée après chaque mise à jour du DOM)
	function initializeMenuAim() {
		var submenuDirection = (!$('.cd-dropdown-wrapper').hasClass('open-to-left')) ? 'right' : 'left';
		
		// Détruire l'instance précédente de menuAim s'il existe
		if ($('.cd-dropdown-content').data('menuAim')) {
			$('.cd-dropdown-content').data('menuAim', null);
		}
		
		$('.cd-dropdown-content').menuAim({
			activate: function(row) {
				$(row).children().addClass('is-active').removeClass('fade-out');
				if ($('.cd-dropdown-content .fade-in').length == 0) $(row).children('ul').addClass('fade-in');
			},
			deactivate: function(row) {
				$(row).children().removeClass('is-active');
				if ($('li.has-children:hover').length == 0 || $('li.has-children:hover').is($(row))) {
					$('.cd-dropdown-content').find('.fade-in').removeClass('fade-in');
					$(row).children('ul').addClass('fade-out');
				}
			},
			exitMenu: function() {
				$('.cd-dropdown-content').find('.is-active').removeClass('is-active');
				return true;
			},
			submenuDirection: submenuDirection,
		});
	}

	// Initialiser menuAim au chargement
	initializeMenuAim();

	// CORRECTION : Délégation d'événements pour le bouton "go-back"
	$(document).on('click', '.go-back', function(){
		var selected = $(this),
			visibleNav = $(this).parent('ul').parent('.has-children').parent('ul');
		selected.parent('ul').addClass('is-hidden').parent('.has-children').parent('ul').removeClass('move-out');
	});

	function toggleNav(){
		var navIsVisible = (!$('.cd-dropdown').hasClass('dropdown-is-active')) ? true : false;
		$('.cd-dropdown').toggleClass('dropdown-is-active', navIsVisible);
		$('.cd-dropdown-trigger').toggleClass('dropdown-is-active', navIsVisible);
		if (!navIsVisible) {
			$('.cd-dropdown').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
				$('.has-children ul').addClass('is-hidden');
				$('.move-out').removeClass('move-out');
				$('.is-active').removeClass('is-active');
			});	
		}
	}

	// NOUVEAU : Fonction globale pour réinitialiser les événements après mise à jour dynamique
	window.reinitializeDropdownEvents = function() {
		initializeMenuAim();
	};

	//IE9 placeholder fallback
	if(!Modernizr.input.placeholder){
		$('[placeholder]').focus(function() {
			var input = $(this);
			if (input.val() == input.attr('placeholder')) {
				input.val('');
		  	}
		}).blur(function() {
		 	var input = $(this);
		  	if (input.val() == '' || input.val() == input.attr('placeholder')) {
				input.val(input.attr('placeholder'));
		  	}
		}).blur();
		$('[placeholder]').parents('form').submit(function() {
		  	$(this).find('[placeholder]').each(function() {
				var input = $(this);
				if (input.val() == input.attr('placeholder')) {
			 		input.val('');
				}
		  	})
		});
	}
});
