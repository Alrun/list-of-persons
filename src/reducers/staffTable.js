import { C } from '../actions';

const initialState = {
  staffTable: {
    isLoading: false,
    textError: '',
    dataResponse: [],
    filteredData: []
  }
};

export default function staffTable(state = initialState, action) {
  switch (action.type) {
    case C.STAFF_TABLE_LOADING:
      return {
        ...state,
        staffTable: {
          ...state.staffTable,
          isLoading: action.bool
        }
      };

    case C.STAFF_TABLE_ERROR:
      return {
        ...state,
        textError: action.msg
      };

    case C.STAFF_TABLE_FETCH_SUCCESS:
      return {
        ...state,
        staffTable: {
          ...state.staffTable,
          dataResponse: action.response
        }
      };

    case C.STAFF_TABLE_FILTER:
      const filterData = data => {
        return data.filter(row => {
          let match = true;

          action.list.forEach(item => {
            for (let val in item) {
              if (item.hasOwnProperty(val)) {
                if (item[val].type === 'checkbox') {
                  if (!item[val].value) {
                    if (row[val] !== item[val].value) {
                      match = false;
                    }
                  }
                }
                if (item[val].type === 'select') {
                  if (item[val].value) {
                    if (row[val] !== item[val].value) {
                      match = false;
                    }
                  }
                }
              }
            }
          });
          return match;
        });
      };

      return {
        ...state,
        staffTable: {
          ...state.staffTable,
          filteredData: filterData(state.staffTable.dataResponse)
        }
      };

    case C.STAFF_TABLE_EDIT_ROW:
      return {
        ...state,
        staffTable: {
          ...state.staffTable,
          dataResponse:
            state.staffTable.dataResponse.some(item => action.row.id === item.id)
            ? state.staffTable.dataResponse.map(i => {
              if (i.id === action.row.id) {
                return action.row;
              } else return i;
            })
            : [
                ...state.staffTable.dataResponse,
                action.row
              ]
        }
      };

    case C.STAFF_TABLE_DELETE_ROW:
      return {
        ...state,
        staffTable: {
          ...state.staffTable,
          dataResponse: state.staffTable.dataResponse.filter(item => item.id !== action.id),
          filteredData: state.staffTable.filteredData.filter(item => item.id !== action.id)
        }
      };

    default:
      return state;
  }
}