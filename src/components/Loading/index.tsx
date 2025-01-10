import styles from './loading.module.scss'

export default defineComponent(() => {
	return () => (
		<div class={[styles.container, 'bg-dark']}>
			<div class={styles.spinner}>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
			<div class={styles.text}>
				页面正在加载中 <span class={styles.dots}>...</span>
			</div>
		</div>
	)
})
