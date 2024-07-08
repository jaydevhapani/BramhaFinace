/*
  you can set your Header config. as well your backend side needed.
  this is normal default header config.
*/

import {isLoaderState} from '../reduxConfig/slices/commanSlice';
import {AlertBox, responseCodes} from '../utilies/constant';
import i18n from '../utilies/i18n';

//Normal_Post
export const Post_Api = async (
  Url: RequestInfo,
  params: any,
  dispatch?: any,
) => {
  dispatch(isLoaderState(true));
  console.log('====================================');
  console.log('Url :: ', Url);
  console.log('====================================');
  return await fetch(
    Url,
    params
      ? {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${global.accessToken}`,
          },
          body: JSON.stringify(params),
        }
      : {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${global.accessToken}`,
          },
        },
  )
    .then(response => response.json())
    .then(json => {
      const JsonData = checkOfResponseValidation(json);
      console.log('JsonData', JsonData);
      dispatch(isLoaderState(false));
      return JsonData;
    })
    .catch(error => {
      dispatch(isLoaderState(false));
      AlertBox({
        Title: i18n.Alert,
        Message: error.toString() + '!',
      });
      return error;
    });
};

//Form_Data_Post
export const Post_Form_Data_Api = async (Url: RequestInfo, params: any) => {
  return await fetch(Url, {
    method: 'POST',
    headers: {
      // Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${global.accessToken}`,
    },
    body: params,
  })
    .then(response => response.json())
    .then(json => {
      console.log('URL :::', Url);
      const JsonData = checkOfResponseValidation(json);
      console.log('JsonData', JsonData);
      return JsonData;
    })
    .catch(error => {
      AlertBox({
        Title: i18n.Alert,
        Message: error.toString() + '!',
      });
      return error;
    });
};

//Normal_Get
export const Get_Api = async (Url: RequestInfo, params: any) => {
  return await fetch(Url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${global.accessToken}`,
    },
  })
    .then(response => response.json())
    .then(json => {
      console.log('URL :::', Url);
      console.log('json :::', json);
      return json;
    })
    .catch(error => {
      AlertBox({
        Title: i18n.Alert,
        Message: 'Something Went Wrong!',
      });
      return error;
    });
};

//check All Validation of API
const checkOfResponseValidation = (response: {status: any; msg?: any}) => {
  if (response?.status === true) {
    return response;
  }
  //  else if (response?.status === responseCodes.UNAUTHORIZED) {
  //   AlertBox({
  //     Title: i18n.Alert,
  //     Message: response?.message,
  //     onOkPress: () => {
  //       // NavigationService.resetAndRedirect(ScreenName.Welcome);
  //     },
  //   });
  // }
  else {
    AlertBox({
      Title: i18n.Alert,
      Message: response?.msg,
    });
  }
};
