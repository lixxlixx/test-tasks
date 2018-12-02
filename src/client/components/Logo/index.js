import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import styles               from './index.less';


class Logo extends Component {
	
	static propTypes = {
		loading: PropTypes.bool,
	};
	
	
	static defaultProps = {
		loading: false,
	};
	
	
	render() {
		const { loading } = this.props;
		return (
			<div className={`${styles.globus} ${loading ? styles.loading : ''}`}>
				<div className={styles.plane} />
			</div>
		);
	}
}

export default Logo;