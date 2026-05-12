#!/usr/bin/env node
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import unscramblerFactory from "../src/unscrambler.js";

const MIN_INPUT_LENGTH = 2;
const MIN_OUTPUT_LENGTH = 3;
const LINE_WIDTH = 80;

const dictionaryPath = join( dirname( fileURLToPath( import.meta.url ) ), "..", "dictionaries" );

function parsePositions( args ) {
	if ( args.length === 1 && String( args[0] ).length > 1 ) {
		return String( args[0] ).split( "" );
	}
	return args.map( String );
}

function printWrapped( words ) {
	let line = "";
	for ( const word of words ) {
		const sep = line.length === 0 ? "" : ", ";
		if ( line.length + sep.length + word.length > LINE_WIDTH ) {
			console.log( line + "," );
			line = word;
		} else {
			line += sep + word;
		}
	}
	if ( line.length > 0 ) {
		console.log( line );
	}
}

function main() {
	const config = yargs( hideBin( process.argv ) )
		.usage( "Usage: $0 <letters> [length] [pos1 pos2 ...] [--exact-match]" )
		.option( "exact-match", {
			alias: "x",
			type: "boolean",
			description: "Match only words that use every input letter"
		} )
		.example( "$0 cabno", "all words made from c,a,b,n,o" )
		.example( "$0 cabno 5", "only 5-letter words" )
		.example( "$0 cabno -x", "words using all 5 letters" )
		.example( "$0 cabno 5 b___n", "5-letter words starting with 'b' and ending with 'n' (_ is a wildcard)" )
		.help();

	const options = config.parse();
	const [ letters, lengthArg, ...lettersAtEachPosition ] = options._;
	const exactMatch = options["exact-match"];

	if ( !letters ) {
		console.log( "missing required arguments" );
		config.showHelp();
		process.exitCode = 1;
		return;
	}

	const letterString = String( letters );

	if ( letterString.length < MIN_INPUT_LENGTH ) {
		console.log( "must contain more than one letter" );
		process.exitCode = 1;
		return;
	}

	const requestedLength = Number( lengthArg ) || 0;
	const cappedLength = requestedLength > letterString.length ? letterString.length : requestedLength;
	const finalLength = exactMatch ? letterString.length : cappedLength;

	const unscrambler = unscramblerFactory( dictionaryPath );
	const results = unscrambler.unscramble( letterString, finalLength, parsePositions( lettersAtEachPosition ) );

	if ( results.length === 0 ) {
		console.log( "no results" );
		return;
	}

	for ( let len = MIN_OUTPUT_LENGTH; len <= letterString.length; len++ ) {
		const list = results.filter( r => r.length === len );
		if ( list.length > 0 ) {
			console.log( "" );
			printWrapped( list );
		}
	}
}

main();
