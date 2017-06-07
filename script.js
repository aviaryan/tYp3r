
function inputChangeEvent(){
	val = $("#input").val()
	newVal = typ3r_convert(val)
	$("#output").text(newVal)
}

$(document).ready(function(){
	$("#input").bind('input propertychange', inputChangeEvent)
})
