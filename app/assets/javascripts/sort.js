function sort_sales_informations(path){
  var params = new Array();
  var sort = $('#sort').val();
  sort = sort == 0 ? 1 : 0
  params['sort_type'] = sort;
  path = build_url(path, params);
  $.get(path, function(data) {
 });
}