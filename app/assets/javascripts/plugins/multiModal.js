(function($){
	"use strict"
	$.fn.modalWindow = function(options){
		options = $.extend({
            title:"Caution!",
            text:"You want to confirm the action on the element",
            action: "confirm",
            onAgree: function(){},
            onDisagree: function(){}
		}, options);
	    var modalObject =  '<div id="multiModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static">' +
						        (options.title != "" ?
                                    '<div class="modal-header">' +
                                        (options.action == "cancel" || !"message" ?
                                            '<button type="button" class="close is-modalBtn1" data-dismiss="modal" aria-hidden="true">x</button>' :
                                            '<button type="button" class="close is-modalBtn2" data-dismiss="modal" aria-hidden="true">x</button>') +
                                        '<h3 id="myModalLabel">'+options.title+'</h3>'+
                                    '</div>'
                                : "") +
								'<div class="modal-body">'+
									'<p>'+options.text+'</p>'+
								'</div>'+
								'<div class="modal-footer">'+
                                    (options.action == "cancel" ?
                                        '<button class="btn btn-success is-modalBtn2" data-dismiss="modal">Yes</button>'+
										'<button class="btn is-modalBtn1" data-dismiss="modal" aria-hidden="true">No</button>'
                                    : "")+
									(options.action == "message" ?
                                        '<button class="btn btn-success is-modalBtn2" aria-hidden="true" data-dismiss="modal">Ok</button>'
                                    : "")+
								'</div>'+
                            '</div>';
		this.prepend(modalObject);
        var $modal= $("#multiModal");
            $modal.one("click",".is-modalBtn1", function(){options.onDisagree()})
                    .one("click",".is-modalBtn2", function(){options.onAgree()})
                    .modal()
                    .on('hidden', function(){$modal.remove();});
	return this.modalObject;		
	};	
})(jQuery);