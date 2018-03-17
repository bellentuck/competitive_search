/*
 * MINIMAX.JS
 *
 * This is the only file you need
 * to modify to pass all tests.
 *
 * Contents:
 * 1. minimaxWrapper: Pre-written
 * 2. heuristic: Pre-written
 * 3. baseCase: Must complete
 * 4. minimax: Must complete
 * 5. minimaxAlphaBeta: Must complete
 */


/*
 * minimaxWrapper
 *
 * This is the only function called when
 * playing against your algorithm.
 *
 * To switch from playing against the
 * 'minimax' to 'minimaxAlphaBeta'
 * algorithm, swap them below. (on line 28)
 */
const DEPTH = 3;
const minimaxWrapper = (state, maximizingPlayer) =>
    minimax(state, DEPTH, maximizingPlayer);


/*
 * heuristic
 *
 * The 'heuristic' function returns a number
 * evaluation how good a state is, from the
 * perspective of the maximizing player.
 * You will need to invoke it in minimax.
 * Spend a little time trying to understand
 * it.
 *
 * Input:
 *  state: Object representing state.
 *  maximizingPlayer: 'x' or 'o'.
 * Output:
 *  Number evaluating how good state is,
 *  from perspective of maximizing
 *  player. (so, negative of this for minimizing player.)
 */
const heuristic = (state, maximizingPlayer) => {

	//This is how you can retrieve the minimizing player.
    const minimizingPlayer = (maximizingPlayer == 'x') ? 'o' : 'x';

    // state.numLines(number, player) gives you the number
    // of lines of length "number" for that player.
    //
    // So for instance, for a state like this
    // _ _ _ _ _ _ _
    // _ _ _ _ _ _ _
    // _ _ _ _ x _ o
    // _ _ _ x o _ x
    // _ _ o x o _ x
    //
    // state.numLines(2,'o') would return 1
    // state.numLines(2,'x') would return 3
    //
    // The following function, sums up the number of lines
    // of lengths 2, 3, and 4, weighted very strongly according
    // to their length.
    const advantageFunction = player => [2,3,4].reduce((total, numLines) =>
        total + state.numLines(numLines, player) * Math.pow(100, numLines), 0);

    // Then for the heuristic, we just return the advantage
    // of the maximizing player, less the advantage of the
    // minimizing player.
    return advantageFunction(maximizingPlayer) - advantageFunction(minimizingPlayer);
}

/*
 * isBaseCase
 *
 * Should return true if we should no
 * longer recurse through minimax. So
 * if you have reached a depth of zero or
 * there are no possible successor states,
 * it should return true.
 *
 * ANY INFORMATION YOU NEED from
 * the "state" object is already pulled
 * from it.
 *
 */
const isBaseCase = (state, depth) => {
    const possibleSuccessorStates = state.nextStates(); //(); // for some reason this alone stops working
    // const possibleSuccessorStates = (function(){
    //     let result;
    //     try { result = state.nextStates() }
    //     catch (e) { result = state.nextStates }
    //     return result;
    // })() || [];
    const numberPossibleSuccessorStates = possibleSuccessorStates.length;

    //i.  'Returns "true" when depth is zero, false otherwise'
    const depthIsZero = depth === 0;
    //ii. 'Returns "true" when someone has won, false otherwise'
    const someoneHasWon = numberPossibleSuccessorStates < depth;

    return depthIsZero || someoneHasWon;
}

/*
 * minimax
 *
 * Input:
 *   state: Object representing state
 *   depth: How much deeper one should recurse
 *   maximizingPlayer: 'x' or 'o'
 * Output:
 *   Number evaluating state, just like
 *   heuristic does.
 */
const minimax = (state, depth, maximizingPlayer) => {
    if (isBaseCase(state, depth)) {
        // Invoke heuristic
        // only need to get a single abs val;
        // we know what is better for who.
        return heuristic(state, maximizingPlayer);

    } else {
        // Possible states is an array of future states, of
        // the same kind that gets passed into the "state"
        // paramter in minimax.
        const possibleStates = state.nextStates();
        const minimizingPlayer = maximizingPlayer === 'x' ? 'o' : 'x';
        const currentPlayer = state.nextMovePlayer;

        depth--;

        if (currentPlayer === minimizingPlayer) {
            //want the smallest possibleState
            return possibleStates.reduce((advantage, state) => {
                const newAdvantage = minimax(state, depth, maximizingPlayer);
                if (newAdvantage < advantage) advantage = newAdvantage;
                return advantage;
            }, Infinity);

        } else { // currentPlayer === maximizing player
            return possibleStates.reduce((advantage, state) => {
                const newAdvantage = minimax(state, depth, maximizingPlayer);
                if (newAdvantage > advantage) advantage = newAdvantage;
                return advantage;
            }, -Infinity);
        }

        // Reduce to further
        // invocations of minimax.

    }
}


/*
 * minimaxAlphaBeta
 *
 * Input and output are same as for minimax.
 * Th
 */
const minimaxAlphaBeta = (state, depth, maximizingPlayer) => {

	const minimaxAlphaBetaInner = (state, depth, alpha, beta) => {

        if (isBaseCase(state, depth)) {
            // Invoke heuristic
            return heuristic(state, maximizingPlayer);
        } else {


            const possibleStates = state.nextStates();
            const minimizingPlayer = maximizingPlayer === 'x' ? 'o' : 'x';
            const currentPlayer = state.nextMovePlayer;

            depth--;

            if (currentPlayer === minimizingPlayer) {
                //want the smallest possibleState
                return possibleStates.reduce((advantage, state) => {
                    const newAdvantage = minimaxAlphaBeta(state, depth, maximizingPlayer);
                    if (newAdvantage < advantage) advantage = newAdvantage;
                    return advantage;
                }, beta);

            } else { // currentPlayer === maximizing player
                return possibleStates.reduce((advantage, state) => {
                    const newAdvantage = minimaxAlphaBeta(state, depth, maximizingPlayer);
                    if (newAdvantage > advantage) advantage = newAdvantage;
                    return advantage;
                }, alpha);
            }

            // Reduce further.
            // const possibleStates = state.nextStates();
            // const minimizingPlayer = maximizingPlayer === 'x' ? 'o' : 'x';
            // const currentPlayer = state.nextMovePlayer;
            // depth--;

            // if (currentPlayer === minimizingPlayer) {
            //     let alphaNew = minimax(state, depth, maximizingPlayer);
            //     if (alpha > alphaNew) {
            //         return alpha;
            //     } else {
            //         return alphaNew
            //     }
            // } else {
            //     let alphaNew = minimax(state, depth, maximizingPlayer);
            //     if (alpha > alphaNew) {
            //         return alpha;
            //     } else {
            //         return alphaNew
            //     }
            // }

            // return minimax(state, depth, maximizingPlayer)
        }
	}

	return minimaxAlphaBetaInner(state, depth, -10000000,10000000);
}

module.exports = {
    minimaxWrapper,
    minimax,
    minimaxAlphaBeta,
    isBaseCase,
    heuristic
};

