import React, { PureComponent }   from 'react';
import PropTypes                  from 'prop-types';
import { withNamespaces }         from 'react-i18next';
import styles                     from '../styles/emptyState.less';


@withNamespaces()
class EmptyState extends PureComponent {
	
	
	static propTypes = {
		totalCount: PropTypes.number,
		onReset: PropTypes.func,
		t: PropTypes.func
	};
	
	
	static defaultProps = {
		totalCount: 0,
		onReset: () => {},
		t: () => {},
	};
	
	
	onReset = () => this.props.onReset();
	
	
	render() {
		const {
			totalCount,
			t,
		} = this.props;
		
		return (
			<div className={styles.container} >
				<div className={styles.header}>{t('no filters result', { count: totalCount })}</div>
				<div className={styles.text}>{t('go to filters')}</div>
				<div className={styles.btn} onClick={this.onReset}>{t('reset filters')}</div>
			</div>
		);
	}
}

export default EmptyState;