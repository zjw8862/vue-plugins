<template>
	<div>
		<Slider :sliderdata="slider1" v-model= "value1" ></Slider>
		<span>{{value1}}</span>
		<Slider :sliderdata="slider2" v-model= "value2" ></Slider>
		<span>{{value2}}</span>
		<Slider :sliderdata="slider3" v-model= "value3" ></Slider>
		<span>{{value3}}</span>

		<Paging :total="12" :pagerCount="5" :currentPage= "2"></Paging>
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

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
