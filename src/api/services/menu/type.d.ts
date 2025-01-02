interface IMenuItem {
	id?: number
	parent_id: number | null
	title: string
	route_path: string
	route_name: string
	redirect: string
	page_file_path: string
	icon: string
	hidden: boolean
	keep_alive: boolean
	sort: number
	created_at?: string
	updated_at?: string
}
