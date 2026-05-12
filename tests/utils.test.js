import { describe, it } from "node:test";
import assert from "node:assert";
import {
	getLetterCounts,
	sortLetters,
	isSubMultiset,
	matchesPositionConstraints
} from "../src/utils.js";

describe( "utils", () => {
	it( "getLetterCounts returns letter counts", () => {
		const r = getLetterCounts( "aaabbccdef" );
		const expected = { a: 3, b: 2, c: 2, d: 1, e: 1, f: 1 };
		assert.deepEqual( r, expected );
	} );

	it( "sortLetters returns letters sorted alphabetically", () => {
		assert.strictEqual( sortLetters( "cabno" ), "abcno" );
		assert.strictEqual( sortLetters( "test" ), "estt" );
	} );

	it( "isSubMultiset returns true when smaller fits in larger", () => {
		assert.strictEqual( isSubMultiset( { a: 1, b: 1 }, { a: 1, b: 1, c: 1 } ), true );
		assert.strictEqual( isSubMultiset( { t: 2 }, { t: 2, e: 1 } ), true );
	} );

	it( "isSubMultiset returns false when smaller has more of a letter", () => {
		assert.strictEqual( isSubMultiset( { t: 3 }, { t: 2 } ), false );
		assert.strictEqual( isSubMultiset( { z: 1 }, { a: 1 } ), false );
	} );

	it( "matchesPositionConstraints accepts underscore as wildcard", () => {
		assert.strictEqual( matchesPositionConstraints( "test", [ "_", "_", "_", "_" ] ), true );
	} );

	it( "matchesPositionConstraints checks each position", () => {
		assert.strictEqual( matchesPositionConstraints( "test", [ "t", "e" ] ), true );
		assert.strictEqual( matchesPositionConstraints( "test", [ "abc" ] ), false );
		assert.strictEqual( matchesPositionConstraints( "test", [ "ts", "e" ] ), true );
	} );

	it( "matchesPositionConstraints rejects when word is shorter than constraints", () => {
		assert.strictEqual( matchesPositionConstraints( "te", [ "t", "e", "s", "t" ] ), false );
	} );
} );
