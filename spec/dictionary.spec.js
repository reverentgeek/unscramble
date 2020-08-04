"use strict";

const dictionary = require( "../src/dictionary" )( "./spec/test-dictionaries" );

describe( "dictionary", () => {
	it( "returns the correct 'a' dictionary file", () => {
		const results = dictionary.getLookupDictionary( "a" );
		const expected = [];
		results.should.deep.equal( expected );
	} );

	it( "returns the correct 'e' dictionary file", () => {
		const results = dictionary.getLookupDictionary( "e" );
		const expected = [
			{
				w: "es",
				c: {
					e: 1,
					s: 1
				}
			},
			{
				w: "et",
				c: {
					e: 1,
					t: 1
				}
			},
			{
				w: "set",
				c: {
					s: 1,
					e: 1,
					t: 1
				}
			},
			{
				w: "tet",
				c: {
					t: 2,
					e: 1
				}
			},
			{
				w: "sett",
				c: {
					s: 1,
					e: 1,
					t: 2
				}
			},
			{
				w: "stet",
				c: {
					s: 1,
					t: 2,
					e: 1
				}
			},
			{
				w: "test",
				c: {
					t: 2,
					e: 1,
					s: 1
				}
			},
			{
				w: "tets",
				c: {
					t: 2,
					e: 1,
					s: 1
				}
			}
		];
		results.should.deep.equal( expected );
	} );
} );
