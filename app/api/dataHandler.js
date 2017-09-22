import { exceptionHandler } from './exceptionHandler';

export const dataHandler = async (dispatch, func) => {
  try {
    await func();
  } catch (error) {
    exceptionHandler(error, dispatch);
  }
};

export const linterPreventer = () => {}; // linter warning when only one export in a file
