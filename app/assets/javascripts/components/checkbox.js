var checkbox = {
    checkAll : function(flag) {
        $("#check-all").on('click', function() {
            var dataCheck = this.dataCheck = $("#check-all").data('check') || "",
                fl = flag;
            if ($(this).is(":checked")) {
                $(dataCheck + ' input[type=checkbox]').prop('checked', true);
                if (fl) {
                    $(dataCheck + ' input[type=checkbox]').parent().parent().addClass('active');
                    $('#check-all').parent().parent().addClass('active');
                }
            } else {
                $(dataCheck + ' input[type=checkbox]').prop('checked', false);
                if (fl) {
                    $(dataCheck + ' input[type=checkbox]').parent().parent().removeClass('active');
                    $('#check-all').parent().parent().removeClass('active');
                }
            }
        });
    },
    unCheckMain : function(flag) {
        var checkbox = $("input[type=checkbox]:not(#check-all)"),
            fl = flag;
        checkbox.on('click', function() {            
            if ($(this).is(':checked') && fl) {
                $(this).parent().parent().addClass('active');
            } else {
                $(this).parent().parent().removeClass('active');
            }
            if ($(this).prop('checked') !== $('#check-all').prop('checked')) {
                $('#check-all').prop('checked', false);
                if (fl) {
                    $('#check-all').parent().parent().removeClass('active');
                }
            }
            if ($($('#check-all').data('check')+" input[type=checkbox]:not(#check-all)").length === $("input[type=checkbox]:checked:not(#check-all)").length) {
                $('#check-all').prop('checked', true);
                if (fl) {
                    $('#check-all').parent().parent().addClass('active');
                }
            }
        });
    },
    unCheckAll : function(fl) {
        $('input[type=checkbox]').prop('checked', false);
        if(fl) { $('.list-row').removeClass('active'); }
    },
    init : function(flag) {
        this.checkAll(flag);
        this.unCheckMain(flag);
    }
}