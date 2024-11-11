import { describe, it } from "node:test";
import assert from "node:assert";

import unscramblerFunc from "../src/unscrambler.js";
const unscrambler = unscramblerFunc( "./tests/test-dictionaries" );

describe( "unscrambler", () => {
	it( "returns all matches", () => {
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
} );
