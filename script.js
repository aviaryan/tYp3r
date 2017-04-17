// Substitutes

var chars = {
	'o': ['0'],
	'e': ['3']
}


function convert(text){
	var probab = 0.4
	len = text.length
	var newText = ""

	for (var i=0; i < len; i++){
		charCode = text[i].charCodeAt()
		chance = Math.random()
		
		if (chance <= probab){
			if (charCode >= 65 && charCode <= 90){
				newText += String.fromCharCode(charCode + 32)
			} else if (charCode >= 97 && charCode <= 122){
				newText += (String.fromCharCode(charCode - 32))[0]
			} else {
				newText += text[i]
			}
		} else {
			newText += text[i]
		}
	}

	return newText
}

function inputChangeEvent(){
	val = $("#input").val()
	newVal = convert(val)
	console.log(newVal)
	$("#output").text(newVal)
}

$(document).ready(function(){
	$("#input").bind('input propertychange', inputChangeEvent)
})
