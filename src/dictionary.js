import fs from "fs-jetpack";

export default ( dictionaryPath ) => {
	const getLookupDictionary = ( key ) => {
		return fs.read( `${ dictionaryPath }/dictionary-${ key }.json`, "json" );
	};

	return {
		getLookupDictionary
	};
};
