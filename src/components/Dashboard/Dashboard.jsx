import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MyChart from '../MyChart/MyChart';

export function Dashboard() {
    const categories = useSelector(state => state.categories);
    const dispatch = useDispatch();

    const handleAddWidget = (categoryId) => {
        const widgetName = prompt('Enter widget name:');
        const widgetText = prompt('Enter Widget text:');
        const newWidget = {
            id:`${categoryId}-${Date.now()}`,
            name:widgetName,
            text:widgetText,
            chartData:null
        };
        dispatch({type: 'ADD_WIDGET', payload: { categoryId, widget: newWidget}});
    };

    const handleRemoveWidget = (categoryId, widgetId) => {
        dispatch({ type: 'REMOVE_WIDGET', payload: { categoryId, widgetId } });
      };

  return (
    <div>
      {categories.map(category => (
        <div key={category.id}>
            <h2>{category.name}</h2>
            <button onClick={()=> handleAddWidget(category.id)}>+ Add Widget</button>
            <ul>
                {category.widgets.map(widget => (
                    <li key={widget.id}>
                        <h3>{widget.name}</h3>
                        <p>{widget.text}</p>
                        {widget.chartData && <MyChart chartData={widget.chartData} />}
                        <button onClick={()=> handleRemoveWidget(category.id, widget.id)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
      ))}
    </div>
  )
}
