import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

const sortLetters = word => word.split( "" ).sort().join( "" );

function buildDictionary( inputFile, outputFile ) {
	console.log( `reading ${ inputFile }...` );
	const words = readFileSync( inputFile, "utf8" )
		.split( "\n" )
		.map( w => w.trim().toLowerCase() )
		.filter( Boolean );

	console.log( `indexing ${ words.length } words...` );
	const dict = {};
	for ( const word of words ) {
		const key = sortLetters( word );
		if ( !dict[key] ) {
			dict[key] = [ word ];
		} else if ( !dict[key].includes( word ) ) {
			dict[key].push( word );
		}
	}

	mkdirSync( dirname( outputFile ), { recursive: true } );
	console.log( `writing ${ outputFile }...` );
	writeFileSync( outputFile, JSON.stringify( dict ) );
}

console.log( "rebuilding lookup dictionary..." );
buildDictionary( "./tasks/testwords.txt", "./tests/test-dictionaries/dictionary.json" );
buildDictionary( "./tasks/words.txt", "./dictionaries/dictionary.json" );
