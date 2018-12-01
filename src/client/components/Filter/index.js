import React, { PureComponent }   from 'react';
import PropTypes                  from 'prop-types';
import ImmPropTypes               from 'react-immutable-proptypes';
import { withNamespaces }         from 'react-i18next';
import Checkbox                   from 'components/Checkbox';
import styles                     from './index.less';

@withNamespaces()
class Filter extends PureComponent {
	
	
	static propTypes = {
		availableTransfers: ImmPropTypes.orderedSetOf(PropTypes.number),
		activeTransfers: ImmPropTypes.setOf(PropTypes.number),
		onCheckChange: PropTypes.func,
		onCheckOnly: PropTypes.func,
		onCheckAll: PropTypes.func,
		t: PropTypes.func,
	};
	
	
	static defaultProps = {
		availableTransfers: null,
		activeTransfers: null,
		onCheckChange: () => {},
		onCheckOnly: () => {},
		onCheckAll: () => {},
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
	
	
	render() {
		const { availableTransfers, activeTransfers, t } = this.props;
		
		return (
			<div className={styles.filter}>
				<p>{t('transfers count')}</p>
				
				{
					(availableTransfers && availableTransfers.count() > 2) &&
					<div>
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