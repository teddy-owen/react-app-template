function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function sortObjectListInPlace(array,fieldPath,reverse=false) {
    // e.g. let array=[{a:{b:2}},{a:{b:1}},{a:{b:-8}},{a:{b:12}}]
    // sortObjectListInPlace(array,"a.b",false);
    // array => [{a:{b:-8}},{a:{b:1}},{a:{b:2}},{a:{b:12}}]
    var sortOrder = reverse ? -1:1;
    array.sort((a,b)=>{
        var result = (deepGet(a, fieldPath, null) < deepGet(b, fieldPath, null)) ? -1 : (deepGet(a, fieldPath, null) > deepGet(b, fieldPath, null)) ? 1 : 0;
        return result * sortOrder;
    });
    return;
}

// From https://gomakethings.com/how-to-get-the-value-of-an-object-from-a-specific-path-with-vanilla-js/
function deepGet(obj, path, defaultValue) {
	/**
	 * If the path is a string, convert it to an array
	 * @param  {String|Array} path The path
	 * @return {Array}             The path array
	 */
	var stringToPath = function (path) {
		// If the path isn't a string, return it
		if (typeof path !== 'string') return path;
		// Create new array
		var output = [];
		// Split to an array with dot notation
		path.split('.').forEach(function (item, index) {
			// Split to an array with bracket notation
			item.split(/\[([^}]+)\]/g).forEach(function (key) {
				// Push to the new array
				if (key.length > 0) {
					output.push(key);
				}
			});
		});
		return output;
	};
	// Get the path as an array
	path = stringToPath(path);
	// Cache the current object
	var current = obj;
	// For each item in the path, dig into the object
	for (var i = 0; i < path.length; i++) {
		// If the item isn't found, return the default (or null)
		if (!current[path[i]]) return defaultValue;
		// Otherwise, update the current  value
		current = current[path[i]];
	}
	return current;
}

export {validateEmail,deepGet,sortObjectListInPlace};
