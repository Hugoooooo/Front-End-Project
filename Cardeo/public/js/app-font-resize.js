	$(document).ready(function() {
    	$('#incfont').click(function() {
        	curSize = parseInt($('.panel').css('font-size')) + 2;
        	curSizel = parseInt($('.panel-heading .panel-title').css('font-size')) + 2;
        	if (curSize <= 50)
           	 $('.panel').css('font-size', curSize);
           	 $('.panel-heading .panel-title').css('font-size', curSizel);
           	 $('.panel-body li').css('font-size', curSize);
   		});
   	    $('#decfont').click(function() {
        	curSize = parseInt($('.panel').css('font-size')) - 2;
        	curSizel = parseInt($('.panel-heading .panel-title').css('font-size')) - 2;
       		 if (curSize >= 12)
           	 $('.panel').css('font-size', curSize);
           	 $('.panel-heading .panel-title').css('font-size', curSizel);
           	 $('.panel-body li').css('font-size', curSize);
        });
    });
