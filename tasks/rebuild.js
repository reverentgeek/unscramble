/* eslint-disable no-console */
"use strict";

const R = require( "ramda" );
const fs = require( "fs-jetpack" );
const utils = require( "../src/utils" );

const buildLookupDictionary = ( inputFile, outputDir ) => {
	console.log( `reading word file ./tasks/${ inputFile }...` );
	const wordFile = fs.read( `./tasks/${ inputFile }` );
	console.log( "parsing words..." );
	const words = wordFile.split( "\n" );
	const alphas = "abcdefghijklmnopqrstuvwxyz".split( "" );
	const lookup = {};
	for ( let i = 0; i < alphas.length; i++ ) {
		lookup[ alphas[ i ] ] = [];
	}

	for ( let i = 0; i < words.length; i++ ) {
		const word = { w: "", c: 0 };
		word.w = words[ i ].toLowerCase();
		word.c = utils.getLetterCounts( words[ i ] );
		const keys = R.keys( word.c );
		for ( let j = 0; j < keys.length; j++ ) {
			lookup[ keys[ j ] ].push( word );
		}
	}

	fs.remove( `${ outputDir }/*.json` );

	for ( let i = 0; i < alphas.length; i++ ) {
		console.log( `writing ${ outputDir }/dictionary-${ alphas[ i ] }` );
		fs.write( `${ outputDir }/dictionary-${ alphas[ i ] }.json`, lookup[ alphas[ i ] ] );
	}
};

console.log( "rebuilding lookup dictionary..." );
buildLookupDictionary( "testwords.txt", "./spec/test-dictionaries" );
buildLookupDictionary( "words.txt", "./dictionaries" );
