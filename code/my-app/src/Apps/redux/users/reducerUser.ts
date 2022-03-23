import { AnyAction } from "redux";
import { IUser } from "../../../common/interface/user";

interface IUserReducer {
  user?: IUser | null;
}

export const MODULE_USER = "MODULE_USER";

const initialState: IUserReducer = {
  user: null,
};

function reducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    default:
      return state;
  }
}

export default reducer;
