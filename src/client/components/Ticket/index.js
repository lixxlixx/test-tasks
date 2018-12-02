import React, { PureComponent }   from 'react';
import PropTypes                  from 'prop-types';
import ImmPropTypes               from 'react-immutable-proptypes';
import { withNamespaces }         from 'react-i18next';
import Currency                   from 'components/Currency';
import moment                     from 'moment';
import styles                     from './index.less';


@withNamespaces()
class Ticket extends PureComponent {
	
	
	static propTypes = {
		ticket: ImmPropTypes.mapContains({
			origin_name: PropTypes.string.isRequired,
			destination_name: PropTypes.string.isRequired
		}).isRequired,
		exchangeRate: PropTypes.number,
		currency: PropTypes.string,
		t: PropTypes.func,
	};
	
	
	static defaultProps = {
		currency: 'RUB',
		exchangeRate: 1,
		t: () => {},
	};
	
	
	
	render() {
		const {
			ticket,
			exchangeRate,
			currency,
			t
		} = this.props;
		
		
		const stops = ticket.get('stops');
		const stopsText = stops
			? t('amount of transfers', { transfers: ticket.get('stops') })
			: t('without transfers');
		
		return (
			<div className={styles.ticket}>
				<div className={styles.price}>
					<img className={styles.logo} src={`/img/carriers/${ticket.get('carrier')}.png`} alt="asd" />
					<div className={styles.btn}>
						Купить<br />за <Currency value={ticket.get('price') * exchangeRate} currency={currency} />
					</div>
					<div className={styles.mobilePrice}>
						<Currency value={ticket.get('price') * exchangeRate} currency={currency} />
					</div>
				</div>
				<div className={styles.tripInfo}>
					<div className={styles.trip}>
						<div className={styles.departure}>
							<div>
								<div className={styles.time}>{ticket.get('departure_time')}</div>
								<div className={styles.airport}>
									{ticket.get('origin')},&nbsp;{ticket.get('origin_name')}
								</div>
								<div className={styles.date}>
									{ moment(ticket.get('departure_date')).format('DD MMM YYYY, dd') }
								</div>
							</div>
						</div>
						<div className={styles.arrival}>
							<div>
								<div className={styles.time}>{ticket.get('arrival_time')}</div>
								<div className={styles.airport}>
									{ticket.get('destination_name')},&nbsp;{ticket.get('destination')}
								</div>
								<div className={styles.date}>
									{ moment(ticket.get('arrival_date')).format('DD MMM YYYY, dd') }
								</div>
							</div>
						</div>
					</div>
					<div className={styles.inroute}>
						<div className={styles.transfersText}>{stopsText}</div>
						<span className={styles.airplane} />
					</div>
				</div>
			</div>
		);
	}
}

export default Ticket;