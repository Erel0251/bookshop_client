const initialState = {
  cart: [],
};

const addToCard = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CARD':
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    default:
      return state;
  }
};

export default addToCard;
