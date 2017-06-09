import React from 'react';
import PropTypes from 'prop-types';

let Pikaday;
if ('undefined' !== typeof window) {
    Pikaday = require('pikaday');
}

class ReactPikadayComponent extends React.Component {
    static propTypes = {
        id: PropTypes.string,
        type: PropTypes.string,
        value: PropTypes.instanceOf(Date),
        onChange: PropTypes.func,
        disabled: PropTypes.bool,
        placeholder: PropTypes.string,
        readOnly: PropTypes.bool,
        name: PropTypes.string,
        style: PropTypes.object,
        tabIndex: PropTypes.number,
        valueLink: PropTypes.shape({
            value: PropTypes.instanceOf(Date),
            requestChange: PropTypes.func.isRequired
        })

        // see Pikaday options at https://github.com/dbushell/Pikaday#configuration
        // except `onSelect` and `field`
    }

    static defaultProps = {
        type: 'text'
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
        this._setMinDateIfChanged(nextProps.minDate, this.props.minDate);
        this._setMaxDateIfChanged(nextProps.maxDate, this.props.maxDate);
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
        const { id, type, className, name, tabIndex, disabled, placeholder, readOnly, style } = this.props;

        return (
            <input
                id={id}
                type={type}
                ref="pikaday"
                name={name}
                className={className}
                style={style}
                placeholder={placeholder}
                disabled={disabled}
                readOnly={readOnly}
                tabIndex={tabIndex}
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
