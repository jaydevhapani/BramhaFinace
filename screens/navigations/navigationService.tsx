import {CommonActions, StackActionType, StackActions} from '@react-navigation/native';
let _navigator: { reset: (arg0: { routes: { name: any; }[]; }) => void; dispatch: (arg0: CommonActions.Action | StackActionType) => void; };

/**
 * @function setTopLevelNavigator
 * @param {*} navigatorRef
 */
function setTopLevelNavigator(navigatorRef: { reset: (arg0: { routes: { name: any; }[]; }) => void; dispatch: (arg0: CommonActions.Action | StackActionType) => void; }) {
  _navigator = navigatorRef;
}

/**
 * @function resetAndRedirect
 * @param {*} routeName
 */
function resetAndRedirect(routeName: String) {
  _navigator.reset({
    routes: [{name: routeName}],
  });
}

/**
 * @function navigate
 * @param {*} routeName
 * @param {*} params
 */
function navigate(routeName: any, params: any) {
  _navigator.dispatch(
    CommonActions.navigate({
      name: routeName,
      params: params,
    }),
  );
}


/**
 * @function goBack
 */
function goBack() {
  _navigator.dispatch(StackActions.pop());
}

export default {
  navigate,
  goBack,
  setTopLevelNavigator,
  resetAndRedirect,
};
