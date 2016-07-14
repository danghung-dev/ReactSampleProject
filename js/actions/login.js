/**
 *
 * @flow
 */

'use strict';



import type { Action, ThunkAction } from './types';


function skipLogin(): Action {
  return {
    type: 'SKIPPED_LOGIN',
  };
}



module.exports = { skipLogin};
