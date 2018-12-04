<template lang="pug">
	.ltcon
		.addbtnbox
			a.addnewsbtn(@click='getpageData') 添加新闻
		table(width='100%', border='0', cellspacing='0', cellpadding='0', align='center')
			thead
				tr
					th(scope='col') 新闻标题
					th(scope='col') 操作人
					th(scope='col') 上传时间
					th(scope='col') 操作
			tbody
				tr(v-for='list in getpageData')
					td.newstit
						p {{list.title}}
					td {{list.time}}
					td {{list.editor}}
					td
						a.editorbtn(href='editor_news.html') 编辑
						a.deletebtn(href='#') 删除
		.turnpage
			a.prev(href='javascript:;', @click='gettype(-1)')  <
			.numpage
				a(href='javascript:;', @click='getcurPage(1)') 1
				a(href='javascript:;', @click='getcurPage(2)') 2
				span  共 {{totalnum}}  页
			a.next(href='javascript:;', @click='gettype(1)') >
</template>

<script>
export default {
	name: 'DemoPaging',
	data () {
		return {
			listcon: [
				{
					title: '双道打浆机双道打浆机双道双道打浆机双道打1',
					editor: '小胖',
					time: '2015-05-07 10:11'
				},
				{
					title: '双道打浆机双道打浆机双道双道打浆机双道打2',
					editor: '小胖',
					time: '2015-05-07 10:11'
				},
				{
					title: '双道打浆机双道打浆机双道双道打浆机双道打3',
					editor: '小胖',
					time: '2015-05-07 10:11'
				},
				{
					title: '双道打浆机双道打浆机双道双道打浆机双道打4',
					editor: '小胖',
					time: '2015-05-07 10:11'
				},
				{
					title: '双道打浆机双道打浆机双道双道打浆机双道打5',
					editor: '小胖',
					time: '2015-05-07 10:11'
				},
				{
					title: '双道打浆机双道打浆机双道双道打浆机双道打6',
					editor: '小胖',
					time: '2015-05-07 10:11'
				},
				{
					title: '标题标题标题标题标题标题标题标题标题标题7',
					editor: '小胖',
					time: '2015-05-07 10:11'
				},
				{
					title: '标题标题标题标题标题标题标题标题标题标题8',
					editor: '小胖',
					time: '2015-05-07 10:11'
				},
				{
					title: '标题标题标题标题标题标题标题标题标题标题9',
					editor: '小胖',
					time: '2015-05-07 10:11'
				},
				{
					title: '标题标题标题标题标题标题标题标题标题标题10',
					editor: '小胖',
					time: '2015-05-07 10:11'
				},
				{
					title: '标题标题标题标题标题标题标题标题标题标题11',
					editor: '小胖',
					time: '2015-05-07 10:11'
				},
				{
					title: '标题标题标题标题标题标题标题标题标题标题12',
					editor: '小胖',
					time: '2015-05-07 10:11'
				},
				{
					title: '标题标题标题标题标题标题标题标题标题标题13',
					editor: '小胖',
					time: '2015-05-07 10:11'
				},
				{
					title: '标题标题标题标题标题标题标题标题标题标题14',
					editor: '小胖',
					time: '2015-05-07 10:11'
				},
				{
					title: '标题标题标题标题标题标题标题标题标题标题15',
					editor: '小胖',
					time: '2015-05-07 10:11'
				},
				{
					title: '标题标题标题标题标题标题标题标题标题标题16',
					editor: '小胖',
					time: '2015-05-07 10:11'
				}
			],
			type: 0,
			getValue: '',
			listnum: '5'
		}
	},
	computed: {
		getpageData () {
			let _listnum = this.listnum
			let curArray = {}
			curArray[this.type] = []
			for (let n = this.type * _listnum; n < (this.type + 1) * _listnum && n < this.listcon.length; n++) {
				curArray[this.type].push(this.listcon[n])
			}
			return curArray[this.type]
		},
		totalnum () {
			return Math.ceil(this.listcon.length / this.listnum)
		}
	},
	methods: {
		getcurPage (n) {
			this.type = n - 1
		},
		gettype (a) {
			let step
			if (a > 0) {
				step = this.type !== this.totalnum - 1 ? a : 0
			} else {
				step = this.type !== 0 ? a : 0
			}
			this.type = this.type + step
			console.log(this.type, 'this.type')
		}
	}
}
</script>

<style lang="stylus" scoped>

a {
	text-decoration: none;
	font-size: 14px;
	color: #2b2b2b;
}
.ltcon {
	margin: 30px 50px;
	padding: 50px;
	table {
		tr {
			th {
				background: #dddddd;
				height: 35px;
				line-height: 35px;
				font-size: 14px;
			}
		}
		tbody {
			tr {
				td {
					line-height: 24px;
					border-bottom: 1px dashed #dfdfdf;
					padding: 5px 0;
					text-align: center;
					a {
						color: #000;
						&:hover {
							color: #707070;
						}
						&.editorbtn {
							display: inline-block;
							height: 28px;
							width: 30px;
							line-height: 28px;
							padding-left: 26px;
							margin-right: 20px;
						}
						&.deletebtn {
							display: inline-block;
							height: 28px;
							width: 30px;
							line-height: 28px;
							padding-left: 26px;
						}
					}
					&.newstit {
						text-align: left;
						padding-left: 25px;
					}
				}
			}
		}
	}
}
.turnpage {
	text-align: center;
	margin-top: 20px;
	a {
		display: inline-block;
		width: 30px;
		height: 30px;
		line-height: 30px;
		border: 1px solid #cccccc;
		border-radius: 4px;
		text-align: center;
	}
	.numpage {
		display: inline-block;
	}
}

</style>
