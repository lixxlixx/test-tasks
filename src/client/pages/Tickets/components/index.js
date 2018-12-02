import React, { PureComponent } from 'react';
import PropTypes                from 'prop-types';
import ImmPropTypes             from 'react-immutable-proptypes';
import { withNamespaces }       from 'react-i18next';
import Ticket                   from 'components/Ticket';
import Filter                   from 'components/Filter';

@withNamespaces()
class TicketsPage extends PureComponent {
	
	
	static propTypes = {
		loading: PropTypes.bool,
		tickets: ImmPropTypes.listOf(ImmPropTypes.mapContains({
			origin: PropTypes.string.isRequired,
			origin_name: PropTypes.string.isRequired,
			destination: PropTypes.string.isRequired,
			departure_date: PropTypes.string.isRequired,
			departure_time: PropTypes.string.isRequired,
			carrier: PropTypes.string.isRequired
		})),
		availableTransfers: ImmPropTypes.orderedSetOf(PropTypes.number),
		activeTransfers: ImmPropTypes.setOf(PropTypes.number),
		exchangeRate: PropTypes.number,
		availableCurrencies: ImmPropTypes.listOf(PropTypes.string),
		filterCurrency: PropTypes.string,
		onSetCurrency: PropTypes.func,
		onMount: PropTypes.func,
		onChangeTransfer: PropTypes.func,
		onChangeTransferOnly: PropTypes.func,
		onApplyToAllTransfers: PropTypes.func,
		t: PropTypes.func,
	};
	
	
	static defaultProps = {
		loading: false,
		tickets: null,
		availableTransfers: null,
		activeTransfers: null,
		exchangeRate: 1,
		availableCurrencies: null,
		filterCurrency: 'RUB',
		onSetCurrency: () => {},
		onMount: () => {},
		onChangeTransfer: () => {},
		onChangeTransferOnly: () => {},
		onApplyToAllTransfers: () => {},
		t: () => {},
	};
	
	
	static createUniqueTicketKey(item) {
		let str = '';
		const uniqueKeyParams = [
			'origin',
			'destination',
			'departure_date',
			'departure_time',
			'carrier'
		];
		
		for (const param of uniqueKeyParams) {
			str += item.get(param);
		}
		
		return str;
	}
	
	
	componentDidMount() {
		this.props.onMount();
	}
	
	
	onCheckChange = (name, value) => this.props.onChangeTransfer(name, value);
	onCheckOnly = name => this.props.onChangeTransferOnly(name);
	onCheckAll = value => this.props.onApplyToAllTransfers(value);
	onSetCurrency = currency => this.props.onSetCurrency(currency);
	
	
	render() {
		const {
			tickets,
			availableTransfers,
			activeTransfers,
			loading,
			exchangeRate,
			availableCurrencies,
			filterCurrency,
			t
		} = this.props;
		
		return (
			<div>
				<div>
					{
						loading && <span>loading...</span>
					}
					{
						(tickets && ! loading) &&
						<div>
							<Filter
								availableCurrencies={availableCurrencies}
								activeCurrency={filterCurrency}
								availableTransfers={availableTransfers}
								activeTransfers={activeTransfers}
								onCheckChange={this.onCheckChange}
								onCheckOnly={this.onCheckOnly}
								onCheckAll={this.onCheckAll}
								onSetCurrency={this.onSetCurrency}
							/>
							
							<h2>{t('tickets count', { count: tickets.count() })}</h2>
							{tickets.map(ticket => (
								<Ticket
									currency={filterCurrency}
									exchangeRate={exchangeRate}
									key={TicketsPage.createUniqueTicketKey(ticket)}
									ticket={ticket}
								/>
							))}
						</div>
						
					}
				</div>
			</div>
		);
	}
}

export default TicketsPage;
