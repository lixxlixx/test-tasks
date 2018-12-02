import React, { PureComponent } from 'react';
import PropTypes                from 'prop-types';
import ImmPropTypes             from 'react-immutable-proptypes';
import Ticket                   from 'components/Ticket';
import Filter                   from 'components/Filter';
import Logo                     from 'components/Logo';
import EmptyState               from './EmptyState';
import styles                   from '../styles/index.less';


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
		totalCount: PropTypes.number,
		exchangeRate: PropTypes.number,
		availableCurrencies: ImmPropTypes.listOf(PropTypes.string),
		filterCurrency: PropTypes.string,
		onSetCurrency: PropTypes.func,
		onMount: PropTypes.func,
		onChangeTransfer: PropTypes.func,
		onChangeTransferOnly: PropTypes.func,
		onApplyToAllTransfers: PropTypes.func
	};
	
	
	static defaultProps = {
		loading: false,
		tickets: null,
		availableTransfers: null,
		activeTransfers: null,
		totalCount: 0,
		exchangeRate: 1,
		availableCurrencies: null,
		filterCurrency: 'RUB',
		onSetCurrency: () => {},
		onMount: () => {},
		onChangeTransfer: () => {},
		onChangeTransferOnly: () => {},
		onApplyToAllTransfers: () => {}
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
	onResetFilters = () => this.props.onApplyToAllTransfers(true);
	
	
	render() {
		const {
			tickets,
			availableTransfers,
			activeTransfers,
			loading,
			exchangeRate,
			availableCurrencies,
			filterCurrency,
			totalCount
		} = this.props;
		
		return (
			<div>
				<div className={styles.logo}>
					<Logo loading={loading} />
				</div>
				{
					(tickets && ! loading) &&
					<div className={styles.layout}>
						<div className={styles.filter}>
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
						</div>
						
						<div className={styles.tickets}>
							{tickets.map(ticket => (
								<div
									className={styles.ticket}
									key={TicketsPage.createUniqueTicketKey(ticket)}
								>
									<Ticket
										currency={filterCurrency}
										exchangeRate={exchangeRate}
										ticket={ticket}
									/>
								</div>
							))}
							{
								! tickets.count() &&
								<EmptyState
									totalCount={totalCount}
									onReset={this.onResetFilters}
								/>
							}
						</div>
						
					</div>
					
				}
			</div>
		);
	}
}

export default TicketsPage;
