import { describe, it } from "node:test";
import assert from "node:assert";

import unscramblerFactory from "../src/unscrambler.js";
const unscrambler = unscramblerFactory( "./tests/test-dictionaries" );

describe( "unscrambler", () => {
	it( "returns all matches sorted by length then alphabetically", () => {
		const results = unscrambler.unscramble( "test", 0 );
		const expected = [ "es", "et", "set", "tet", "sett", "stet", "test", "tets" ];
		assert.deepEqual( results, expected );
	} );

	it( "returns all four-letter matches", () => {
		const results = unscrambler.unscramble( "test", 4 );
		const expected = [ "sett", "stet", "test", "tets" ];
		assert.deepEqual( results, expected );
	} );

	it( "returns all three-letter matches", () => {
		const results = unscrambler.unscramble( "test", 3 );
		const expected = [ "set", "tet" ];
		assert.deepEqual( results, expected );
	} );

	it( "filters by position constraints", () => {
		const results = unscrambler.unscramble( "test", 0, [ "s" ] );
		assert.deepEqual( results, [ "set", "sett", "stet" ] );
	} );

	it( "treats underscore in position constraints as a wildcard", () => {
		const results = unscrambler.unscramble( "test", 4, [ "_", "_", "_", "t" ] );
		assert.deepEqual( results, [ "sett", "stet", "test" ] );
	} );

	it( "supports multiple allowed letters at a position", () => {
		const results = unscrambler.unscramble( "test", 3, [ "st", "e" ] );
		assert.deepEqual( results, [ "set", "tet" ] );
	} );

	it( "returns an empty array when nothing matches", () => {
		const results = unscrambler.unscramble( "xyz", 0 );
		assert.deepEqual( results, [] );
	} );

	it( "is case-insensitive on the input letters", () => {
		const results = unscrambler.unscramble( "TEST", 3 );
		assert.deepEqual( results, [ "set", "tet" ] );
	} );
} );
