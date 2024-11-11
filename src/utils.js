export function getLetterCounts( letters ) {
	const letterCount = {};
	for ( let i = 0; i < letters.length; i++ ) {
		const hasProperty = Object.prototype.hasOwnProperty.call( letterCount, letters[i] );
		if ( hasProperty ) {
			letterCount[ letters[ i ] ]++;
		} else {
			letterCount[ letters[ i ] ] = 1;
		}
	}
	return letterCount;
};
