import React from 'react'
import './Dashboard.css'
import { useDispatch, useSelector } from 'react-redux'
import MyChart from '../MyChart/MyChart';

export function Dashboard() {
  const categories = useSelector(state => state.categories);
  const dispatch = useDispatch();

  const handleAddWidget = (categoryId) => {
    const widgetName = prompt('Enter widget name:');
    const widgetText = prompt('Enter Widget text:');

    const numDataValues = parseInt(prompt('Enter the number of data values'), 10);

    if (isNaN(numDataValues) || numDataValues <= 0) {
      alert('Please enter a valid number of data values.');
      return;
    }

    const chartLabels = [];
    const chartDataValues = [];
    const chartColors = [];

    for (let i = 0; i < numDataValues; i++) {
      const label = prompt(`Enter label for data value ${i + 1}:`, `Label ${i + 1}`);
      const dataValue = parseFloat(prompt(`Enter data value for ${label}:`, '0'));
      const color = prompt(`Enter color for ${label}`, '#000000');

      if (isNaN(dataValue)) {
        alert('Please enter a valid number for the data value.');
        return;
      }

      chartLabels.push(label);
      chartDataValues.push(dataValue);
      chartColors.push(color);
    }

    const newWidget = {
      id: `${categoryId}-${Date.now()}`,
      name: widgetName,
      text: widgetText,
      chartData: {
        type: 'doughnut',
        data: {
          labels: chartLabels,
          datasets: [
            {
              backgroundColor: chartColors,
              data: chartDataValues
            }
          ]
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: widgetName
            }
          }
        }
      }
    };
    dispatch({ type: 'ADD_WIDGET', payload: { categoryId, widget: newWidget } });
  };

  const handleRemoveWidget = (categoryId, widgetId) => {
    dispatch({ type: 'REMOVE_WIDGET', payload: { categoryId, widgetId } });
  };

  return (
    <div>
      {categories.map(category => (
        <div key={category.id}>
          <div className="header">
            <h2>{category.name}</h2>
            <button onClick={() => handleAddWidget(category.id)}>Add Widget +</button>
          </div>
          <div className='widget-container'>
            {category.widgets.map(widget => (
              <div key={widget.id} className='widget-item'>
                <h3>{widget.name}</h3>
                <p>{widget.text}</p>
                {widget.chartData && <MyChart chartData={widget.chartData} />}
                <button onClick={() => handleRemoveWidget(category.id, widget.id)}>Remove</button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
