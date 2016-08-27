/*  Python new style srting formatter. 
 *
 *  Parameters
 *  ----------
 *  str   <String>  Format string
 *  data  <dict>    Data
 * 
 *  Return: <str>    
 */

function pyformat(str, data) {
	assert(typeof str === 'string', 'Unexpected \'str\' argument type: ' + typeof str);
	// assert typeof data == dict

	for (var key in data) {
		// assert(!'{' in key && !'}' in key && !'.' in key);

		var labelRe = new RegExp('\{' + key + '\.?([a-zA-Z.]+)?\}');
		var matchedCount = 0;

		while (true) {
			var match = str.match(labelRe); 

			if (match === null) {
				if (matchedCount == 0) 
					console.log('Label \'' + key + '\' not found');
				
				break;
			}

			matchedCount += 1;

			var replaceOn = eval('data.' + key + (match[1] === undefined ? '' : '.' + match[1]));  

			str = str.replace(match[0], String(replaceOn));
		}
	}

	return str;
}

module.exports = pyformat
