var rms = {
    host : window.location.origin + '/rms-info/'
}

var sidebar = {
    init : function(page) {
        var that = this;
        $.ajax({
            url : '/rms-info/dashboard/getMenu.do',
            type : 'POST',
            success : function(data) {
                that.build(data, page);
            }
        })
    },
    build : function(data, page) {
        var list = '';
        $.each(data, recurse);
        function recurse(key, val) {
            list += "<li" + (val.link === page ? " class='active'" : "") + ">" + (val.items.length === 0 ? "<a href='" + '/rms-info/' + val.link + "'>" + val.name + "</a>" : "<i class='sidebar-icon'></i>" + val.name ) + "</li>";
            if (val.items.length > 0) {
                list += "<ul>";
                $.each(val.items, recurse);
                list += "</ul>";
            }
        };
        $('#navigation').html(list);
        this.activate();
    },
    activate : function() {
        $('.active').parent().prev('li').addClass('active');
        $('#navigation>li').on('click', function() {
            $(this).toggleClass('active');
        });
    }
};
