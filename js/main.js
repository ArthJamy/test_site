jQuery(document).ready(function($){

    // --------------------------
    // Mobile : ouvrir/fermer sous-menu
    // --------------------------
    $('.cd-dropdown-content').on('click', '.has-children > a', function(event){
        // uniquement sur mobile
        if ($(window).width() < 1024) { 
            event.preventDefault();
            var selected = $(this);
            selected.next('ul').removeClass('is-hidden')
                    .end().parent('.has-children')
                    .parent('ul').addClass('move-out');
        }
    });

    // Mobile : bouton "Retour" dans sous-menu
    $('.cd-dropdown-content').on('click', '.go-back', function(){
        var selected = $(this),
            visibleNav = $(this).parent('ul').parent('.has-children').parent('ul');
        selected.parent('ul').addClass('is-hidden')
                .parent('.has-children')
                .parent('ul').removeClass('move-out');
    });

    // --------------------------
    // Toggle menu principal
    // --------------------------
    function toggleNav(){
        var navIsVisible = ( !$('.cd-dropdown').hasClass('dropdown-is-active') ) ? true : false;
        $('.cd-dropdown').toggleClass('dropdown-is-active', navIsVisible);
        $('.cd-dropdown-trigger').toggleClass('dropdown-is-active', navIsVisible);

        if( !navIsVisible ) {
            $('.cd-dropdown').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
                $('.has-children ul').addClass('is-hidden');
                $('.move-out').removeClass('move-out');
                $('.is-active').removeClass('is-active');
            });    
        }
    }

    // ouvrir/fermer menu via trigger
    $('.cd-dropdown-trigger').on('click', function(event){
        event.preventDefault();
        toggleNav();
    });

    // fermer menu via bouton close
    $('.cd-dropdown .cd-close').on('click', function(event){
        event.preventDefault();
        toggleNav();
    });

    // --------------------------
    // Desktop : menuAim
    // --------------------------
    var submenuDirection = ( !$('.cd-dropdown-wrapper').hasClass('open-to-left') ) ? 'right' : 'left';
    $('.cd-dropdown-content').menuAim({
        activate: function(row) {
            $(row).children().addClass('is-active').removeClass('fade-out');
            if( $('.cd-dropdown-content .fade-in').length == 0 ) {
                $(row).children('ul').addClass('fade-in');
            }
        },
        deactivate: function(row) {
            $(row).children().removeClass('is-active');
            if( $('li.has-children:hover').length == 0 || $('li.has-children:hover').is($(row)) ) {
                $('.cd-dropdown-content').find('.fade-in').removeClass('fade-in');
                $(row).children('ul').addClass('fade-out')
            }
        },
        exitMenu: function() {
            $('.cd-dropdown-content').find('.is-active').removeClass('is-active');
            return true;
        },
        submenuDirection: submenuDirection,
    });

    // --------------------------
    // IE9 placeholder fallback
    // --------------------------
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
