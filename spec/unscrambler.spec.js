"use strict";

const unscrambler = require( "../src/unscrambler" )( "./spec/test-dictionaries" );

describe( "unscrambler", () => {
	it( "returns all matches", () => {
		const results = unscrambler.unscramble( "test", 0 );
		const expected = [ "es", "et", "set", "tet", "sett", "stet", "test", "tets" ];
		results.should.deep.equal( expected );
	} );

	it( "returns all four-letter matches", () => {
		const results = unscrambler.unscramble( "test", 4 );
		const expected = [ "sett", "stet", "test", "tets" ];
		results.should.deep.equal( expected );
	} );

	it( "returns all three-letter matches", () => {
		const results = unscrambler.unscramble( "test", 3 );
		const expected = [ "set", "tet" ];
		results.should.deep.equal( expected );
	} );
} );
