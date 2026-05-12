import { describe, it } from "node:test";
import assert from "node:assert";

import dictionaryFactory from "../src/dictionary.js";
const dictionary = dictionaryFactory( "./tests/test-dictionaries" );

describe( "dictionary", () => {
	it( "loads the dictionary keyed by sorted letters", () => {
		const dict = dictionary.load();
		const expected = {
			es: [ "es" ],
			et: [ "et" ],
			est: [ "set" ],
			ett: [ "tet" ],
			estt: [ "sett", "stet", "test", "tets" ]
		};
		assert.deepEqual( dict, expected );
	} );

	it( "caches the loaded dictionary across calls", () => {
		const first = dictionary.load();
		const second = dictionary.load();
		assert.strictEqual( first, second );
	} );
} );
