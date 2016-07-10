import React, { PropTypes } from 'react';

let Pikaday;
if ('undefined' !== typeof window) {
    Pikaday = require('pikaday');
}

class ReactPikadayComponent extends React.Component {
    static propTypes = {
        value: PropTypes.instanceOf(Date),
        onChange: PropTypes.func,
        disabled: PropTypes.string,
        placeholder: PropTypes.string,
        readOnly: PropTypes.string,
        name: PropTypes.string,
        style: PropTypes.object,
        valueLink: PropTypes.shape({
            value: PropTypes.instanceOf(Date),
            requestChange: PropTypes.func.isRequired
        })

        // see Pikaday options at https://github.com/dbushell/Pikaday#configuration
        // except `onSelect` and `field`
    }

    componentDidMount() {
        const { value } = this._getValueLink(this.props);
        this._setupPikaday();

        this._setDateIfChanged(value);
    }

    componentWillReceiveProps(nextProps) {
        const newDate = this._getValueLink(nextProps).value;
        const lastDate = this._getValueLink(this.props).value;

        this._setDateIfChanged(newDate, lastDate);
    }

    componentDidUpdate(prevProps) {
        // update if container is set
        if (!prevProps.container && this.props.container) {
            const newDate = this._getValueLink(this.props).value;
            const lastDate = this._getValueLink(prevProps).value;
            this.pikaday.destroy();
            this._setupPikaday();
            this._setDateIfChanged(newDate, lastDate);
        }
    }

    componentWillUnmount() {
        this.pikaday.destroy();
    }

    render() {
        const { className, name, disabled, placeholder, readOnly, style } = this.props;

        return (
            <input
                type="text"
                ref="pikaday"
                name={name}
                className={className}
                style={style}
                placeholder={placeholder}
                disabled={disabled}
                readOnly={readOnly}
            />
        );
    }

    _getValueLink(props) {
        return props.valueLink || {
            value: props.value,
            requestChange: props.onChange
        };
    }

    _setupPikaday() {
        const el = this.refs.pikaday;
        const { requestChange } = this._getValueLink(this.props);
        const { value, onChange, valueLink, ...pikadayOptions } = this.props; // eslint-disable-line no-unused-vars
        const options = Object.assign({}, pikadayOptions, {
            field: el,
            onSelect: requestChange
        });

        this.pikaday = new Pikaday(options);
    }

    _setDateIfChanged(newDate, prevDate) {
        this._setDate(newDate, prevDate, newTime => {
            if (isNaN(newTime)) {
                // workaround for pikaday not clearing value when date set to false
                const el = this.refs.pikaday;
                el.value = '';
            }
            this.pikaday.setDate(newDate, true); // not trigger onSelect
        });
    }

    _setMinDateIfChanged(newDate, prevDate) {
        this._setDate(newDate, prevDate, () => {
            this.pikaday.setMinDate(newDate);
        });
    }

    _setMaxDateIfChanged(newDate, prevDate) {
        this._setDate(newDate, prevDate, () => {
            this.pikaday.setMaxDate(newDate);
        });
    }

    _setDate(newDate, prevDate, setter) {
        const newTime = newDate ? newDate.getTime() : null;
        const prevTime = prevDate ? prevDate.getTime() : null;

        if (newTime !== prevTime) {
            setter(newTime);
        }
    }
}

export default ReactPikadayComponent;
