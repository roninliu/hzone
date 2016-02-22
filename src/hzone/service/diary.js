'use strict';

import Fetch from 'node-fetch';

export default class extends think.service.base {
	/**
	 * init
	 * @return {}         []
	 */
	init(...args) {
		super.init(...args);
	};
	login(url, data) {
		return Fetch(url, {
				method: "GET",
				body: data
			})
			.then((res) => {
				//console.log(res.ok);
				if (res.ok) {
					return res.json();
				} else {
					let result = {
						status: -1
					}
					return result;
				}
			})
			.then((result) => {

				if (result.status === 200) {
					return result.data;
				} else {
					return null;
				}
			})
	}
}