$(document).ready(function() {

  util.init();
  
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
// ------------------------------------------------------- // 
});

var util = {

  init : function() {
    var that = this;
    $('.attach-list').empty();
    
    $.ajax({
      type : "GET",
      global : false,
      url : "api/competences",
      dataType : "json",
      success : function(data) {
          util.build(data);
      },
      //error : function(xhr, message) {
      //  window.location.href = "/rms-info/error/ajax?type=" + message;
      //}
    });
  },  

  build : function(data) {
      var list = '<ul>';
      
      $.each(data.competences, recurse);
      function recurse(key, val) {
        list += "<li" + (val.competences.length == 0 ? "class='last'" : "") + "><span>" + (val.competences.length != 0 ? "<i class='icon-plus'></i> " : "") + val.name + "</span>" + "</li>";
        if (val.competences.length != 0) {
          list += "<ul>";
          $.each(val.competences, recurse);
          list += "</ul>";
        }
      };

      $('.attach-list').html(list + "</ul>");
      this.attach();
  },

};