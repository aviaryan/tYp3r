// Substitutes

var chars = {
	'o': ['0'],
	'e': ['3'],
	'i': ['1']
}

var words = {
	'tha': 'da',
	'thi': 'di'
}


function convertWords(text){
	var text = String(text)
	var probab = 0.6

	for (var key in words) {
		reg = new RegExp(key, "gi")
		if (reg.test(text)){
			chance = Math.random()
			if (chance <= probab){
				text = text.replace(reg, words[key])
			}
		}
	}

	return text
}

function convertSingleChar(text){
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
	newVal = convertWords(val)
	console.log(newVal)
	newVal = convertSingleChar(newVal)
	console.log(newVal)
	$("#output").text(newVal)
}

$(document).ready(function(){
	$("#input").bind('input propertychange', inputChangeEvent)
})
