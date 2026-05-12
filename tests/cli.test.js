import { describe, it } from "node:test";
import assert from "node:assert";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname( fileURLToPath( import.meta.url ) );
const cli = join( here, "..", "bin", "index.js" );

function run( ...args ) {
	return spawnSync( process.execPath, [ cli, ...args ], { encoding: "utf8" } );
}

describe( "cli", () => {
	it( "prints words grouped by length for valid input", () => {
		const { stdout, status } = run( "cabno" );
		assert.strictEqual( status, 0 );
		assert.match( stdout, /\bbacon\b/ );
		assert.match( stdout, /\bcab\b/ );
	} );

	it( "respects the positional length argument", () => {
		const { stdout, status } = run( "cabno", "5" );
		assert.strictEqual( status, 0 );
		assert.match( stdout, /\bbacon\b/ );
		assert.doesNotMatch( stdout, /\bcab\b/ );
	} );

	it( "--exact-match restricts to words using all letters", () => {
		const { stdout, status } = run( "cabno", "--exact-match" );
		assert.strictEqual( status, 0 );
		assert.match( stdout, /\bbacon\b/ );
		assert.doesNotMatch( stdout, /\bcab\b/ );
	} );

	it( "supports a position pattern with underscore wildcards", () => {
		const { stdout, status } = run( "cabno", "5", "b___n" );
		assert.strictEqual( status, 0 );
		assert.match( stdout, /\bbacon\b/ );
		assert.doesNotMatch( stdout, /\bbanco\b/ );
	} );

	it( "supports position constraints as separate arguments", () => {
		const { stdout, status } = run( "cabno", "5", "b", "_", "_", "_", "n" );
		assert.strictEqual( status, 0 );
		assert.match( stdout, /\bbacon\b/ );
		assert.doesNotMatch( stdout, /\bbanco\b/ );
	} );

	it( "exits with status 1 when no letters are provided", () => {
		const { stderr, stdout, status } = run();
		assert.strictEqual( status, 1 );
		assert.match( stdout + stderr, /missing required arguments/ );
	} );

	it( "exits with status 1 when input is a single letter", () => {
		const { stdout, status } = run( "a" );
		assert.strictEqual( status, 1 );
		assert.match( stdout, /must contain more than one letter/ );
	} );

	it( "prints 'no results' when nothing matches", () => {
		const { stdout, status } = run( "xz" );
		assert.strictEqual( status, 0 );
		assert.match( stdout, /no results/ );
	} );
} );
