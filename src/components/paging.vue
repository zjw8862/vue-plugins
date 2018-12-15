<template lang="pug">
	div
		.turn-page
			div.page-num
				a(
					href='javascript:;'
					@click='getType(-1)'
					:class="{'prev': true,'disabled':curpageNum == 1}"
				) &lt;
				.btn-number(v-for="(item,index) in totalpagenum")
					a(href='javascript:;'
						@click='pagenumClick(item,index)'
						v-text="!!item ? item : index+1"
						:class="{'active': curpageNum == item}"
					)
				a(
					href='javascript:;'
					@click='getType(1)'
					:class="{'next': true,'disabled':curpageNum == total}"
				) &gt;
			div.skip-page
				span 到第
				input(type="text" v-model="skipPageNum")
				span 页
				button(@click="confirmSkip") 确定
			div.total 当前第{{curpageNum}}页/共{{total}}页

</template>

<script>
/**
* props total总页数 pagerCount收缩页 currentPage默认第几页
* 触发事件 prev-click next-click current-change
*/
export default {
	name: 'DemoPaging',
	props: {
		total: {
			type: Number,
			default: 8
		},
		pagerCount: {
			type: [String, Number],
			default: ''
		},
		currentPage: {
			type: Number,
			default: 1
		}
	},

	data () {
		return {
			curpageNum: this.currentPage,
			skipPageNum: '',
			totalpagenum: []
		}
	},

	created () {
		this.init()
	},

	watch: {
		curpageNum: {
			handler (curVal, oldVal) {
				this.countPgnumber()
				this.$emit('current-change', curVal)
			},
			immediate: true
		}
	},

	methods: {
		init () {
			if (!!this.pagerCount && (this.pagerCount <= 0 || this.pagerCount >= this.total)) {
				throw new Error('pagerCount配置错误')
			}
			this.countPgnumber()
		},

		// 计算排列页数
		countPgnumber () {
			if (!this.pagerCount) {
				this.totalpagenum = new Array(this.total)
				for (let i = 0; i < this.totalpagenum.length; i++) {
					if (!this.totalpagenum[i]) {
						this.totalpagenum[i] = i + 1
					}
				}
				return
			}
			let pageArray = [...this.totalpagenum] || []
			let first = pageArray.shift() || 1
			let last = pageArray.pop() || this.total
			let itemNum = this.pagerCount - 2 // 除首末页外中间项个数
			// 出现两个省略号的情况
			if (this.curpageNum >= first + itemNum && this.curpageNum <= last - itemNum) {
				pageArray = [] // 重新填充首末以外项
				pageArray[0] = '...'
				// 循环计算中间几项
				for (let i = 1; i < itemNum + 1; i++) {
					pageArray[i] = this.curpageNum - Math.floor(itemNum / 2) + i - 1
				}
				pageArray[pageArray.length] = '...'
				pageArray = [first, ...pageArray, last]
			}

			// 前面有一个省略号的情况
			if (last - this.curpageNum < itemNum) {
				pageArray = []
				pageArray = new Array(this.pagerCount + 1)
				pageArray[0] = first
				pageArray[1] = '...'
				for (let i = pageArray.length - 1; i > 1; i--) {
					pageArray[i] = this.total - (itemNum + 2 - i)
				}
			}

			// 后面有一个省略号的情况
			if (this.curpageNum - first < itemNum) {
				pageArray = []
				pageArray = new Array(this.pagerCount + 1)
				pageArray[pageArray.length - 1] = this.total
				pageArray[pageArray.length - 2] = '...'
				for (let i = 0; i < pageArray.length; i++) {
					if (!pageArray[i]) {
						pageArray[i] = i + 1
					}
				}
			}
			this.totalpagenum = [...pageArray]
		},

		// 页数点击事件
		pagenumClick (item, index) {
			if (item === '...' && index === 1) {
				this.curpageNum = this.curpageNum - (this.pagerCount - 2)
			} else if (item === '...' && index === this.totalpagenum.length - 2) {
				this.curpageNum = this.curpageNum + (this.pagerCount - 2)
			} else {
				this.curpageNum = item
			}
		},

		// 上一页下一页切换
		getType (type) {
			if (type > 0) {
				if (this.curpageNum === this.total) return
				this.curpageNum = this.curpageNum + 1
				this.$emit('next-click', this.curpageNum)
			} else {
				if (this.curpageNum === 1) return
				this.curpageNum = this.curpageNum - 1
				this.$emit('prev-click', this.curpageNum)
			}
		},

		// 跳页
		confirmSkip () {
			if (!this.skipPageNum) return
			this.curpageNum = this.skipPageNum
			this.skipPageNum = ''
		}
	}
}
</script>

<style lang="stylus" scoped>
*{
	outline none;
}
size = 30px
a {
	text-decoration: none;
	font-size: 14px;
	color: #2b2b2b;
}
.turn-page {
	text-align: center;
	margin-top: 20px;
	.page-num{
		display: inline-block;
		.btn-number {
			display: inline-block;
		}
		a {
			display: inline-block;
			width: size;
			height: size;
			line-height: size;
			border: 1px solid #cccccc;
			border-radius: 3px;
			text-align: center;
			margin:0 5px;
			&.active{
				color:red;
			}
			&.disabled{
				background: #e4e4e4;
				border: 1px solid #e4e4e4;
			}
		}
	}
	.skip-page{
		display: inline-block;
		margin: 0 5px;
		input{
			display: inline-block;
			padding 0 8px
			text-align center
			width: size*1.2;
			height: size;
			border-radius: 3px;
			margin: 0 5px;
			border: 1px solid #cccccc;
		}
		button{
			width: 50px;
			height: size;
			border-radius: 4px;
			margin: 0 5px;
			color:#fff;
			border: none;
			background: #00a4ec;
			cursor pointer
		}
	}
	.total{
		display: inline-block;
	}
}

</style>
