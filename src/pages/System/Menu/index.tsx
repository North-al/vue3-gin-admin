import type { FormInstance, FormRules } from 'element-plus'
import { fetchMenuList, fetchCreateMenu, fetchUpdateMenu } from '@/api/services'
import type { SetupContext } from 'vue'
import PagingTable from '@/components/PagingTable'

// 模拟菜单数据

const templateHtml = () => {
	return () => (
		<div>
			<PagingTable loading={false} hasSelection={false} tableData={[]} columns={[]} />
		</div>
	)
}

export default defineComponent(templateHtml, {})
