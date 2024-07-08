import {Buffer} from 'buffer';
import {Alert, Dimensions} from 'react-native';

// response code for check from backend side
export const responseCodes = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BED_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  REQUEST_TIME_OUT: 408,
  UNPROCESSED_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BED_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATE_WAY_TIMEOUT: 504,
  NETWORK_AUTH_REQUIRED: 511,
};

export const decodeBase64 = (
  value:
    | WithImplicitCoercion<string>
    | {[Symbol.toPrimitive](hint: 'string'): string},
) => {
  return Buffer.from(value, 'base64').toString('ascii');
};

export const HEIGHT = Dimensions.get('window').height;
export const WIDTH = Dimensions.get('window').width;

export function AlertBox(onAlert: {
  Title: any;
  Message: any;
  onOkPress?: any;
  ButtonTitle?: any;
}) {
  return Alert.alert(onAlert?.Title, onAlert?.Message, [
    {
      text: onAlert.ButtonTitle ? onAlert.ButtonTitle : 'OK',
      onPress: () => onAlert.onOkPress && onAlert.onOkPress(),
    },
  ]);
}
// export const netWorkCheck = async () => {
//   const state = await NetInfo.fetch();
//   return state.isConnected;
// };
