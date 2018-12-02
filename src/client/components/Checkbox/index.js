import React, { PureComponent }   from 'react';
import PropTypes                  from 'prop-types';
import { withNamespaces }         from 'react-i18next';
import styles                     from './index.less';


@withNamespaces()
class Checkbox extends PureComponent {
	
	
	static propTypes = {
		checked: PropTypes.bool,
		only: PropTypes.bool,
		title: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		t: PropTypes.func,
		onCheckChange: PropTypes.func,
		onCheckOnly: PropTypes.func,
	};
	
	
	static defaultProps = {
		checked: false,
		only: false,
		onCheckChange: () => {},
		onCheckOnly: () => {},
		t: () => {},
	};
	
	
	onChange = e => this.props.onCheckChange(this.props.name, e.target.checked);
	onCheckOnly = () => this.props.onCheckOnly(this.props.name, true);
	
	
	render() {
		const {
			checked,
			title,
			name,
			t,
			only
		} = this.props;
		
		return (
			<div className={styles.container} >
				<label className={styles.label} htmlFor={name}>
					<input
						className={styles.input}
						type="checkbox"
						checked={checked}
						name={name}
						id={name}
						onChange={this.onChange}
					/>
					<span className={styles.fakeInput} />
					<span>{title}</span>
				</label>
				{
					only &&
					<span className={styles.only} onClick={this.onCheckOnly}>{t('only')}</span>
				}
			</div>
		);
	}
}

export default Checkbox;