import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

/* Actions */
export const FETCHING_USER = 'FETCH_USER';
export const FETCHING_USER_SUCCESS = 'FETCHING_USER_SUCCESS';
export const FETCHING_USER_FAILED = 'FETCHING_USER_FAILED';

const fetchingUsersAction = () => ({ type: FETCHING_USER });

const fetchingUsersSuccessAction = (payload) => ({
  type: FETCHING_USER_SUCCESS,
  payload,
});

const fetchingUsersFailedAction = (error) => ({ type: FETCHING_USER_FAILED, error });

export const fetchUsers = () =>
  async function (dispatch) {
    dispatch(fetchingUsersAction());
    try {
      const response = await axios.get(API_URL);
      dispatch(fetchingUsersSuccessAction(response.data.map((item) => item.name)));
    } catch (error) {
      dispatch(fetchingUsersFailedAction(error?.message));
    }
  };
