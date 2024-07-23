/* eslint-disable prettier/prettier */
import {GET_RASPBERRYPILOCALIP, SUCCESS, FAIL} from '../action-types';

export const raspberryPiLocalIp = send =>
  // console.warn('6_payload', send);
dispatch =>
  dispatch({
    type: GET_RASPBERRYPILOCALIP,
    payload: {
      request: {
        url: `http://52.66.113.96/i-switch/automation/get_local_ip.php`,
        method: 'POST',
        data: [...send],
      },

      options: {
          onSuccess({ response }) {
              const { data, error, status } = response;
              if (response) {
                  dispatch({
                      type: `${GET_RASPBERRYPILOCALIP}_${SUCCESS}`,
                      payload: data,
                  });

                  //  console.warn("25 response data after api call raspberryPiLocalIp" , response.data);
                  //  console.warn("25 send raspberryPiLocalIp" , send);
                  return Promise.resolve(data);
              }
              dispatch({
                  type: `${GET_RASPBERRYPILOCALIP}_${SUCCESS}`,
                  payload: data,
              });
              return Promise.reject({ response });

          },
          onError(exception) {
              // console.log(response, onError);
              if (exception.error.isAxiosError) {
                  const { response: { data: dataError }, } = exception.error;
                  dispatch({
                      type: `${GET_RASPBERRYPILOCALIP}_${FAIL}`,
                      payload: { dataError }
                  });
                  return Promise.reject(dataError);
              }
              dispatch({
                  type: `${GET_RASPBERRYPILOCALIP}_${FAIL}`,
                  payload: {}
              });
              return Promise.reject();
          },
      },
    },
  });
