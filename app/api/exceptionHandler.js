import { handleExpiredUser } from '../actions/authActions';
import { addAlert } from '../actions/alertActions';
import Locales from '../locales';

export const UserException = (status, message) => ({
  status,
  message
});

export const exceptionHandler = (exception, dispatch) => {
  switch (exception.status) { // TODO: will extend to all status code cases
    case 401:
      dispatch(handleExpiredUser());
      dispatch(addAlert(Locales.t('title_something_went_wrong')));
      break;
    default:
      dispatch(addAlert(exception.message));
      break;
  }
};
