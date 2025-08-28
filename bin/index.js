#!/usr/bin/env node
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import unscramblerFactory from "../src/unscrambler.js";

const unscrambler = unscramblerFactory( "./dictionaries" );
const MIN_ARG_LENGTH = 2;

const config = yargs( hideBin( process.argv ) )
	.usage( "Usage: $0 <letters> [--exact-match]" )
	.option( "exact-match", {
		alias: "x",
		type: "boolean",
		description: "Match words of the same length as the input"
	} );
const options = config.parse();

// console.log( options );

const cmds = options._;
const exactMatch = options.x;

if ( cmds.length < 1 ) {
	console.log( "missing required arguments" );
	config.showHelp();
}

if ( cmds.length > 0 ) {
	const [ letters, length, ...lettersAtEachPostion ] = cmds;
	const defLength = length ? length : 0;
	const correctedLength = defLength > letters.length ? letters.length : defLength;
	const validatedLength = exactMatch ? letters.length : correctedLength;

	if ( letters.length < MIN_ARG_LENGTH ) {
		console.log( "must contain more than one letter" );
	} else {
		const results = unscrambler.unscramble( letters, validatedLength, lettersAtEachPostion );
		if ( results.length === 0 ) {
			console.log( "no results" );
		} else {
			for ( let i = 3; i <= letters.length; i++ ) {
				const list = results.filter( r => r.length === i );
				if ( list.length > 0 ) {
					console.log( "" );
					let output = ""; // `${ i }-letter: `;
					while ( list.length ) {
						const next = list.shift();
						if ( output.length + next.length + 3 > 80 ) {
							console.log( output + "," );
							output = next;
						} else {
							if ( output.length > 0 ) {
								output += ", ";
							}
							output += next;
						}
						if ( list.length === 0 ) {
							console.log( output );
						}
					}
				}
			}
		}
	}
}
