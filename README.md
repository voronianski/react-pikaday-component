# React Pikaday Component

> Universal React component wrapper around [Pikaday.js](https://github.com/dbushell/Pikaday) datepicker.

## Install

```bash
npm install react-pikaday-component --save
```

## Usage

```javascript
import React from 'react';
import DatePicker from 'react-pikaday';

class App extends React.Component {
    state = {}

    onDateChange(date) {
        this.setState({ date });
    }

    render() {
        const { date } = this.state;

        return (
            <div>
                <DatePicker 
                    placeholder="Select Date"
                    format="YYYY/MM/DD"
                    maxDate={new Date('2016-07-26')}
                    value={new Date(date)}
                    onChange={::this.onDateChange}
                />
            </div>
        );
    }
}

React.render(
    <App />,
    document.getElementById('example')
);
```

---

**MIT Licensed**
