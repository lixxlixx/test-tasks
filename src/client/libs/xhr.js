import axios from 'axios';

const isOuter = url => /^https?:\/\//i.test(url);

function ajax(url, method = 'get', data = {}, prefix = '/api', axiosDefaults) {
	return new Promise((res, rej) => {
		const reqObj = {
			url: `${isOuter(url) ? '' : prefix}${url}`,
			method,
			...axiosDefaults
		};
		/**
		 * Methods "post" and "put" of axios have 3 args, 2nd is data to send.
		 * Yet "get" and "delete" have 2 args, 2nd is "config".
		 * Query params should be passed as "config.params".
		 * @see https://github.com/mzabriskie/axios#instance-methods
		 */
		if (method === 'get' || method === 'delete') {
			reqObj.params = data;
		} else {
			reqObj.data = data;
		}
		
		axios(reqObj).then(
			// Process normally
			({ data }) => {
				if (data.error) return rej(data.error);
				if (data.payload) return res(data.payload);
			},
			
			// Process request error
			result => rej(result)
		);
	});
}

export function post(url, data, prefix, axiosDefaults) {
	return ajax(url, 'post', data, prefix, axiosDefaults);
}

export function get(url, data, prefix, axiosDefaults) {
	return ajax(url, 'get', data, prefix, axiosDefaults);
}

export function put(url, data, prefix, axiosDefaults) {
	return ajax(url, 'put', data, prefix, axiosDefaults);
}

export function del(url, data, prefix, axiosDefaults) {
	return ajax(url, 'delete', data, prefix, axiosDefaults);
}

export function patch(url, data, prefix, axiosDefaults) {
	return ajax(url, 'patch', data, prefix, axiosDefaults);
}
