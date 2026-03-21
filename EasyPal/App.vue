<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	page {
		width: 100%;
		overflow-x: hidden;
	}

	/* 避免 H5/APP 下 padding 导致横向溢出 */
	*,
	*::before,
	*::after {
		box-sizing: border-box;
	}

	view,
	scroll-view,
	image,
	text {
		box-sizing: border-box;
	}
</style>
