const initialState = [];

export default function transpExecutor(state = initialState, action) {
    if (action.type) {
        switch (action.type) {
            case 'transpExecutor':
                state = action.data;
                return action.data;
        }
    }
      return state
}