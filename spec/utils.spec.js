"use strict";

const utils = require( "../src/utils" );

describe( "utils", () => {
	it( "getLetterCounts returns letter counts", () => {
		const r = utils.getLetterCounts( "aaabbccdef" );
		const expected = { a: 3, b: 2, c: 2, d: 1, e: 1, f: 1 };
		r.should.deep.eq( expected );
	} );
} );
