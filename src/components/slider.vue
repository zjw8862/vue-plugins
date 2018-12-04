<template lang="pug">
	div(:class="{'sliderbox':true,'disabled':disable}")
		.slider_progress(:style='{width: sideWidth}')
		.slider_bar
		.current_dot(:style='{left: sideWidth}', v-slidermove='{sliderProgres}')
		.tiptitle(:style='{left: sideWidth}', v-if='tsFlag', v-text='curVal')
</template>

<script>
export default {
	name: 'Slider',
	props: ['sliderdata', 'value'],
	data () {
		return {
			sideWidth: '', // left值和宽度，事件里面计算后赋值
			tsFlag: this.sliderdata.Tooltip, // 是否显示Tooltip栏
			minVal: this.sliderdata.value.minVal,
			maxVal: this.sliderdata.value.maxVal,
			defaultV: this.sliderdata.value.defaultVal,
			oneFlag: true, // 第一次根据默认值计算的标识
			curVal: '', // 计算出当前值
			disable: this.sliderdata.disable
		}
	},

	directives: {
		slidermove: {
			bind (el, binding) {
				el.onmousedown = function (e) {
					let disX = e.clientX - el.offsetLeft
					document.onmousemove = function (e) {
						// 判断父容器上是否有disabled 样式 有则禁止拖动
						if (el.parentNode.className.toString().indexOf('disabled') > 0) {
							return false
						}
						// 0 - 父元素的宽 的范围内滑动
						el.style.left = e.clientX - disX > 0 ? (e.clientX - disX > el.parW ? el.parW : e.clientX - disX + 'px') : 0 + 'px'
						let numelf = parseInt(el.style.left)
						// 计算比例
						let curper = numelf > 0 ? (numelf / el.parW).toFixed(2) : 0
						binding.value.sliderProgres(el, curper)
					}
					document.onmouseup = function (e) {
						document.onmousemove = document.onmouseup = null
					}
					return false
				}
			},

			inserted (el, binding) {
				// 定义一个parW属性获取父容器的宽
				el.parW = el.parentNode.offsetWidth
				let numelf = parseInt(el.style.left)
				let curper = numelf > 0 ? (numelf / el.parW).toFixed(2) : 0 // 计算比例
				// 插入元素时执行一次 sliderProgres方法
				binding.value.sliderProgres(el, curper)
			}
		}
	},

	methods: {
		sliderProgres (e, per) { // 函数当作参数传进自定义指令中,并对应el 事件里的变化 参数为 Dom元素 和 比例值
			if (this.oneFlag && this.defaultV !== undefined) {
				let swbl = this.defaultV !== 0 ? this.defaultV / this.maxVal : 0 // 计算当前默认值与最大值的比例
				this.sideWidth = Number(swbl * 100).toFixed(1) + '%' // 转化成百分比
				this.curVal = this.defaultV
				this.oneFlag = false // 改成false 之后不进入默认值计算
			} else {
				this.sideWidth = e.style.left
				this.curVal = parseInt(per * this.maxVal) || 0 // 根据传入的比例值计算当前值 默认值为undefined 时为0
			}
			this.$emit('input', this.curVal)
		}
	}
}
</script>

<style lang="stylus" scoped>
themecolor = #409eff
.sliderbox
	width 300px
	height 10px
	position relative
	margin 20px 0px
	.slider_bar
		width 100%
		height 100%
		position absolute
		top 0
		left 0
		z-index 1
		border-radius 5px
		background #e2e2e2
	.slider_progress
		height 100%
		background themecolor
		position absolute
		border-bottom-left-radius 5px
		border-top-left-radius 5px
		top 0
		left 0
		z-index 3
	.current_dot
		width 18px
		height 18px
		cursor pointer
		position absolute
		top -4px
		left 0px
		transform translate(-50%, 0%)
		z-index 5
		background #fff
		border-radius 100%
		border 2px solid themecolor
	.tiptitle
		background rgba(0,0,0,0.7)
		color #fff
		top -30px
		position absolute
		font-size 14px
		text-align center
		border-radius 3px
		line-height 20px
		height 20px
		width 35px
		margin-left 0px
		transform translate(-50%, 0%)
	&.disabled
		.slider_progress
			background #bababa
		.current_dot
			border-color #bababa

</style>
