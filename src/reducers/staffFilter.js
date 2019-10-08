import { C } from '../actions';

const initialState = {
  staffFilter: {
    items: {
      role: {
        type: 'select',
        value: ''
      },
      isArchive: {
        type: 'checkbox',
        value: true
      }
    }
  }
};


export default function staffTable(state = initialState, action) {
  switch (action.type) {
    case C.STAFF_FILTER_SET_VALUE:
      return {
        ...state,
        staffFilter: {
          ...state.staffFilter,
          items: action.val
        }
      };

    default:
      return state;
  }
}