import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views'
import DemoSlider from '@/views/demo_silder'
import DemoPaging from '@/views/demo_paging'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'Index',
			component: Index
		},
		{
			path: '/demoslider',
			name: 'DemoSlider',
			component: DemoSlider
		},
		{
			path: '/demopaging',
			name: 'DemoPaging',
			component: DemoPaging
		}
	]
})
