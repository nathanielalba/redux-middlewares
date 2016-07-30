export default function({ dispatch }) {
  return next => action => {
    // if action does not payload, or a then prop. Since promise will have a .then
    if(!action.payload || !action.payload.then) {
      return next(action);
    }

    // Make sure the action's promise resolves
    action.payload.then(function(response) {
      // create a new action with the old type, but
      // replace the promise with the response data
      const newAction = { ...action, payload: response }
      dispatch(newAction);
    });
  };
}

// return function(next) {
//   return function(action) {
//     console.log(action);
//
//     next(action);
//   }
// }
