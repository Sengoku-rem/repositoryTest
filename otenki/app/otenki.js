window.onload = Main;
const baseURL = "http://localhost:3000";

function Main() {
	Vue.createApp(
		{
			data() {
				return {
					input: "",
					Products: [],
					showIntroduce: 0,
					showPage: 0
				}
			},
			methods: {
				// methodsの中には、JavaScriptのfunctionを配列のデータのように書く
				searchWeatherByName: function (event) {
					this.showPage = 100;

					if (this.input == null) {
						//全部表示される
					} else {
						let url = "/Products?nameGroup_like=" + this.input;
						url = baseURL + encodeURI(url);
						this.updateProducts(url); //他の関数を呼び出している
					}
					//this.input = "";
					// Weather for you

				},
				//口関数
				updateProducts: function (url) {
					//画面を更新する
					fetch(url, { method: 'GET' })
						.then((response) => {
							return response.json();
						})
						.then((res) => {
							if (Array.isArray(res)) {
								this.Products = res;
							}
							else {
								this.Products = [res];
							}
							console.log(res);
						})
						.catch((res) => {
							console.log("エラーです");
						});
				},

				// キラキラの時
				changePage_1: function (event) {
					// console.log("キラキラの時");
					this.showPage = 1;

					let url = "/Products?adjective_like=" + "キラキラ";
					url = baseURL + encodeURI(url);//頭
					this.updateProducts(url);//口
				},
				changePage_2: function (event) {
					this.showPage = 2;

					let url = "/Products?adjective_like=" + "パラパラ";
					url = baseURL + encodeURI(url);
					this.updateProducts(url);
				},
				changePage_3: function (event) {
					this.showPage = 3;

					let url = "/Products?adjective_like=" + "ざざー";
					url = baseURL + encodeURI(url);
					this.updateProducts(url);
				},
				changePage_4: function (event) {
					this.showPage = 4;

					let url = "/Products?adjective_like=" + "どーん";
					url = baseURL + encodeURI(url);
					this.updateProducts(url);
				},
				changePage_5: function (event) {
					this.showPage = 5;

					let url = "/Products?color_like=" + "灰";
					url = baseURL + encodeURI(url);
					this.updateProducts(url);
				},
				changePage_6: function (event) {
					this.showPage = 6;

					let url = "/Products?color_like=" + "赤";
					url = baseURL + encodeURI(url);
					this.updateProducts(url);
				},
				changePage_7: function (event) {
					this.showPage = 7;

					let url = "/Products?color_like=" + "青";
					url = baseURL + encodeURI(url);
					this.updateProducts(url);
				},
				changePage_8: function (event) {
					this.showPage = 8;

					let url = "/Products?color_like=" + "黄";
					url = baseURL + encodeURI(url);
					this.updateProducts(url);
				},
				changePage_9: function (event) {
					this.showPage = 9;

					let url = "/Products?rare_like=" + "1つ";
					url = baseURL + encodeURI(url);
					this.updateProducts(url);
				},
				changePage_10: function (event) {
					this.showPage = 10;

					let url = "/Products?rare_like=" + "2つ";
					url = baseURL + encodeURI(url);
					this.updateProducts(url);
				},
				changePage_11: function (event) {
					this.showPage = 11;

					let url = "/Products?rare_like=" + "3つ";
					url = baseURL + encodeURI(url);
					this.updateProducts(url);
				},
				changePage_12: function (event) {
					this.showPage = 12;

					let url = "/Products?rare_like=" + "4つ";
					url = baseURL + encodeURI(url);
					this.updateProducts(url);
				},
				backTop: function (event) {
					this.showPage = 0;
					// console.log("初期ページに戻る");
				},

				// 購入の時
				changePage_50: function (event) {

					let getKeyById = event.currentTarget.getAttribute("dataId"); //dataIdで取得したIDを打ち込み

					let url ='/Products/' + getKeyById; //リクエストのurlを作成
					let orderURL = baseURL + encodeURI(url); //urlをエンコードしてbaseURLを加える

					fetch(orderURL, { method: 'GET' })
						.then((response) => {
							return response.json();
						})
						.then((response) => {
							let updatedStock;
							if(response.stock > 0){
								updatedStock = response.stock - 1; //更新後の在庫数
								this.showPage = 50;
							}else{
								updatedStock = response.stock;
								alert("残念!! 売り切れです！申し訳ありません！");
							}
							
							fetch(orderURL, {
								method: 'PUT',//置き換える
								headers: {
									'Content-Type': 'application/json'
								},
								body: JSON.stringify({
									"id": response.id,
									"name": response.name,
									"stock": updatedStock,
									"image": response.image,
									"price": response.price,
									"explanation": response.explanation,
									"adjective": response.adjective,
									"nameGroup": response.nameGroup,
									"color": response.color,
									"rare": response.rare
								})
							})
								.then((res) => {
									this.showOrder = true;
								});
						})
						.catch((response) => {
							console.log("エラーです");
						});

				}
			},
			// mountedはvoid start()と同じ扱い
			mounted: function (event) {
				fetch(baseURL, { method: 'GET' })
					.then((response) => {
						return response.json();
					})
					.then((response) => {
						this.showHome = true;
					})
					.catch((response) => {
						console.log("エラーです");
					});

				this.showTop = true;
			}

		}
	).mount('#weatherApp');
}