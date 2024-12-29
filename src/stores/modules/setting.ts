export const useSettingStore = defineStore('setting', () => {
	const config = reactive({
		theme: 'light',
		Logo: '',
		LogoText: 'North Gin Admin',
	})

	return {
		...toRefs(config),
	}
})
