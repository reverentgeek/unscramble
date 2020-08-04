#!/usr/bin/env node
"use strict";

const yargs = require( "yargs" );
const unscrambler = require( "../src/unscrambler" )( "./dictionaries" );
const MIN_ARG_LENGTH = 2;

const argv = yargs
	.boolean( "x" )
	.argv;

const cmds = argv._;
const exactMatch = argv.x;

if ( cmds.length < 1 && !exactMatch ) {
	console.log( "missing required arguments" );
} else if ( cmds.length > 0 ) {
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
			for( let i = 3; i <= letters.length; i++ ) {
				const list = results.filter( r => r.length === i );
				if ( list.length > 0 ){
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
