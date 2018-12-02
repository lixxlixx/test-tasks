import React, { PureComponent }   from 'react';
import PropTypes                  from 'prop-types';
import ImmPropTypes               from 'react-immutable-proptypes';
import { withNamespaces }         from 'react-i18next';
import Checkbox                   from 'components/Checkbox';
import styles                     from './index.less';

@withNamespaces()
class Filter extends PureComponent {
	
	
	static propTypes = {
		availableCurrencies: ImmPropTypes.listOf(PropTypes.string),
		activeCurrency: PropTypes.string,
		availableTransfers: ImmPropTypes.orderedSetOf(PropTypes.number),
		activeTransfers: ImmPropTypes.setOf(PropTypes.number),
		onCheckChange: PropTypes.func,
		onCheckOnly: PropTypes.func,
		onCheckAll: PropTypes.func,
		onSetCurrency: PropTypes.func,
		t: PropTypes.func,
	};
	
	
	static defaultProps = {
		availableCurrencies: null,
		activeCurrency: 'RUB',
		availableTransfers: null,
		activeTransfers: null,
		onCheckChange: () => {},
		onCheckOnly: () => {},
		onCheckAll: () => {},
		onSetCurrency: () => {},
		t: () => {},
	};
	
	
	static isAllChecked(availableTransfers, activeTransfers) {
		if ( ! activeTransfers || ! availableTransfers) return false;
		let allChecked = true;
		
		availableTransfers.map(transfer => allChecked = allChecked && activeTransfers.has(transfer));
		return allChecked;
	}
	
	
	onCheckChange = (name, value) => this.props.onCheckChange(+name, value);
	onCheckOnly = name => this.props.onCheckOnly(+name);
	onCheckAll = (name, value) => this.props.onCheckAll(value);
	onSetCurrency = currency => () => this.props.onSetCurrency(currency);
	
	
	render() {
		const {
			availableTransfers,
			activeTransfers,
			availableCurrencies,
			activeCurrency,
			t
		} = this.props;
		
		return (
			<div className={styles.filter}>
				
				<p>{t('currency')}</p>
				{
					availableCurrencies.map(currency => (
						<span key={currency} onClick={this.onSetCurrency(currency)}>
							{
								currency === activeCurrency
									? <b>{currency}</b>
									: <span>{currency}</span>
							}
							&nbsp;
						</span>
					))
				}
				
				{
					(availableTransfers && availableTransfers.count() > 2) &&
					<div>
						<p>{t('transfers count')}</p>
						<Checkbox
							title={t('all transfers')}
							key="transfer-all"
							name="all"
							checked={Filter.isAllChecked(availableTransfers, activeTransfers)}
							onCheckChange={this.onCheckAll}
						/>
						{
							availableTransfers.map(transfer => (
								<Checkbox
									only
									key={`transfer-${transfer}`}
									checked={activeTransfers && activeTransfers.has(transfer)}
									onCheckChange={this.onCheckChange}
									onCheckOnly={this.onCheckOnly}
									name={`${transfer}`}
									title={
										transfer
											? t('amount of transfers', { transfers: transfer })
											: t('without transfers')
									}
								/>
							))
						}
					</div>
				}
				
			</div>
		);
	}
}

export default Filter;