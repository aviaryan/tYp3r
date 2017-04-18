// Substitutes

var chars = {
	'o': ['0'],
	'e': ['3'],
	'i': ['1']
}

// this is matched using regex (case-insensitive)
// the following match anywhere in the text
var words = {
	'tha': 'da',
	'wha': 'wa',
	'this': 'dis'
}
// the follwing should match at word end (or they should be complete words)
var endWords = {
	'ith': 'id',
	'([er])s': '$1zz'
}
// the following should match whole words
var completeWords = {
	'is': 'izz',
	'my': 'mah',
	'you': 'u',
	'are': 'r',
	'the': 'da'
}

// join to words
for (var key in endWords){
	words[key + '(?=[^a-z])'] = endWords[key]
}
for (var key in completeWords){
	words['([^a-z]|^)' + key + '(?=[^a-z])'] = '$1' + completeWords[key]
}


function convertChars(text){
	var text = String(text)
	var probab = 0.6

	for (var key in words) {
		reg = new RegExp(key, "gi")
		var bracketCount = (key.match(/\(/g) || []).length

		if (reg.test(text)){
			// replace
			text = text.replace(reg, (match, p1, p2) => {
				chance = Math.random()
				if (chance <= probab){
					if (bracketCount < 2){
						return words[key]
					} else if (bracketCount == 2){  // ([ae])s: $1zz, complete words
						return words[key].replace("$1", p1)
					}
				} else {
					return match
				}
			})
			// end replace
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
	var upProbab = 0.5
	var downProbab = 0.7
	len = text.length
	var newText = ""

	for (var i=0; i < len; i++){
		charCode = text[i].charCodeAt()
		chance = Math.random()
		
		if (charCode >= 65 && charCode <= 90 && chance <= downProbab){
			subs = loadSubstitutes(text[i], String.fromCharCode(charCode + 32))
			newText += subs[Math.floor(Math.random() * subs.length)]; // random from list
		} else if (charCode >= 97 && charCode <= 122 && chance <= upProbab){
			subs = loadSubstitutes(text[i], String.fromCharCode(charCode - 32))
			newText += subs[Math.floor(Math.random() * subs.length)];
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
