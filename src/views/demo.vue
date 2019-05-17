<template>
	<div>
		<div class="tab-box">
			<div class="tab-title-box">
				<div class="tab-title">Slider</div>
				<div class="tab-title">Paging</div>
			</div>
			<div class="tab-content-box">
				<div class="tab-content">
					<Slider :sliderdata="slider2" v-model= "value2" ></Slider>
				</div>
				<div class="tab-content">
					<Paging :total="12" :pagerCount="5" :currentPage= "2"></Paging>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
import utils from '@/plugins/utils'
import Slider from '@/components/slider'
import Paging from '@/components/paging'
console.log(utils, 'utils')

export default {
	name: 'Demo',
	components: {
		Slider,
		Paging
	},
	data () {
		return {
			slider1: {
				Tooltip: false, // 默认不带Tooltip
				value: ''
			},
			slider2: {
				Tooltip: true,
				value: {
					minVal: 0,
					maxVal: 200,
					defaultVal: 100
				}
			},
			slider3: {
				Tooltip: true,
				value: {
					minVal: 0,
					maxVal: 100,
					defaultVal: 40
				},
				disable: true // 禁止操作
			},
			value1: 0,
			value2: 0,
			value3: 0
		}
	}
}
</script>

<style lang="stylus">
#app
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;

.tab-box
	display flex
	justify-content space-between
	.tab-title-box
		width 100px
	.tab-title
		line-height 40px
</style>
