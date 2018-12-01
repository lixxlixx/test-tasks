import React, { PureComponent }   from 'react';
import PropTypes                  from 'prop-types';
import ImmPropTypes               from 'react-immutable-proptypes';
import { withNamespaces }         from 'react-i18next';
import Ticket                     from 'components/Ticket';

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
		onMount: PropTypes.func,
		t: PropTypes.func,
	};
	
	
	static defaultProps = {
		loading: false,
		tickets: null,
		onMount: () => {},
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
		
		for (const param of uniqueKeyParams ) {
			str += item.get(param);
		}
		return str;
	}
	
	
	componentDidMount() {
		this.props.onMount();
	}
	
	
	render() {
		const { tickets, loading, t } = this.props;
		
		return (
			<div>
				<div>
					{
						loading && <span>loading...</span>
					}
					{
						(tickets && ! loading) &&
						<div>
							<h2>{t('tickets count', { count: tickets.count() })}</h2>
							{tickets.map(ticket => (
								<Ticket
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
