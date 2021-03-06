Row.component = {
	view: function(vnode){
		const row = vnode.attrs.row
		return m('tr.dataRow', [
			m('th', [
				m('button[action=remove]', {
					onclick: ()=>{
						row.removeFromParent()
					}
				}, [
					m('span.rowPlace', row.place)
				]),
				m('button[action=create]', {
					onclick: ()=>{
						row.getParent().createChild().placeAt(row.place + 1)
					}
				}, '+')
			]),
			row.cells.map(cell => {
				return m(Cell.component, {cell})
			})
		])
	}
}
