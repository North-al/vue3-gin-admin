import styles from './css/logo.module.scss'
import logoImg from '@/assets/logo.png'

export default defineComponent({
	name: 'Logo',
	props: {
		collapse: {
			type: Boolean,
			default: false,
		},
	},
	setup(props) {
		return () => (
			<div class={styles['sidebar-logo-container']}>
				<router-link to="/" class={styles['sidebar-logo-link']}>
					<img src={logoImg} class={styles['sidebar-logo']} alt="logo" />
					{!props.collapse && <h1 class={styles['sidebar-title']}>North Admin</h1>}
				</router-link>
			</div>
		)
	},
})
