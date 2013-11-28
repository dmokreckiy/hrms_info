$(document).ready(function() {
// ------------------- NOT AJAX -------------------------- //
    $(".select-list span").on('click', function() {
      var clickItem = $(this);
      var that = clickItem.text();

      $(".select-line").removeClass('select-line');
      clickItem.toggleClass('select-line');
      clickItem.parent().find('i').toggleClass('icon-plus').toggleClass('icon-minus');
      clickItem.parent().next('ul').toggleClass('active');

		/* root competences expand handler */
      if (clickItem.parent().parent().parent().hasClass('attach-list')) {
        $(".attach-list>ul>li>span").each(function() {
          if (that !== $(this).text()) {
            $(this).parent().find('i').addClass('icon-plus').removeClass('icon-minus');
            $(this).parent().next('ul').removeClass('active');
            $(this).parent().children(".active").removeClass('active');
          }
        });
      }
    });
	
});