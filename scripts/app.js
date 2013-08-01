var posledniHodinaNoci = 7;

function parseDatum(strdatum, strcas){
	var parts = strdatum.split('.');
	var date = new Date(parseInt(parts[2], 10),     // year
					parseInt(parts[1], 10) - 1, // month, starts with 0
					parseInt(parts[0], 10));    // day
	date.setHours   (parseInt(strcas.substr(0, 2), 10));
	date.setMinutes (parseInt(strcas.substr(3, 2), 10));
	return date;
}

function pad(n) { return ("0" + n).slice(-2); }

function   getUrlVar() {
  var   href = window.location.href;
  var   queryUrl = href.slice(href.lastIndexOf( '?' ) + 1);
  return  queryUrl.split( '=' );
}

if (navigator.userAgent.indexOf("Android") != -1)
{
    $(document).bind("mobileinit", function()
    {
      $.mobile.defaultPageTransition = 'none';
      $.mobile.defaultDialogTransition = 'none';
    });
}



$(document).on('pagebeforeshow', '#index', function(){
	$.getJSON('content/data/program.json', function(data) {
	  var items = [];
	  var currenttime = new Date();
	  if (currenttime.getHours()<posledniHodinaNoci){ // od pulnoci do rana je nutne shiftnout datum, populnocni patri pod predchozi den
		currenttime.setDate(currenttime.getDate()-1);
	  }
	  
	  $.each(data.days, function(key, val) {
		var datum = parseDatum(val.date, '00:01');
		//console.log(datum.getDate() + ' =? ' +currenttime.getDate());
		if (datum.getDate()==currenttime.getDate()){
			//console.log('yes - push');
			$("#praveprobiha").append('PRÁVĚ PROBÍHÁ');
			items.push('<table cellpadding="0" cellspacing="0" border="0"><tbody><thead><tr><th scope="col">čas:</th><th scope="col">stage:</th><th scope="col">jméno:</th><th scope="col">popis:</th></tr></thead>');
			$.each(val.stages, function(key1, val1) {
				$.each(val1.artists, function(key2, val2) {
					val2.stage = val1.id; //pridavam info o stagi
					val2.day = val.name;
					var datum = parseDatum(val.date, val2.time);
					var datum2 = new Date(datum);
					datum2.setMinutes(datum.getMinutes()+val2.duration);
					
					if (datum2.getHours()<posledniHodinaNoci){ // od pulnoci do rana je nutne zde shiftnout zase zpet
						datum.setDate(datum.getDate()-1);
						datum2.setDate(datum2.getDate()-1);
					}
console.log(val2.name);
console.log(currenttime + ' > ' +datum);
console.log(currenttime + ' < ' +datum2);					
					if (currenttime>=datum && currenttime<=datum2){
						items.push('<tr class="'+val1.id+'"><td>'+val2.time+'-'+(pad(datum2.getHours())+':'+pad(datum2.getMinutes()))+'</td><td>'+val1.name+'</td><td>'+val2.name+'</td><td>'+val2.shortdesc+val2.day+'</td></tr>');
console.log(' YES ');
					} else {
console.log(' NOPE ');
					}
console.log(' ------------------------------------ ');
					
				});
			});
			items.push('</tbody></table>');
		}
		
	  });
	$("#indexartistslist").append(items.join(''));
		
		//$('#artistslist').listview('refresh');
	});
});

 	  
$(document).on('pagebeforeshow', '#program', function(){
   $( "a.live" ).click(function() {
	  $( "tr.live" ).toggleClass( "hideme" );
	  $( "a.live" ).toggleClass( "nogo" );
	  if ($( "a.live .ui-icon" ).css('background-position')=="-73px 50%"){
		$( "a.live .ui-icon" ).css('background-position', "-252px 50%");
	  } else {
		$( "a.live .ui-icon" ).css('background-position', "-73px 50%");
	  }
	  return false;
	});
	$( "a.club" ).click(function() {
	  $( "tr.club" ).toggleClass( "hideme" );
	  $( "a.club" ).toggleClass( "nogo" );
	  if ($( "a.club .ui-icon" ).css('background-position')=="-73px 50%"){
		$( "a.club .ui-icon" ).css('background-position', "-252px 50%");
	  } else {
		$( "a.club .ui-icon" ).css('background-position', "-73px 50%");
	  }
	  return false;
	});
	$( "a.alter" ).click(function() {
	  $( "tr.alter" ).toggleClass( "hideme" );
	  $( "a.alter" ).toggleClass( "nogo" );
	   if ($( "a.alter .ui-icon" ).css('background-position')=="-73px 50%"){
		$( "a.alter .ui-icon" ).css('background-position', "-252px 50%");
	  } else {
		$( "a.alter .ui-icon" ).css('background-position', "-73px 50%");
	  }
	  return false;
	});
	$( "a.theatre" ).click(function() {
	  $( "tr.theatre" ).toggleClass( "hideme" );
	  $( "a.theatre" ).toggleClass( "nogo" );
	   if ($( "a.theatre .ui-icon" ).css('background-position')=="-73px 50%"){
		$( "a.theatre .ui-icon" ).css('background-position', "-252px 50%");
	  } else {
		$( "a.theatre .ui-icon" ).css('background-position', "-73px 50%");
	  }
	  return false;
	});
	$( "a.ctvrtek" ).click(function() {
	  $( "#ctvrtek" ).toggleClass( "hideme" );
	  $( "a.ctvrtek" ).toggleClass( "nogo" );
	  if ($( "a.ctvrtek .ui-icon" ).css('background-position')=="-73px 50%"){
		$( "a.ctvrtek .ui-icon" ).css('background-position', "-252px 50%");
	  } else {
		$( "a.ctvrtek .ui-icon" ).css('background-position', "-73px 50%");
	  }
	  return false;
	});
	$( "a.patek" ).click(function() {
	  $( "#patek" ).toggleClass( "hideme" );
	  $( "a.patek" ).toggleClass( "nogo" );
	  if ($( "a.patek .ui-icon" ).css('background-position')=="-73px 50%"){
		$( "a.patek .ui-icon" ).css('background-position', "-252px 50%");
	  } else {
		$( "a.patek .ui-icon" ).css('background-position', "-73px 50%");
	  }
	  return false;
	});
	$( "a.sobota" ).click(function() {
	  $( "#sobota" ).toggleClass( "hideme" );
	  $( "a.sobota" ).toggleClass( "nogo" );
	  if ($( "a.sobota .ui-icon" ).css('background-position')=="-73px 50%"){
		$( "a.sobota .ui-icon" ).css('background-position', "-252px 50%");
	  } else {
		$( "a.sobota .ui-icon" ).css('background-position', "-73px 50%");
	  }
	  return false;
	});
	

	$.getJSON('content/data/program.json', function(data) {
	  var items = [];
	  var itemslist = [];
	  var dayid = '';
	  
	  $.each(data.days, function(key, val) {
		$.each(val.stages, function(key1, val1) {
			$.each(val1.artists, function(key2, val2) {
				val2.stage = val1.id; //pridavam info o stagi
				
				//console.log(val2.name + ' ma cas: ' + val2.time );
				var datum = parseDatum(val.date, val2.time);
				val2.timeobj = datum; //pridavam objekt casu
				
				var datum2 = new Date(datum);
				datum2.setMinutes(datum.getMinutes()+val2.duration);
				
				val2.end = pad(datum2.getHours())+':'+pad(datum2.getMinutes()); //pridavam info o konci
				items.push(val2);
			});
		});
		
		items.sort(function (a, b) {
		var casA = new Date(a.timeobj);
		var casB = new Date(b.timeobj);
		
		
		if (casA.getHours()<posledniHodinaNoci){
			//console.log("upravuju: "+a.name + ' pac hours je ' + a.timeobj.getHours() );
			casA.setHours(a.timeobj.getHours()+24);
		}
		if (casB.getHours()<posledniHodinaNoci){
			//console.log("upravuju: "+b.name + ' pac hours je ' + b.timeobj.getHours() );
			casB.setHours(b.timeobj.getHours()+24);
			
		}
		
		return casA - casB });
		
		itemslist.push('<div id="'+val.id+'"><h2>'+val.name+' '+val.date+':</h2><table cellpadding="0" cellspacing="0" border="0"><tbody>');
		itemslist.push('<thead><tr><th scope="col" class="cas">čas:</th><th scope="col" class="jmeno">jméno:</th><th scope="col" class="popis">popis:</th></tr></thead>');
		
		$.each(items, function(key, val) {
			itemslist.push('<tr class="'+val.stage+'"><td>'+val.time+'-'+val.end+'</td><td><a href="artistdetail.html?id=' + val.id + '" data-ajax="false">'+val.name+'</a></td><td>'+ val.shortdesc +'</td></tr>');
		});
		itemslist.push('</tbody></table></div>');
		items = [];
	  });
		

		$("#programlist").append(itemslist.join(''));
		
		//$('#artistslist').listview('refresh');
	});
});
	

