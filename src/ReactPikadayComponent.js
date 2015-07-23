import React, { PropTypes } from 'react';
import assign from 'object-assign';

let Pikaday;
if ('undefined' !== typeof window) {
    Pikaday = require('pikaday');
}

class ReactPikadayComponent extends React.Component {
    static propTypes = {
        value: PropTypes.instanceOf(Date),
        onChange: PropTypes.func,
        valueLink: PropTypes.shape({
            value: PropTypes.instanceOf(Date),
            requestChange: PropTypes.func.isRequired
        })
    }

    _getValueLink(props) {
        return props.valueLink || {
            value: props.value,
            requestChange: props.onChange
        };
    }

    _setDateIfChanged(newDate, prevDate) {
        var newTime = newDate ? newDate.getTime() : null;
        var prevTime = prevDate ? prevDate.getTime() : null;

        if (newTime !== prevTime) {
            if (isNaN(newTime)) {
                // workaround for pikaday not clearing value when date set to false
                let el = React.findDOMNode(this.refs.pikaday);
                el.value = '';
            }
            this._picker.setDate(newDate, true); // not trigger onSelect
        }
    }

    _setupPikaday() {
        let el = React.findDOMNode(this.refs.pikaday);
        let { requestChange } = this._getValueLink(this.props);
        let { value, onChange, valueLink, ...pikadayOptions } = this.props;
        let options = assign({}, pikadayOptions, {
            field: el,
            onSelect: requestChange
        });

        this._picker = new Pikaday(options);
    }

    componentDidMount() {
        let { value } = this._getValueLink(this.props);
        this._setupPikaday();

        this._setDateIfChanged(value);
    }

    componentWillReceiveProps(nextProps) {
        let newDate = this._getValueLink(nextProps).value;
        let lastDate = this._getValueLink(this.props).value;

        this._setDateIfChanged(newDate, lastDate);
    }

    render() {
        const { className, disabled, placeholder } = this.props;

        return (
            <input
                type="text"
                ref="pikaday"
                className={className}
                placeholder={placeholder}
                disabled={disabled}
            />
        );
    }
}

export default ReactPikadayComponent;
