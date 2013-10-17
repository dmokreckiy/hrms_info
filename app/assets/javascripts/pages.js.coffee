# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/
list.sort = ->
  that = this
  $(".list-head .list-cell>p[data-sort]").click ->
    checkbox.unCheckAll true
    that.field.page = 1
    that.field.field = $(this).data("sort")
    $(this).find("i").toggleClass("icon-chevron-down").toggleClass "icon-chevron-up"
    if that.field.order isnt "asc"
      that.field.order = "asc"
    else
      that.field.order = "desc"
    that.init that.url, that.fields