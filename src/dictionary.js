"use strict";

const fs = require( "fs-jetpack" );

module.exports = dictionaryPath => {
	const getLookupDictionary = key => {
		return fs.read( `${ dictionaryPath }/dictionary-${ key }.json`, "json" );
	};

	return {
		getLookupDictionary
	};
};
