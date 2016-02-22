'use strict';

import Base from './base.js';

import FormData from 'form-data';

export default class extends Base {
	__before() {
		let config = this.config();
		this.assign({
			style: config.style_uri,
			title: config.DIARY_PAGE
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

		let DiaryService = think.service("diary", "hzone");
		let instance = new DiaryService();
		instance.login(config.api + "/index/Diary/getDiaryList.do", formData)
			.then((r) => {
				console.log(r == null);
				if (r == null) {
					this.fail("NO_DATA_ERROR");
				} else {
					this.success(r);
				}
			})

	}
}