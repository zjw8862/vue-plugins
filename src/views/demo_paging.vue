<template>
	<div>
		<Paging></Paging>
	</div>
</template>

<script>
import Paging from '@/components/paging'
export default {
	name: 'DemoPaging',
	components: {
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
