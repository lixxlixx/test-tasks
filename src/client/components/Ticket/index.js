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
		
		return (
			<div className={styles.ticket}>
				<p>{t('ticket')}</p>
				<span>{ticket.get('origin_name')} – {ticket.get('destination_name')}</span>
				<b>&nbsp;{ticket.get('price')}</b>
			</div>
		);
	}
}

export default Ticket;