import { describe, it } from "node:test";
import assert from "node:assert";
import { getLetterCounts } from "../src/utils.js";

describe( "utils", () => {
	it( "getLetterCounts returns letter counts", () => {
		const r = getLetterCounts( "aaabbccdef" );
		const expected = { a: 3, b: 2, c: 2, d: 1, e: 1, f: 1 };
		assert.deepEqual( r, expected );
	} );
} );
