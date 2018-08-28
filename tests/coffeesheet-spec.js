const o = require('mithril/ospec/ospec')
const {Coffeesheet, Table, Section, Row, Cell} = require('../src/coffeesheet')

o.spec('Coffeesheet', ()=>{
	let coffeesheet

	o.before(()=>{
		coffeesheet = new Coffeesheet()
	})
	o.spec('#constructor', ()=>{
		o('creates at least one table', ()=>{
			o(coffeesheet.tables.length >= 1).equals(true)
		})
	})
	o.spec('#createTable', ()=>{
		o('increases the coffeesheet\'s tables by 1', ()=>{
			let numberOfTables = coffeesheet.tables.length
			coffeesheet.createTable()
			o(coffeesheet.tables.length).equals(numberOfTables + 1)
		})
	})
	o.spec('.tables, each', ()=>{
		o('it is a Table', ()=>{
			coffeesheet.tables.forEach((table)=>{
				o(table.constructor).equals(Table)
			})
		})
		o('it has at least one section', ()=>{
			coffeesheet.tables.forEach((table)=>{
				o(table.sections.length >= 1).equals(true)
			})
		})
		o('it has a reference to the ancestor Coffeesheet', ()=>{
			coffeesheet.tables.forEach((table)=>{
				o(table.coffeesheet).equals(coffeesheet)
			})
		})
	})
})

o.spec('Table', ()=>{
	let coffeesheet,
		table
	
	o.before(()=>{
		coffeesheet = new Coffeesheet()
		table = coffeesheet.tables[0]
	})
	o.spec('#constructor', ()=>{
		o('creates at least one section', ()=>{
			o(table.sections.length >= 1).equals(true)
		})
	})
	o.spec('#createSection', ()=>{
		o('increases the table\'s sections by 1', ()=>{
			let numberOfSections = table.sections.length
			table.createSection()
			o(table.sections.length).equals(numberOfSections + 1)
		})
	})
	o.spec('.sections, each', ()=>{
		o('it is a Section', ()=>{
			table.sections.forEach((section)=>{
				o(section.constructor).equals(Section)
			})
		})
		o('it has at least one row', ()=>{
			table.sections.forEach((section)=>{
				o(section.rows.length >= 1).equals(true)
			})
		})
		o('it has a reference to the ancestor Table', ()=>{
			table.sections.forEach((section)=>{
				o(section.table).equals(table)
			})
		})
		o('it has a reference to the ancestor Coffeesheet', ()=>{
			table.sections.forEach((section)=>{
				o(section.coffeesheet).equals(coffeesheet)
			})
		})
	})
})

o.spec('Section', ()=>{
	let coffeesheet,
		table,
		section
	
	o.before(()=>{
		coffeesheet = new Coffeesheet()
		table = coffeesheet.tables[0]
		section = table.sections[0]
	})
	o.spec('#constructor', ()=>{
		o('creates at least one row', ()=>{
			o(section.rows.length >= 1).equals(true)
		})
	})
	o.spec('#createRow', ()=>{
		o('increases the section\'s rows by 1', ()=>{
			let numberOfRows = section.rows.length
			section.createRow()
			o(section.rows.length).equals(numberOfRows + 1)
		})
	})
	o.spec('.rows, each', ()=>{
		o('it is a Row', ()=>{
			section.rows.forEach((row)=>{
				o(row.constructor).equals(Row)
			})
		})
		o('it has at least one cell', ()=>{
			section.rows.forEach((row)=>{
				o(row.cells.length >= 1).equals(true)
			})
		})
		o('it has a reference to the ancestor Section', ()=>{
			section.rows.forEach((row)=>{
				o(row.section).equals(section)
			})
		})
		o('it has a reference to the ancestor Table', ()=>{
			section.rows.forEach((row)=>{
				o(row.table).equals(table)
			})
		})
		o('it has a reference to the ancestor Coffeesheet', ()=>{
			section.rows.forEach((row)=>{
				o(row.coffeesheet).equals(coffeesheet)
			})
		})
	})
})

o.spec('Row', ()=>{
	let coffeesheet,
		table,
		section,
		row
	
	o.before(()=>{
		coffeesheet = new Coffeesheet()
		table = coffeesheet.tables[0]
		section = table.sections[0]
		row = section.rows[0]
	})
	o.spec('#constructor', ()=>{
		o('creates at least one cell', ()=>{
			o(row.cells.length >= 1).equals(true)
		})
	})
	o.spec('#createCell', ()=>{
		o('increases the row\'s cells by 1', ()=>{
			let numberOfCells = row.cells.length
			row.createCell()
			o(row.cells.length).equals(numberOfCells + 1)
		})
	})
	o.spec('.cells, each', ()=>{
		o('it is a Cell', ()=>{
			row.cells.forEach((cell)=>{
				o(cell.constructor).equals(Cell)
			})
		})
		o('it has a reference to the ancestor Row', ()=>{
			row.cells.forEach((cell)=>{
				o(cell.row).equals(row)
			})
		})
		o('it has a reference to the ancestor Section', ()=>{
			row.cells.forEach((cell)=>{
				o(cell.section).equals(section)
			})
		})
		o('it has a reference to the ancestor Table', ()=>{
			row.cells.forEach((cell)=>{
				o(cell.table).equals(table)
			})
		})
		o('it has a reference to the ancestor Coffeesheet', ()=>{
			row.cells.forEach((cell)=>{
				o(cell.coffeesheet).equals(coffeesheet)
			})
		})
	})
})
