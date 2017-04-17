// Substitutes

var chars = {
	'o': ['0'],
	'e': ['3'],
	'i': ['1']
}

// this is matched using regex (case-insensitive)
var words = {
	'tha': 'da',
	'this': 'dis',
	'the': 'da',
	'wha': 'wa',
	'you': 'u',
	'ith': 'id',
	'([ei])s(?=[^a-z])': '$1zz'  // lookahead if word end
}


function convertChars(text){
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

function loadSubstitutes(orig, newCh){
	list = [newCh]
	orig = orig.toLowerCase()
	if (orig in chars) {
		Array.prototype.push.apply(list, chars[orig]);
	}
	return list
}

function convertSingleChar(text){
	var probab = 0.5
	len = text.length
	var newText = ""

	for (var i=0; i < len; i++){
		charCode = text[i].charCodeAt()
		chance = Math.random()
		
		if (chance <= probab){
			if (charCode >= 65 && charCode <= 90){
				subs = loadSubstitutes(text[i], String.fromCharCode(charCode + 32))
				newText += subs[Math.floor(Math.random() * subs.length)]; // random from list
			} else if (charCode >= 97 && charCode <= 122){
				subs = loadSubstitutes(text[i], String.fromCharCode(charCode - 32))
				newText += subs[Math.floor(Math.random() * subs.length)];
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
	newVal = convertChars(val)
	console.log(newVal)
	newVal = convertSingleChar(newVal)
	console.log(newVal)
	$("#output").text(newVal)
}

$(document).ready(function(){
	$("#input").bind('input propertychange', inputChangeEvent)
})
