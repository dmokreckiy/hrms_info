function validate(id,back) {
    var value = $.trim($(id).val());
    $(id).val(value);   
    if(id !== "#tasks") {
        removeError(id, back);
        removeError(id, ".uniqueness");
    }   
    if(back) { addError(id, back); }    
    if ( value == "" || value == "none") { addError(id, ".empty"); }
    else { removeError(id, ".empty"); }
    if ( value.length < getCondition(id, ".minLength") && value!="") { addError(id, ".minLength"); }
    else { removeError(id, ".minLength"); }
    if ( value.length > getCondition(id, ".maxLength") ) { addError(id, ".maxLength"); }
    else { removeError(id, ".maxLength"); }
    if ( value < parseInt(getCondition(id, ".lessLength")) && value!="") { addError(id, ".lessLength"); }
    else { removeError(id, ".lessLength"); }
    if ( value > parseInt(getCondition(id, ".moreLength")) && value!="") { addError(id, ".moreLength"); }
    else { removeError(id, ".moreLength"); }
    if (!RegExp(getCondition(id, ".validLetters")).test(value) && value!="") { addError(id, ".validLetters"); }
    else { removeError(id, ".validLetters"); }
    if (!RegExp(getCondition(id, ".validFormat")).test(value) && value!="") { addError(id, ".validFormat"); }
    else { removeError(id, ".validFormat"); }
    if (value.search(RegExp(getCondition(id, ".lettersCount"))) ===-1 && value !== "") { addError(id, ".lettersCount"); }
    else { removeError(id, ".lettersCount"); }
    if ($("input[type=checkbox]:checked").length === 0) { addError(id, ".emptyCheck"); }
    else { removeError(id, ".emptyCheck"); }

    if($(id+"Validate div").hasClass('validate-error')) {
        $(id).addClass("validate-error-input");
        $(id).parent().find(".bootstrap-select button").addClass("validate-error-input");
        return false;
    }else {
        $(id).removeClass("validate-error-input");
        $(id).parent().find(".bootstrap-select button").removeClass("validate-error-input");
        return true;
    }

    function getCondition(id, type) { return $(id+"Validate").find(type).attr("data-condition"); }
    function addError(id, type) { return $(id+"Validate").find(type).addClass("validate-error"); }
    function removeError(id, type) { return $(id+"Validate").find(type).removeClass("validate-error"); }
}

function handleServerResponse(data, response) {
    if (data.status !== "success") {
        for (var i=0; i < data.result.length; i++) {
            var dataResult=data.result[i].field;
            if(dataResult.match(/properties\[(\w+)\]/)){
                validate("#"+dataResult.match(/properties\[(\w+)\]/)[1], "."+data.result[i].code);
            } else {
                validate("#"+data.result[i].field, "."+data.result[i].code);
            }
        }
    }
}
function handleServerResponseTransient(data, response) {
    if (data.status !== "success") {
        for (var i=0; i < data.result.length; i++) {
            var dataResult=data.result[i].field;
            if(dataResult.match(/properties\[(\w+)\]/)) { validate("#"+dataResult.match(/properties\[(\w+)\]/)[1], "."+data.result[i].code); }
            else { validate("#"+data.result[i].field, "."+data.result[i].code); }
        }
    }
}