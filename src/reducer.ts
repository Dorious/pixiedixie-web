export default (state: any, action: any) => {
  switch (action.type) {
    case 'showLoader':
      return {
        ...state,
        loading: true
      };
    case 'hideLoader':
      return {
        ...state,
        loading: false
      }
    case 'setResults':
      return {
        ...state,
        results: action.response.data,
        loading: false,
        totalCount: action.response.totalCount,
        offset: action.response.offset
      }
    case 'mergeResults':
      return {
        ...state,
        results: [].concat(state.results, action.response.data.data),
        totalCount: action.response.data.totalCount + state.totalCount,
        offset: action.response.data.offset
      }
    case 'setSearchValue':
      return {
        ...state,
        searchValue: action.value
      }

    default:
      return state;
  }
};