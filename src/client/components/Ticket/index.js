import React, { PureComponent }   from 'react';
import PropTypes                  from 'prop-types';
import ImmPropTypes               from 'react-immutable-proptypes';
import { withNamespaces }         from 'react-i18next';
import styles                     from './index.less';

@withNamespaces()
class Ticket extends PureComponent {
	
	static propTypes = {
		ticket: ImmPropTypes.mapContains({
			origin_name: PropTypes.string.isRequired,
			destination_name: PropTypes.string.isRequired
		}).isRequired,
		t: PropTypes.func,
	};
	
	
	static defaultProps = {
		t: () => {},
	};
	
	render() {
		const { ticket, t } = this.props;
		const stops = ticket.get('stops');
		
		return (
			<div className={styles.ticket}>
				<p>{t('ticket')}</p>
				<img src={`/img/carriers/${ticket.get('carrier')}.png`} alt="asd" />
				<span>{ticket.get('origin_name')} – {ticket.get('destination_name')}</span>
				<b>&nbsp;{ticket.get('price')}</b>
				<p>
					{
						stops
							? t('amount of transfers', { transfers: ticket.get('stops') })
							: t('without transfers')
					}
				</p>
			</div>
		);
	}
}

export default Ticket;