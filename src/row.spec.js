o.spec('Row', ()=>{
	o('family', ()=>{
		o(Row.descendants).deepEquals([Cell])
		o(Row.child).equals(Cell)
		o(Row.ancestors).deepEquals([Section, Table, Base])
		o(Row.parent).equals(Section)
	})

	o.spec('.create()', ()=>{
		o('parentless', ()=>{
			const instance = Row.create()
			o(instance.getChildren().length).equals(Row.defaultNumberOfChildren)
			o(instance.getParent()).equals(undefined)
		})
		o('parented', ()=>{
			const base = Base.create()
			const table = base.scanFor(Table)[0]
			const section = table.getChildren()[0]
			const rowA = section.getChildren()[0]
			o(table.getWidth()).equals(Row.defaultNumberOfChildren)
			o(rowA.getWidth()).equals(table.getWidth())

			const initialWidth = Row.defaultNumberOfChildren
			table.getColumnAt(0).removeFromParent()
			o(table.getWidth()).equals(initialWidth - 1)
			o(rowA.getWidth()).equals(table.getWidth())

			const rowB = section.createChild()
			o(table.getWidth()).equals(initialWidth - 1)
			o(rowA.getWidth()).equals(table.getWidth())
			o(rowB.getWidth()).equals(table.getWidth())

		})
	})
	o('.new()', ()=>{
		const instance = Row.new()
		o(instance.getChildren().length).equals(0)
		o(instance.getParent()).equals(undefined)
	})
})
o.spec('@row', ()=>{
	Cafesheet.Spec(Row)
		.addTo()
		.createChild()
		.empty()
		.getChildren()
		.getParent()
		.getPlace()
		.getSiblings()
		.placeAt()
		.placeChild()
		.removeFromParent()
		.removeChild()
		.scan()

	o('.getWidth()', ()=>{
		o(Row.new().getWidth()).equals(0)

		const instance = Row.create()
		const initialWidth = Row.defaultNumberOfChildren
		o(instance.getWidth()).equals(initialWidth)
		
		const child = instance.createChild()
		o(instance.getWidth()).equals(initialWidth + 1)
		
		instance.createChild()
		o(instance.getWidth()).equals(initialWidth + 2)
		
		instance.removeChild(child)
		o(instance.getWidth()).equals(initialWidth + 1)
	})
	o('.scanFor($Class)', ()=>{
		const base = Base.create()
		const table = base.tables[0]
		const section = table.sections[0]
		const instance = section.rows[0]
		const cells = instance.cells

		o(instance.scanFor(Base)).equals(base)
		o(instance.scanFor(Table)).deepEquals(table)
		o(instance.scanFor(Section)).deepEquals(section)
		o(instance.scanFor(Row)).deepEquals(instance)
		o(instance.scanFor(Cell)).deepEquals(cells)
		
		o(instance.scanFor(Section)).equals(instance.getParent())
		o(instance.scanFor(Cell)).deepEquals(instance.getChildren())
	})
})
