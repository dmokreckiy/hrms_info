var datagrid = {
  init : function() {
    $('input[type=checkbox]').click(function() {
      if (this.checked)
        $(this).parent().parent().addClass('active');
      else
        $(this).parent().parent().removeClass('active');
      var length = datagrid.checked();
      if (length > 0) {
        $("#view, #edit, #delete").prop('disabled', false);
      } else {
        $("#view, #edit, #delete").prop('disabled', true);
      }
    });
        
    $("#view").click(function() {
      if (datagrid.checked() === 0 || datagrid.checked() > 1) {
        $("body").modalWindow({
          action: "message",
          title: "View",
          text: datagrid.checked() === 0 ? "At least one page should be selected" : "You cannot preview several pages"
        })
      } else {
        window.open(window.location.pathname + "/" + datagrid.ids() + "/view", "_blank");
      }
    });
    
    $("#edit").click(function() {
      if (datagrid.checked() === 0 || datagrid.checked() > 1) {
        $("body").modalWindow({
          action: "message",
          title: "Edit",
          text: datagrid.checked() === 0 ? "At least one page should be selected" : "You cannot edit several pages"
        })
      } else {
        window.location.href = window.location.pathname + "/" + datagrid.ids() + "/edit";
      }
    });
    
    $("#delete").click(function() {
      var length = datagrid.checked();
      if (length!= 0) {
        var pt=datagrid.pagetitle();
        $("body").modalWindow({
          action : "cancel",
          title : "Delete pages",
          text : "Are you sure you want to delete the following "+ (length > 1 ? "pages?" : "page?") + pt.items + "",
          onAgree : function() {
            var ref = window.location.pathname + "/" + pt.ids + '/delete';
            window.location.href = ref;
            // $(".footer").before("<form id='deletePages' name='deletePages' method='POST' action='/pages/delete' style='visibility:hidden'><input type='text' id='ids' name='ids' value='"+ pt.ids +"' /><button type='submit' name='form_datagrid' id='form_datagrid' value=''></button></form>");
            // $("#deletePages").submit();
          }
        });
      }
    });
  },
  
  checked : function() {
    return $('input[type=checkbox]:checked').size();
  },
  
  ids : function() {
    var elem = $('input[type=checkbox]:checked').first();
    return $(elem).val();
  },
  
  pagetitle : function() {
    var items = "<ul class='items-list'>", id = [];
    $('input[type=checkbox]:checked').each(function() {
      items += "<li>" + $(this).parent().next().text() + "</li>";
      id.push($(this).val());
    });
    return {
      ids : id.join("-"),
      items : items + "</ul>"
    };
  }
};
$(document).ready(function () {
  datagrid.init();
}); 