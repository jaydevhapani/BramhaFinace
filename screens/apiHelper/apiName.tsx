const isProducation = true;
const D_URL = 'https://smpl.finsolve.in/web/apifin/';
const P_URL = 'https://smpl.finsolve.in/web/apifin/';
export const BASE_PAYMENT_KEY = isProducation ? 'sfpl' : 'testing';

const BASE_URL = isProducation ? P_URL : D_URL;
export default {
  getOtp: BASE_URL + 'customerLogin',
  verifyOtp: BASE_URL + 'customerLoginVerify',
  activeLoan: BASE_URL + 'getActiveLoans',
  activeLoanDetails: BASE_URL + 'getLoanDetail',
  advanceEmi: BASE_URL + 'getAdvanceEMI',
  holyday: BASE_URL + 'getHolidayEMI',
  getProfile: BASE_URL + 'getProfile',
  myLoans: BASE_URL + 'getMyLoans',
  getInTouch: BASE_URL + 'getInTouch',
  getMandateDetail: BASE_URL + 'getMandateDetail',
  applyNewLoan: BASE_URL + 'applyNewLoan',
  getNotifications: BASE_URL + 'getNotifications',
  clearNotifications: BASE_URL + 'clearNotifications',
  getFaqs: BASE_URL + 'getFaqs',
  getPrivacyPolicy: BASE_URL + 'getPrivacyPolicy',
  foreCloseRequest: BASE_URL + 'foreCloseRequest',
  TermsOfService: BASE_URL + 'getTermsOfService',
  FairPracticeCode: BASE_URL + 'getFairPracticeCode',
  Citizen: BASE_URL + 'getCitizenCharter',
  AboutUs: BASE_URL + 'getAboutUs',
  EmiCal: BASE_URL + 'emiCalculator',
  getSocialLinks: BASE_URL + 'getSocialLinks',
  registerFcm: BASE_URL + 'updateFCMtoken',
  updateLocation: BASE_URL + 'updateLocation',
};
