
function inputChangeEvent(){
	val = $("#input").val()
	newVal = typ3r_convert(val)
	$("#output").text(newVal)
}

$(document).ready(function(){
	$("#input").bind('input propertychange', inputChangeEvent)

	var clipboard = new Clipboard('#copyBtn');
	copyAnswer = $("#copyAnswer");

	clipboard.on('success', function(e) {
		copyAnswer.text('copied')
		setTimeout(function(){
			copyAnswer.text('')
		}, 1500);
		e.clearSelection();
	});

	clipboard.on('error', function(e) {
		console.error('Action:', e.action);
		console.error('Trigger:', e.trigger);
	});
})
