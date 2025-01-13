import { KeepAlive, Suspense, Transition } from 'vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'

export default defineComponent(() => {
	const theme = {
		token: {
			colorPrimary: '#0000ff',
			colorPrimaryHover: '#6666ff',
		},
	}

	return () => (
		<router-view>
			{{
				default: ({ Component: comp }: { Component: VNode }) =>
					comp && (
						<Transition mode="out-in">
							<KeepAlive>
								<Suspense>
									{{
										default: () => (
											<div>
												<a-config-provider theme={theme} locale={zhCN}>
													<a-app>
														<comp />
													</a-app>
												</a-config-provider>
											</div>
										),
										fallback: () => <loading></loading>,
									}}
								</Suspense>
							</KeepAlive>
						</Transition>
					),
			}}
		</router-view>
	)
})
