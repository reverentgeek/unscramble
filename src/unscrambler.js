import dictionaryFactory from "./dictionary.js";
import {
	getLetterCounts,
	isSubMultiset,
	matchesPositionConstraints
} from "./utils.js";

const sortByLengthThenAlpha = ( a, b ) => {
	if ( a.length !== b.length ) {
		return a.length - b.length;
	}
	if ( a < b ) {
		return -1;
	}
	if ( a > b ) {
		return 1;
	}
	return 0;
};

export default ( dictionaryPath ) => {
	const dictionary = dictionaryFactory( dictionaryPath );

	const unscramble = ( scrambledLetters, length = 0, lettersAtEachPosition = [] ) => {
		const scramble = scrambledLetters.toLowerCase();
		const inputCounts = getLetterCounts( scramble );
		const maxLen = scramble.length;
		const dict = dictionary.load();
		const results = [];

		for ( const key in dict ) {
			if ( key.length > maxLen ) {
				continue;
			}
			if ( length > 0 && key.length !== length ) {
				continue;
			}
			if ( !isSubMultiset( getLetterCounts( key ), inputCounts ) ) {
				continue;
			}
			for ( const word of dict[key] ) {
				if ( lettersAtEachPosition.length === 0 || matchesPositionConstraints( word, lettersAtEachPosition ) ) {
					results.push( word );
				}
			}
		}

		return results.sort( sortByLengthThenAlpha );
	};

	return { unscramble };
};
