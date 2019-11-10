(function (window,Vue,undefined) {
	// 'use strict';

	// Your starting point. Enjoy the ride!
	// 自定义组件实现自动获取焦点
	var vm = new Vue({
		// 生命周期方法created
		created() {
			// 从localStorage中获取数据，看是否存在原始数据，显示在页面中
			let lineList = JSON.parse(window.localStorage.getItem('lineList'));
			lineList ? this.list = lineList : this.list
			// shuaxin();
			// this.change();
			this.isShow();

		},
		el: '#app',
		computed: {
			// 创建一个名为lineCount的计算器属性
			// lineCount() {
			// 	return this.list.reduce(this.countCallback);
			// }
			lineCount() {
				return this.list.filter((ele) => ele.flag === true)
			},
		},
		directives: {
			dian: { // 自定义指令，设置 focus 自动获取焦点
				inserted: function(m) {
					m.focus();
				}
			}
		},
		data: {
			newObj: '', // 设置一个新的数据条
			newId: Math.random()*10+1, // 添加新的id这里开始
			checkColor: false, // 控制全选按钮是否选中
			checkCount: 0, // 记录选中个数
			allCheck: false, // 判断全选按钮
			showFlag: true, // 判断是否显示删除选中按钮
			// accumulator: 0,
			list: [
				// {id: 1, content: 'Taste JavaScript', flag: true},
				// {id: 2, content: 'Buy a unicorn', flag: false},
			]
		},
		methods: {
			// 使用计算属性所需的数组回调函数
			// Array.reduce()尝试失败
			// countCallback(accumulator,currentValue) {
			// 	if(currentValue.flag) {
			// 		this.accumulator += 1;
			// 	}
			// 	return this.accumulator;
			// },
			// 回车添加方法
			addInformation() {
				if(this.newObj.trim().length !== 0) {
					this.newId ++;
					var obj = {
						id: Math.floor(this.newId) + +new Date(),
						content: this.newObj,
						flag: false
					}
					this.list.push(obj);
					this.newObj = '';
					this.change();
					// 添加到localStorage中
					window.localStorage.setItem('lineList',JSON.stringify(this.list));
				}
			},

			// 单选框控制全选框首次书写
			// change(id) {
			// 	console.log(id);
			// 	var count = 0; // 用来记录选中的个数
			// 	// 遍历改变选中的flag
			// 	this.list.forEach((ele,index) => {
			// 		if(ele.id === id) {
			// 			ele.flag = !ele.flag;
			// 		}
			// 		if(ele.flag === false) {
			// 			count++;
			// 		}
			// 		if(count === 0) {
			// 			this.checkColor = true;
			// 		} else {
			// 			this.checkColor = false;
			// 		}
			// 		使用label绑定之后改变flag

			// 	})
			// }

			// 单选框控制全选框重写
			change(id) {
				
				// this.accumulator = 0;
				let count = 0;
				// this.showFlag = false;
				this.list.forEach((ele,index) => {
					// if(ele.flag) {
					// 	this.showFlag = true;
					// }
					if(ele.id === id) {
						ele.flag = !ele.flag;
					}
					if(!ele.flag) {
						count = 1;
					}
					if(count) {
						this.allCheck = false;
					} else {
						this.allCheck = true;
					}
				})
				this.isShow();
				// 添加到localStorage中
				window.localStorage.setItem('lineList',JSON.stringify(this.list));
			},

			// 全选框控制复选框
			allChange() {
				// this.accumulator = 0;
				this.allCheck = !this.allCheck;
				// if(this.allCheck) {
				// 	// this.showFlag = this.allCheck;
				// }
				this.list.forEach((ele,index) => {
					ele.flag = this.allCheck;
				})
				console.log('一次')
				this.isShow();
				// 添加到localStorage中
				window.localStorage.setItem('lineList',JSON.stringify(this.list));
			},
			// 判断是否显示选中删除按钮
			isShow() {
				if(this.lineCount.length > 0) {
					this.showFlag = true;
				} else {
					this.showFlag = false;
				}
			},

			// 单项删除方法(按照索引删除)
			del(index) {
				// 根据id排序，然后按照索引删除
				this.list.sort((a,b) => {
					return a.id - b.id
				});
				this.list.splice(index,1);
				// this.change();
				// 添加到localStorage中
				window.localStorage.setItem('lineList',JSON.stringify(this.list));
			},

			// 删除选中  // 
			delByCheck() {
				let arr = [];
				this.list.forEach((ele,index) => {
					// 未被选中的项推入新的数组
					if(!ele.flag) {
						arr.push(ele);
					}
				})
				this.list = arr;
				this.isShow();
				// this.change();
				// 添加到localStorage中
				window.localStorage.setItem('lineList',JSON.stringify(this.list));
			}

			// 暂时代替计算属性进行选中数量判定
			// shuaxin() {
			// 	var count = 0;
			// 	return this.list.forEach((ele,index) => {
			// 		if(ele.flag) {
			// 			count++;
			// 		}
			// 		return count;
			// 	})
			// }
		}
	})
})(window, Vue);
