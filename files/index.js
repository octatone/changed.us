




/*
     FILE ARCHIVED ON 12:12:41 Mar 7, 2013 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 19:23:43 Jul 27, 2013.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
function form_swap_values(){
    swapValues = [];
    jQuery(".swap_value").each(function(i){
        swapValues[i] = jQuery(this).val();
        jQuery(this).focus(function(){
            if (jQuery(this).val() == swapValues[i]) {jQuery(this).val("");}}).blur(function(){
            if (jQuery.trim(jQuery(this).val()) == "") {jQuery(this).val(swapValues[i]);}});
    });
}   

function form_input_classes(){

  jQuery('input[@name=email]').addClass('input_email');
  jQuery('input[@name=firstname]').addClass('input_firstname');
  jQuery('input[@name=lastname]').addClass('input_lastname');
  jQuery('input[@name=addr1]').addClass('input_addr1');
  jQuery('input[@name=addr2]').addClass('input_addr2');
  jQuery('input[@name=city]').addClass('input_city');
  jQuery('input[@name=zip]').addClass('input_zip');
  jQuery('select[@name=state_cd]').addClass('select_state_cd');
  jQuery('select[@name=country]').addClass('select_country');
  jQuery('input[@name=phone]').addClass('input_phone');

  jQuery('input[type="text"]').addClass('text');
  jQuery('input[type="password"]').addClass('text');
  jQuery('input[type="checkbox"]').addClass('checkbox');
  jQuery('input[type="radio"]').addClass('radiobutton');
  jQuery('input[type="submit"]').addClass('submit');
  jQuery('input[type="image"]').addClass('submit-image');

}

function outgoing_links(){

  jQuery('a').each(function() {
    var $a = jQuery(this);
    var href = $a.attr('href');

    // strip the host name down, removing subdomains or www
    var host = window.location.host.replace(/^(([^\/]+?\.)*)([^\.]{4,})((\.[a-z]{1,4})*)$/, '$3$4');

    if (href != null) {

      // see if the link is external -- location.host method
      if ( (href.match(/^http/)) && (! href.match(host)) && (! href.match(/^javascript/)) ) {
      
        // add thickbox code
        $a.addClass('thickbox').addClass('external');
        $a.attr('href', '#TB_inline?height=200&width=400&inlineId=tb_external');
        tb_init('a.thickbox');
      
        // on click, add external link code to the thickbox  
        $a.click(function () { 
          jQuery('#tb_external_thelink')
           .before('<p id="tb_external_thelink"><a href="' + href + '">' + href + '</a></p>')
           .remove();
        });
      }
    }
  
  });

}

jQuery(document).ready(function() {

  form_swap_values();
  form_input_classes();
  outgoing_links();
  
});


/* Hover */

var Hover = function(navBar)
{
	var me = this;
	me.items = navBar.find("ul")[0].childNodes;
	jQuery.each(me.items, function(i, item) {me.initItem(item);});
}

Hover.prototype.initItem = function(item)
{
	var me = this;
	item.onmouseover = function() 
	{
		me.closeAllExcept(item);
		
		clearTimeout(me.closeTimeout);
		me.openTimeout = setTimeout(function() 
		{
			item.className = "over"; 
			item.style.zIndex = 9999;
		}, Hover.OPEN_TIMEOUT);
	};
	
	item.onmouseout = function() 
	{ 
		clearTimeout(me.openTimeout);
		
		me.closeTimeout = setTimeout(function()
		{
			item.className = ""; 
		}, Hover.CLOSE_TIMEOUT);
	};
}

Hover.prototype.closeAllExcept = function(exceptItem)
{
	jQuery.each(this.items, function(i, item) 
	{ 
		if (item != exceptItem)
			item.className = ""; 
	});
}

Hover.OPEN_TIMEOUT  = 200;
Hover.CLOSE_TIMEOUT = 500;

/* End Hover */

jQuery('#navChange').ready(function() {
	if(jQuery('#navChange').attr('id')) {
		new Hover(jQuery("#navChange"));
	}
});