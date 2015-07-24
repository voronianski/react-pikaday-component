import React from 'react';
import DatePicker from '../src/ReactPikadayComponent';

class App extends React.Component {
    state = {}

    onDateChange(date) {
        this.setState({ date });
    }

    render() {
        const { date } = this.state;

        return (
            <div className="px3">
                <h1>React Pikaday Component</h1>
                <DatePicker
                    className="field mb2"
                    placeholder="Select Date"
                    format="YYYY/MM/DD"
                    maxDate={new Date('2016-07-26')}
                    value={new Date(date)}
                    onChange={::this.onDateChange}
                />
                {date ? (
                    <div>Selected date: {new Date(date).toString()}</div>
                ) : (
                    <div>There is no selected date!</div>
                )}
            </div>
        );
    }
}

React.render(
    <App />,
    document.getElementById('app')
);
