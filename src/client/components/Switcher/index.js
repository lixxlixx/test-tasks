import React, { PureComponent }   from 'react';
import PropTypes                  from 'prop-types';
import ImmPropTypes               from 'react-immutable-proptypes';
import styles                     from './index.less';


class Switcher extends PureComponent {
	
	
	static propTypes = {
		variants: ImmPropTypes.listOf(PropTypes.string),
		active: PropTypes.string,
		onChange: PropTypes.func,
	};
	
	
	static defaultProps = {
		variants: null,
		active: null,
		onChange: () => {},
	};
	
	
	onChange = currency => () => this.props.onChange(currency);
	
	
	render() {
		const {
			variants,
			active
		} = this.props;
		
		return (
			<div className={styles.switcher}>
				{
					variants.map(variant => (
						<div
							key={variant}
							onClick={this.onChange(variant)}
							className={`${styles.btn} ${variant === active ? styles.active : ''}`}
						>
							{variant}
						</div>
					))
				}
			</div>
		);
	}
}

export default Switcher;