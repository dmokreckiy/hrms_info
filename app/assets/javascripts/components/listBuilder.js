var list = {
    field : {
        page : 1,
        field : "name",
        order : "asc",
        filter : ""
    },
    step : 20,
    init : function(url, fields) {
        var that = this;
        this.url = url;
        $.ajax({
            url : window.location.pathname + '/' + this.url,
            data : that.field,
            type : 'POST',
            success : function(data) {
                that.data = data.items;
                that.count = data.amount;
                that.build(that.fields = fields);
                checkbox.init(true);
                $('input[type=checkbox]').click(function() {
                    if (list.checked().length != 0) {
                        $("#view, #edit, #delete, #assign").prop('disabled', false);
                    } else {
                        $("#view, #edit, #delete, #assign").prop('disabled', true);
                    }
                });
            }
        })
    },
    build : function(data) {
        var that = this;
        this.table = "";
        $.each(this.data, function(key, val) {
            that.table += "<div class='list-row'><div class='list-cell'><input type='checkbox' id='" + ([key === "id"] ? val.id : "") + "'><label for='" + ([key === "id"] ? val.id : "") + "'></label></div>";
            for (var j = 0; j < data.length; j++) {
                $.each(val, function(key, val) {
                    if (key === data[j]) {
                        that.table += "<div class='list-cell'>" + val + "</div>";
                    }
                });
            }
            that.table += "</div>";
        });
        if (this.table === "") {
            this.table = '<tr><td colspan="'+ (this.fields.length + 1) +'"><div id="message" style="width:100%;text-align: center;" class="alert"><strong>' + (this.field.filter.length > 1 ? 'No matches found' : 'No matches found') +'</strong></div><td><tr>';
        }
        $('.list-body').empty().append(this.table);
        if(that.pagination) that.pagination();
    },
    checked : function() {
        var items = "<ul class='items-list'>", id = [], length = 0;
        $('input[type=checkbox]:checked:not(#check-all)').each(function() {
            items += "<li>" + $(this).parent().next().text() + "</li>";
            id.push($(this).attr("id"));
            length++;
        });
        return {
            id : id,
            length : length,
            items : items + "</ul>"
        };
    }
}; 