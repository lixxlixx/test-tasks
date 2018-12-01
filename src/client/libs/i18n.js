import i18n                 from 'i18next';
import XHR                  from 'i18next-xhr-backend';
import I18nEndings          from 'i18next-endings-postprocessor';


const xhr = new XHR(null, {
	loadPath: '/i18n/{{lng}}/{{ns}}'
});


const DEFAULTS = {
	ns: ['main'],
	defaultNS: 'main',
	lng: 'ru_RU',
	fallbackLng: 'ru_RU',
	debug: false,
	postProcess: ['endings'],
	cache: { enabled: true },
	wait: false,
	react: { wait: true, }
};


export default function (conf, cb) {
	const config = Object.assign({}, DEFAULTS, conf);
	return i18n
		.use(xhr)
		.use(new I18nEndings({
			en_EN: (num, variants) => variants[num > 1 ? 1 : 0]
		}))
		.init(config, cb);
}
