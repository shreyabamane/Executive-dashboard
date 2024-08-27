import { createStore } from "redux";


const initialState = {
    categories: [
        {
            id: '1',
            name: 'CSPM Executive Dashboard',
            widgets: [
                {
                    id: '1-1',
                    name: 'Widget 1',
                    text: 'This is text for Widget 1'
                },
                {
                    id: '1-2',
                    name: 'Widget 2',
                    text: 'This is text for Widget 2'
                }
            ]
        },

        {
            id: '2',
            name: 'CWPP Dashboard',
            widgets: [
                {
                    id: '2-1',
                    name: 'Widget 1',
                    text: 'This is text for Widget 1 in CWPP'
                },
                {
                    id: '2-2',
                    name: 'Widget 2',
                    text: 'This is text for Widget 2 in CWPP'
                }
            ]
        }
    ]
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_WIDGET':
            return {
                ...state,
                categories: state.categories.map(category =>
                    category.id === action.payload.categoryId
                        ? { ...category, widgets: [...category.widgets, action.payload.widget] }
                        : category
                )
            };
        case 'REMOVE_WIDGET':
            return {
                ...state,
                categories: state.categories.map(category =>
                    category.id === action.payload.categoryId
                        ? {
                            ...category,
                            widgets: category.widgets.filter(widget => widget.id !== action.payload.widgetId)
                        }
                        : category
                )
            };
        default:
            return state;
    }
};

const store = createStore(reducer);

export default store;