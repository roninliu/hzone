'use strict';

import Base from './base.js';
import Fetch from 'node-fetch';
import FormData from 'form-data';

export default class extends Base {
	__before() {
		let config = this.config();
		this.assign({
			style: config.style_uri,
			title:config.DIARY_PAGE
		})
	};
	indexAction() {
		return this.display();
	};
	getdiarysAction() {
		let _self = this;
		let config = this.config();
		let page = this.http.post("page");
		let styles = this.http.post("styles");
		let nodes = this.http.post("nodes");
		let formData = new FormData();
		formData.append("page", page);
		if (nodes !== 0) {
			formData.append("nodes", nodes)
		}
		if (styles !== 0) {
			formData.append("styles", styles)
		}
		console.log(new Date());
		Fetch(config.api + "/index/Diary/getDiaryList.do", {
				method: "GET",
				body: formData
			})
			.then((res) => {
				if (res.ok) {
					return res.json();
				} else {
					this.fail("API_SERVER_ERROR");
				}
			})
			.then((result) => {
				console.log(result);
				if (result.status === 200) {
					console.log(new Date());
					this.success(result.data);
				} else {
					this.fail("NO_DATA_ERROR");
				}
			})
	}
}