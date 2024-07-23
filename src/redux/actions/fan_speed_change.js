/* eslint-disable prettier/prettier */
import {GET_CHANGEFANSPEED, SUCCESS, FAIL} from '../action-types';

export const fan_speed_change = send =>
  // console.warn('6 fan_speed_change send from automannual screen', send);
dispatch =>
  dispatch({
    type: GET_CHANGEFANSPEED,
    payload: {
      request: {
        // url: `http://52.66.113.96/i-switch/automation/set_fan_speedaa.php`,
        url: `http://${send[0]['ip']}/i-switch/automation/set_fan_speedaa.php`,
        method: 'POST',
        data: [...send],
      },

      options: {
          onSuccess({ response }) {
              const { data, error, status } = response;
              if (response) {
                  dispatch({
                      type: `${GET_CHANGEFANSPEED}_${SUCCESS}`,
                      payload: data,
                  });

                  // console.warn("25 send fan_speed_change" , send);
                  //  console.warn("25 response data after api call fan_speed_change" , response.data);
                  return Promise.resolve(data);
              }
              dispatch({
                  type: `${GET_CHANGEFANSPEED}_${SUCCESS}`,
                  payload: data,
              });
              return Promise.reject({ response });

          },
          onError(exception) {
              // console.log(response, onError);
              if (exception.error.isAxiosError) {
                  const { response: { data: dataError }, } = exception.error;
                  dispatch({
                      type: `${GET_CHANGEFANSPEED}_${FAIL}`,
                      payload: { dataError }
                  });
                  return Promise.reject(dataError);
              }
              dispatch({
                  type: `${GET_CHANGEFANSPEED}_${FAIL}`,
                  payload: {}
              });
              return Promise.reject();
          },
      },
    },
  });
