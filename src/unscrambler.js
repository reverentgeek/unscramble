import * as R from "ramda";
import dictionaryFactory from "./dictionary.js";
import { getLetterCounts } from "./utils.js";

export default dictionaryPath => {
	const dictionary = dictionaryFactory( dictionaryPath );

	const sortByLength = ( a, b ) => {
		if ( a.w.length < b.w.length ) {
			return -1;
		}
		if ( a.w.length > b.w.length ) {
			return 1;
		}
		if ( a.w < b.w ) {
			return -1;
		}
		if ( a.w > b.w ) {
			return 1;
		}
		return 0;
	};

	const isLengthEqualOrShorter = ( str1, str2 ) => {
		return str2.w.length <= str1.length;
	};

	const getWordsThatContainTheseLetters = letters => {
		return R.flatten( R.map( dictionary.getLookupDictionary, letters ) );
	};

	const filterWordsThatContainOtherLetters = ( words, scrambleKeys ) => {
		return R.filter( w => R.none( r => r === false, R.map( key => R.includes( key, scrambleKeys ), R.keys( w.c ) ) ), words );
	};

	const filterOutWordsTooLongOrShort = ( words, length ) => {
		return R.filter( w => w.w.length === length, words );
	};

	const filterOutWordsContainingMoreOccurrancesOfLetters = ( words, scrambleCounts ) => {
		const skeys = R.keys( scrambleCounts );
		return R.filter( w => R.all( r => !r, R.map( key => w.c[ key ] > scrambleCounts[ key ], skeys ) ), words );
	};

	const filterOutLettersByPosition = ( words, lettersAtEachPosition ) => {
		if ( lettersAtEachPosition.length === 0 ) {
			return words;
		}

		return R.filter( w => {
			for( let i = 0; i < lettersAtEachPosition.length; i++ ) {
				const posLetters = lettersAtEachPosition[i].toLowerCase();
				if ( i >= w.w.length ) {
					return false;
				}
				if ( posLetters !== "_" && posLetters.indexOf( w.w[i] ) === -1 ) {
					return false;
				}
			}
			return true;
		}, words );
	};

	const unscramble = ( scrambledLetters, length = 0, lettersAtEachPosition = [] ) => {
		const scramble = scrambledLetters.toLowerCase();
		const scrambleLetters = scramble.split( "" ).sort();
		const scrambleCounts = getLetterCounts( scrambleLetters );
		const skeys = R.keys( scrambleCounts );

		const curriedLengthEqualOrShorter = R.curry( isLengthEqualOrShorter );
		const isEqualOrShorterThanScrambledLetters = curriedLengthEqualOrShorter( scramble );

		const allPossibleResults = getWordsThatContainTheseLetters( skeys );
		const resultsMinusWordsTooBig = R.filter( isEqualOrShorterThanScrambledLetters, allPossibleResults );
		const uniqeResults = R.uniqBy( R.prop( "w" ), resultsMinusWordsTooBig );
		const resultsMinusWordsWithWrongLetters = filterWordsThatContainOtherLetters( uniqeResults, skeys );
		const minusWrongNumberOfLetters = filterOutWordsContainingMoreOccurrancesOfLetters( resultsMinusWordsWithWrongLetters, scrambleCounts );
		const finalResults = length > 0 ? filterOutWordsTooLongOrShort( minusWrongNumberOfLetters, length ) : minusWrongNumberOfLetters;
		const filteredByLetters = filterOutLettersByPosition( finalResults, lettersAtEachPosition );

		const sorted = R.sort( sortByLength, filteredByLetters );
		return sorted.map( v => v.w );
	};

	return {
		unscramble
	};
};
