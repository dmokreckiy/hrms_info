$(document).ready(function () {

   // $('#editor').wysiwyg();
    $("#nameValidate").find(".empty").remove();
    $('a[title]').tooltip({container: 'body'});

    $('.dropdown-menu input').click(
        function () {
            return false;
        }
    ).change(
        function () {
            $(this).parent('.dropdown-menu').siblings('.dropdown-toggle').dropdown('toggle');
        }
    ).keydown('esc',
        function () {
            this.value = '';
            $(this).change();
        }
    );

    activateValidate();
    showTab();

    initPopover("#name");
    initPopover("#description");
    initPopover("#url");
    initPopover("#keywords");

    $('.selectpicker').selectpicker();
    $('#action-save').on('mousedown', insertDefaults);

    $("#action-save").attr("disabled", false);

    /*$("#action-save").click(function () {
		$("body").modalWindow({
						action: "message",
						title: "Saved",
						text: "The page has been saved: " + $("#name").val(),
						onAgree: function () {
							if (type === "save") {
								window.location.href = "/rms-info/pages";
							}
						}
		});
	});*/
	
	// modalWindow unique name
	if ($(".alert-unique-name").length) {
		$(".alert-unique-name").css("display","none");
		$("body").modalWindow({
					action: "message",
					title: "Error",
					text: "The name " + $(".alert-unique-name").text() + " is not unique"
		});
	};
	
	// modalWindow unique url
	if ($(".alert-unique-url").length) {
		$(".alert-unique-url").css("display","none");
		$("body").modalWindow({
					action: "message",
					title: "Error",
					text: "Page with this url " + $(".alert-unique-url").text() + " already exist"
		});
	};
	
	// modal window correctly save the page
	if ($(".alert-save-name").length) {
		$(".alert-save-name").css("display","none");
		$("body").modalWindow({
					action: "message",
					title: "Saved",
					text: "The page has been saved: " + $(".alert-save-name").text()
		});
			return false;
	};
	
	$("#action-cancel").click(function () {
        redirect = function () {
            window.location.href = "/pages";
        };
        stayAtPage = function () {
            return false;
        };

        //modal on deleting
        $("body").modalWindow({
            action: "cancel",
            title: "Cancel",
            text: "Are you sure you want to exit without saving changes?",
            onAgree: redirect,
            onDisagree: stayAtPage
        })
    });
	
// --------------------- link ModalWindow start ---------------------- //
	var formChanged = false;
	$(".form input[type=text], .form input[type=checkbox], .form textarea").change(function(){
		formChanged = true;
	});
	$("a").click(function (event) {
		if(formChanged) {
			//modal on logo
			var href = $(this).prop("href");
			event.preventDefault();
			redirect = function () {
				window.location.href = href;
			};

			$("body").modalWindow({
				action: "cancel",
				title: "Redirect",
				text: "The information is not saved. Are you sure you want to leave the current page?",
				onAgree: redirect
			});
		}
	});
// ----------------------- link ModalWindow end ----------------------- //
		
    $("#action-save").click(function () {
        $('#name').removeClass('error-validate');
        $('#pageContent').val($('#editor').html());
        var sendData = $("#edit-properties").serialize();
      //addPage(sendData, 'save');
    });

    /*$("#action-apply").click(function () {
        $('#name').removeClass('error-validate');
        $('#pageContent').val($('#editor').html());
        var sendData = $("#edit-properties").serialize();
        addPage(sendData, 'apply');
    });*/


    $("#action-view").click(function () {
        var w = window.open();
        var html = $("#editor").html();
        w.document.writeln(html);
    });
});

//	insert default values of title or url
function insertDefaults() {

    var $titleInput = $('input[type="text"]').eq(0), $urlInput = $('input[type="text"]').eq(1), title = $titleInput.val(), url = $urlInput.val(), defaultTitle = $titleInput.attr('data-defaultName');

    //	Is title empty ?
    if (!title) {

        //	Is ulr empty ? than it become same as default title
        if (!url) {
            $urlInput.val('/' + defaultTitle.toLowerCase());
        }
        $titleInput.val(defaultTitle);
        return;
    }
    //	If title value is not null we use it in URL with some chars replacement
    if (!url && title) {
        $urlInput.val('/' + replaceForbiddenChars(title));
    }
    //	refactor title value to use it in url
    function replaceForbiddenChars(string) {
        var newStr = '', i = 0, l = string.length;
        for (i; i < l; i++) {

            switch (string.charCodeAt(i)) {
                case 32:
                    newStr += '-';
                    break;
                case 34:
                    break;
                default:
                    newStr += string.charAt(i);
            }
        }
        return newStr;
    }
}

function initPopover(id) {
    $(id).focus(function () {
        $(this).popover();
    });
    $(id).blur(function () {
        $(this).popover('hide');
    });
}

function activateValidate() {
    var returnName = true;
    var returnDesc = true;
    var returnURL = true;
    var returnKeywords = true;
    $("#name").blur(function () {
        trimString("#name");
        returnName = validate("#name");
        if (returnName && returnDesc && returnURL && returnKeywords) {
            $("#action-save").attr("disabled", false);
        } else {
            $("#action-save").attr("disabled", true);
        }
    });
    $("#description").blur(function () {
        returnDesc = validate("#description");
        if (returnName && returnDesc && returnURL && returnKeywords) {
            $("#action-save").attr("disabled", false);
        } else {
            $("#action-save").attr("disabled", true);
        }
    });
    $("#url").blur(function () {
        returnURL = validate("#url");
        if (returnName && returnDesc && returnURL && returnKeywords) {
            $("#action-save").attr("disabled", false);
        } else {
            $("#action-save").attr("disabled", true);
        }
    });
    $("#keywords").blur(function () {
        returnKeywords = validate("#keywords");
        if (returnName && returnDesc && returnURL && returnKeywords) {
            $("#action-save").attr("disabled", false);
        } else {
            $("#action-save").attr("disabled", true);
        }
    });
}

function trimString(idName) {
    var string = $(idName).val();
    string = string.replace(/\s+/g, ' ');
    string = string.trim();
    $(idName).val(string);
}

function showTab() {

    var pageHash = document.location.hash;

    if (pageHash == "#content") {
        $('#pageTabs a[href="#tab2"]').tab('show');
    } else {
        $('#pageTabs a[href="#tab1"]').tab('show');
    }
}


//---------------------------------------------------------------------//

$("#filter").keyup(function(event) {
        if ($(this).val().length > 2) {
            filterQuery();
        } else if ($(this).val().length === 0) {
            if (event.which === 13) {
                filterQuery();
            }
        }
    });
	
function filterQuery() {
        $("#view, #edit, #delete, #assign").prop('disabled', true);
        //checkbox.unCheckAll(true);
        that.field.page = 1;
        that.field.filter = $("#filter").val();
        that.init(list.url, list.fields);
    }