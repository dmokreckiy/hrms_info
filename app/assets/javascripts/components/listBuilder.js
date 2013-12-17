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
        
        /*$("#new").click(function() {
          window.location.href = window.location.pathname + "/add";
        });*/
        
        $("#view").click(function() {
            if (datagrid.checked() === 0 || datagrid.checked() > 1) {
                $("body").modalWindow({
                    action: "message",
                    title: "View",
                    text: datagrid.checked() === 0 ? "At least one page should be selected" : "You cannot preview several pages"
                  })
            } else {
                //alert(window.location.pathname + "/" + datagrid.ids() + "/view");
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
                //alert(window.location.pathname + "/" + datagrid.ids() + "/edit");
                window.location.href = window.location.pathname + "/" + datagrid.ids() + "/edit";
            }
          });
        
        $("#delete").click(function() {
      var length = datagrid.checked().length;
        if ( length!= 0) {
          var pt=datagrid.pagetitle();
  //        alert(pt.ids);
  //        alert(pt.items);
      /*$("body").modalWindow({
            action : "message",
            title : "Delete " + word[0],
            text : "At least one " + word[1] +" should be selected"
          });
        } else {*/
          $("body").modalWindow({
            action : "cancel",
            title : "Delete pages",
            text : "Are you sure you want to delete the following "+ (length > 1 ? "pages" : "page") + pt.items + "",
            onAgree : function() {
              var ref = window.location.pathname + "/"  + datagrid.ids() + '/delete';
              window.location.href = ref;
   //           $(".footer").before("<form id='deletePages' name='deletePages' method='POST' action='/pages/delete' style='visibility:hidden'><input type='text' id='ids' name='ids' value='"+ pt.ids +"' /><button type='submit' name='form_datagrid' id='form_datagrid' value=''></button></form>");
   //           $("#deletePages").submit();
             // alert(ref);
  /*            that.field.indexes = datagrid.checked().id;
              $.ajax({
                url : window.location.pathname + "/delete.do",
                data : that.field,
                type : "POST",
                success : function(data) {
                  checkbox.unCheckAll(true);
                  that.data = data;
                  that.init(that.url, that.fields);
                  that.field.indexes = 0;
                  if (data.undeleted != null && data.undeleted.length > 0) {
                    that.undeleted(data.undeleted, word);
                  }
                  else {
                    $('#edit').attr('disabled', 'disabled').addClass('disable');
                    $('#delete').attr('disabled', 'disabled').addClass('disable');
                    $('#view').attr('disabled', 'disabled').addClass('disable');
    //                                location.reload();
                  }
                }
              });*/
            }
          });
        }
      
      
    });
  },

      checked : function() {
        return $('input[type=checkbox]:checked').size();
      },

      ids: function() {
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
   //       ids : id.toString(),
          items : items + "</ul>"
        };
      }
};

$(document).ready(function () {
  datagrid.init();
});