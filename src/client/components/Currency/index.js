import React, { PureComponent }   from 'react';
import PropTypes                  from 'prop-types';


class Currency extends PureComponent {
	
	
	static propTypes = {
		value: PropTypes.number.isRequired,
		currency: PropTypes.string.isRequired,
	};
	
	
	static getSymbol(currency) {
		switch (currency) {
			case 'RUB': return '₽';
			case 'USD': return '$';
			case 'EUR': return '€';
			case 'GBP': return '£';
			case 'JPY': return '¥';
			case 'CNY': return '¥';
			default: return '';
		}
	}
	
	
	static formatNumber(num) {
		return `${num}`.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
	}
	
	
	render() {
		const {
			value,
			currency
		} = this.props;
		
		
		return (
			<span>
				{Currency.formatNumber(Math.round(value))} {Currency.getSymbol(currency)}
			</span>
		);
	}
}

export default Currency;