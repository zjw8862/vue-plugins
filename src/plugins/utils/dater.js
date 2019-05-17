class Dater {
	constructor (date, edate = '') {
		this.curdate = date ? new Date(date) : new Date()
		if (edate) {
			this.sdate = this.curdate
			this.edate = new Date(edate)
		}
	}

	get year () {
		return this.curdate.getFullYear()
	}

	get month () {
		return this.curdate.getMonth()
	}

	get date () {
		return this.curdate.getDate()
	}

	get hour () {
		return this.curdate.getHours()
	}

	get minute () {
		return this.curdate.getMinutes()
	}

	get second () {
		return this.curdate.getSeconds()
	}

	get timestamp () {
		return this.curdate.getTime()
	}

	addDays (num) {
		let nowDate = new Date(this.curdate).getTime() + num * 24 * 60 * 60 * 1000
		return new Date(nowDate)
	}

	subtractDays (num) {
		return new Date(this.curdate).getTime() - num * 24 * 60 * 60 * 1000
	}

	addWeeks (num) {
		return new Date(this.curdate).getTime() + num * 7 * 24 * 60 * 60 * 1000
	}

	subtractWeeks (num) {
		return new Date(this.curdate).getTime() - num * 7 * 24 * 60 * 60 * 1000
	}

	format (template = 'YYYY-MM-DD HH:mm:SS') {
		let map = {
			'YYYY': this.year,
			'MM': this.fillZero(this.month + 1),
			'DD': this.fillZero(this.date),
			'HH': this.fillZero(this.hour),
			'mm': this.fillZero(this.minute),
			'SS': this.fillZero(this.second),
			'X': parseInt(this.timestamp / 1000)
		}
		Object.keys(map).forEach(key => {
			template = template.replace(key, map[key])
		})
		return template
	}

	// 获取闰年时2月的天数
	runNian (_year) {
		let days = _year % 400 === 0 || (_year % 4 === 0 && _year % 100 !== 0) ? 29 : 28
		return days
	}

	// 根据日期计算当月有多少周
	getMonthhasWeeks () {
		let curDate = this.curdate
		let _year = curDate.getFullYear()
		let _month = curDate.getMonth() + 1
		// 获取当前年月对应的一个月的天数
		let allDay = [31, this.runNian(_year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][_month - 1]
		// 设置当月第一天
		let firstDate = new Date(curDate)
		firstDate.setDate(1)
		let lastDate = new Dater(firstDate).addDays(allDay - 1)
		return this.stretchWeeklen(firstDate, lastDate)
	}

	// 横跨周数计算 params起始日期和结束日期
	stretchWeeklen (sdate = this.sdate, edate = this.edate) {
		let days = (Date.parse(edate) - Date.parse(sdate)) / (24 * 60 * 60 * 1000)
		// 计算第一天周几
		let dayth = new Date(sdate).getDay()
		let firstdayth = dayth !== 0 ? dayth : 7
		// 第一周包含的天数
		let beforeDays = 7 - firstdayth + 1
		// 减去第一周天数剩余天数计算
		let weeklength = Math.ceil((days - beforeDays) / 7) + 1
		return weeklength
	}

	fillZero (n) {
		return n > 9 ? n : '0' + n
	}
}

function dater (date, edate = '') {
	return new Dater(date, edate)
}
export default dater
