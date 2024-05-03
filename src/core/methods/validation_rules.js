import { required, email, max, min, confirmed } from 'vee-validate/dist/rules';
import { extend, setInteractionMode } from 'vee-validate';
import i18n from '@/plugins/i18n.js';
setInteractionMode('eager');

extend('required', {
	...required,
	message: i18n.t('inputRules.requiredField')
});

extend('max', {
	...max,
	message: 'This may not be greater than field characters'
});

extend('email', {
	...email,
	message: i18n.t('inputRules.validEmail')
});


extend('minPhone', {
	...min,
	message: i18n.t('inputRules.number')
});

extend('minPass', {
	...min,
	message: i18n.t('inputRules.min_pass_6')
});


extend('confirmed', {
	...confirmed,
	message: i18n.t('inputRules.pass_not_match')
});