$(document).on('pagebeforeshow', '#artists', function(){
	if ($("#artistslist")[0].childElementCount==0){
		$.getJSON('content/data/program.json', function(data) {
		  var items = [];
		  var itemslist = [];
		  $.each(data.days, function(key, val) {
			$.each(val.stages, function(key1, val1) {
				$.each(val1.artists, function(key2, val2) {
					items.push(val2);
				});
			});
		  });
			items.sort( function(a,b) { return a.name.localeCompare( b.name ) });
			$.each(items, function(key, val) {
				var iconhtml='';
				if (val.icoimage!=''){
					iconhtml='<img src="'+ val.icoimage +'" width="73" />';
				}
				itemslist.push('<li><a href="artistdetail.html?id=' + val.id + '">'+iconhtml+'<h3>'+ val.name +'</h3><p>'+ val.shortdesc +'</p></a></ul>');
			});
			$("#artistslist").append(itemslist.join(''));
			$('#artistslist').listview('refresh');
		});
	}
});
	
	
$(document).on('pagebeforeshow', '#mappage', function(){
	var svg = document.createElement('embed');
	svg.setAttribute('id', 'svg');
	svg.setAttribute('width', '100%');
	svg.setAttribute('height', '64%');
	svg.setAttribute('type', 'image/svg+xml');
	svg.setAttribute('src', 'content/data/mapa.svg');
	$("#svgmap").append(svg);
});

$(document).on('pagebeforeshow', '#profile', function(){
	$.getJSON('content/data/program.json', function(data) {
		var object; 
		$.each(data.days, function(key, val) {
			$.each(val.stages, function(key1, val1) {
				$.each(val1.artists, function(key2, val2) {
					if (val2.id === getUrlVar()[1]){
						val2.day = val.name.substring(0,2);
						val2.stageid = val1.id;
						val2.stage = val1.name;
						object = val2;
						return false;
					}
				});
			});
		});
		var www = '';
		if (object.wwwlink!=''){
			www = ' | <a href="'+object.wwwlink+'">www</a>';
		}
		$("#profiledetail").append('<h1>'+object.name+'</h1><p id="shortdesc"><span class="'+object.stageid+'">'+object.day + ' ' +object.time+' @ '+object.stage+' stage</span> | '+object.shortdesc + www + '</p><div class="fleft"><img src="'+object.icoimage+'" width="150" height="150" /></div><p id="profiletext">'+object.profiletext+'</p>');
	});
});