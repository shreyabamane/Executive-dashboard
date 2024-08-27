import { createStore } from "redux";

const initialState = {
    categories: [
        {
            id: '1',
            name: 'CNAPP Dashboard',
            widgets: [
                {
                    id: 'w1',
                    name: 'CSPM Executive Dashboard',
                    text: 'This is text for Widget 1',
                    chartData: {
                        type: 'doughnut',
                        data: {
                            labels: ["Failed", "Warning", "Not available", "Pass"],
                            datasets: [
                                {
                                    backgroundColor:["#8B0000", "#FF8C00", "#A9A9A9", "#228B22"],
                                    data:[1689, 681, 36, 7253]
                                }
                            ]
                        },
                        options: {
                            plugins: {
                                title: {
                                    display: true,
                                    text: 'Cloud Account Risk Assessment'
                                }
                            }
                        }
                    }
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