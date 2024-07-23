/* eslint-disable prettier/prettier */
import {GET_ALLLOCATION, SUCCESS, FAIL} from '../action-types';

export const getAllLocation = send =>
  // console.warn('6 fan_speed_change send from automannual screen', send);
dispatch =>
  dispatch({
    type: GET_ALLLOCATION,
    payload: {
      request: {
        url: `http://52.66.113.96/i-switch/automation/get_all_location.php`,
        method: 'POST',
        data: [...send],
      },

      options: {
          onSuccess({ response }) {
              const { data, error, status } = response;
              if (response) {
                  dispatch({
                      type: `${GET_ALLLOCATION}_${SUCCESS}`,
                      payload: data,
                  });

                   console.warn("25 response data after api call getAllLocation" , response.data);
                   console.warn("25 send getAllLocation" , send);
                  return Promise.resolve(data);
              }
              dispatch({
                  type: `${GET_ALLLOCATION}_${SUCCESS}`,
                  payload: data,
              });
              return Promise.reject({ response });

          },
          onError(exception) {
              // console.log(response, onError);
              if (exception.error.isAxiosError) {
                  const { response: { data: dataError }, } = exception.error;
                  dispatch({
                      type: `${GET_ALLLOCATION}_${FAIL}`,
                      payload: { dataError }
                  });
                  return Promise.reject(dataError);
              }
              dispatch({
                  type: `${GET_ALLLOCATION}_${FAIL}`,
                  payload: {}
              });
              return Promise.reject();
          },
      },
    },
  });
