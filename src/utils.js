export function getLetterCounts( letters ) {
	const counts = {};
	for ( const c of letters ) {
		if ( Object.hasOwn( counts, c ) ) {
			counts[c]++;
		} else {
			counts[c] = 1;
		}
	}
	return counts;
}

export function sortLetters( word ) {
	return word.split( "" ).sort().join( "" );
}

export function isSubMultiset( smallerCounts, largerCounts ) {
	for ( const key in smallerCounts ) {
		if ( ( largerCounts[key] || 0 ) < smallerCounts[key] ) {
			return false;
		}
	}
	return true;
}

export function matchesPositionConstraints( word, positions ) {
	for ( let i = 0; i < positions.length; i++ ) {
		if ( i >= word.length ) {
			return false;
		}
		const allowed = positions[i].toLowerCase();
		if ( allowed !== "_" && !allowed.includes( word[i] ) ) {
			return false;
		}
	}
	return true;
}
