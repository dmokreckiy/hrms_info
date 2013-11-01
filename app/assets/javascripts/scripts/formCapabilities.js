/* var tittle = "Edit capability"
  if (page[1] === 'add'){
 tittle = "Add capability"
} */
$(document).ready(function () {
  
    /*var taskList = $("#object").val();
    $('#'+taskList.replace(" ","")).removeClass("hidden-task");
	if($("#assignedRoles").children().length !== 0) {
		$("body").modalWindow({
	        action: "message",
	        title: tittle,
	        text: "The capability is assigned to the following role"+ (($('#assignedRoles').children().length > 1) ? 's' : '')+": " + $("#assignedRoles").html()
	    });
	}	*/
	activateValidate();
	initPopover("#name");
	initPopover("#description");   
    
	$("input[type=text]").blur(function(){
       $(this).val($.trim($(this).val()));
    });
    $('.selectpicker').selectpicker();
    $(".btn-group.bootstrap-select").attr("data-content","You cannot change the object for the capability assigned to roles");
    $(".btn-group.bootstrap-select").hover(function() { $(".btn-group.bootstrap-select").popover("toggle"); });
    hideCheckAll();
	
	$('#object').change(function() {
		$('.removeMeName').remove();
		unDisplayAllTask();
		hideCheckAll();
		var taskList = $("#object").val();
		$('#'+taskList.replace(" ","")).removeClass("hidden-task");
	});
	
	
	
	$("#addNewCapab").click(function() { 
	$("#object").removeAttr("disabled");
        var sendData = $("#CapabForm").serialize();
        addCapab(sendData);
    });

    $('#CapabForm').submit(function(){ return false; });
		
	$("#cancelCapab").click(function(){
		$("body").modalWindow({
            action: "cancel",
            title: tittle,
            text: "Are you sure you want to exit without saving changes?",
            onAgree: function () { window.location.href = "/rms-info/capabilities"; }
        });
	});
});



function initPopover(id) {
	$(id).focus(function() { $(this).popover(); });
    $(id).blur(function() { $(this).popover('hide'); });
}

function hideCheckAll() {
	if($("#object").val() === "none") {
		$(".hidden-label").addClass("hidden-task");
		$("#hidden").addClass("hidden-task");
	}
	else {
		$(".hidden-label").removeClass("hidden-task");
		$("#hidden").removeClass("hidden-task");
		$(".object-task").each(function() {
		    if(!$(this).hasClass('hidden-task')) {
		        if($(this).find('label.checkbox_style').length === $(this).find('label').length) {
		            $("#checkAll").attr('checked', true).parent().addClass('checkbox_style');
		        }
		    }
		});
	}
}

function unDisplayAllTask() {
	$('.object-task').addClass("hidden-task");
}

function activateValidate() {
	var returnName = false,
		returnDesc = false,
		returnSelect = false,
		returnCheck = false;

    if($("#capabilityId").val() !== ''){
        $("#addNewCapab").attr("disabled", false);
        returnName = true;
        returnDesc = true;
        returnSelect = true;
        returnCheck = true;
    }
    else {
        $("#addNewCapab").attr("disabled", true);
    }

	
	$("#name").blur(function() {
		returnName = validate("#name");
		if(returnName && returnDesc && returnSelect && returnCheck) { $("#addNewCapab").attr("disabled", false); } else { $("#addNewCapab").attr("disabled", true); }
	});
	$("#description").blur(function() {
		returnDesc = validate("#description");
		if(returnName && returnDesc && returnSelect && returnCheck) { $("#addNewCapab").attr("disabled", false); } else { $("#addNewCapab").attr("disabled", true); }
	});
	$("#object").change(function() {
		returnSelect = validate("#object");
		if(returnName && returnDesc && returnSelect && returnCheck) { $("#addNewCapab").attr("disabled", false); } else { $("#addNewCapab").attr("disabled", true); }
	});
	$('input[type=checkbox]').on('click', function() {
	    setTimeout(function() {
	     $("#tasksValidate").find(".uniqueness").removeClass("validate-error");
		returnCheck = validate("#tasks");
		if(returnName && returnDesc && returnSelect && returnCheck) { $("#addNewCapab").attr("disabled", false); } else { $("#addNewCapab").attr("disabled", true); }
	   }, 0);
	});
};

function addCapab(sendData) {
    var name = $("#name").val();
    $.ajax({
        type: "POST",
        url: "validationCapability.do",
        data: sendData,
        contentType: "application/x-www-form-urlencoded",
        async: false,
        success: function(data,response){
            if (data.status != 'success') handleServerResponse(data, response);
            else{
                $.ajax({
                    type: "POST",
                    url: "addOrEdit.do",
                    data: sendData,
                    contentType: "application/x-www-form-urlencoded",
                    async: false,
                    success:  function (response) {
                        $("body").modalWindow({
                            action: "message",
                            title: "Saved",
                            text: "The capability has been saved: " + name,
                            onAgree: function () { window.location.href = "/rms-info/capabilities"; }
                        });
                    },
                    error: function (xhr, message) {
                        //window.location.href = "/rms-info/error/ajax?type=" + message;
                        alert("Ajax error");
                    }
                });
            }
        },
        error: function (xhr, message) {
            //window.location.href = "/rms-info/error/ajax?type=" + message;
            alert("Ajax error");
        }
    })
};
