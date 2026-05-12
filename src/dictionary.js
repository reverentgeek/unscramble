import { readFileSync } from "node:fs";
import { join } from "node:path";

export default ( dictionaryPath ) => {
	let cache;
	const load = () => {
		if ( !cache ) {
			cache = JSON.parse( readFileSync( join( dictionaryPath, "dictionary.json" ), "utf8" ) );
		}
		return cache;
	};
	return { load };
};
