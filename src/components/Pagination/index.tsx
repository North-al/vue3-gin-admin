export default defineComponent({
	name: 'Pagination',
	props: {
		pagination: {
			type: Object as PropType<Pagination>,
			required: true,
		},
		total: {
			type: Number,
			required: true,
		},
	},
	emits: ['update'],
	setup(props, { emit }) {
		const slot = {
			total: () => <span class="text-12px">共 {props.total} 条</span>,
		}

		return () => (
			<div class="flex-end mt-12px">
				<el-pagination
					v-model:currentPage={props.pagination.currentPage}
					v-model:pageSize={props.pagination.pageSize}
					total={props.total}
					layout="slot, prev, pager, next, sizes, jumper"
					background
					onUpdate:currentPage={(page: number) =>
						emit('update', { ...props.pagination, currentPage: page })
					}
					onUpdate:pageSize={(pageSize: number) =>
						emit('update', { ...props.pagination, pageSize })
					}
				>
					{slot.total()}
				</el-pagination>
			</div>
		)
	},
})
