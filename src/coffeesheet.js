const CFS_DEFAULT_ROW_CELLS = 5

class Coffeesheet{
	constructor(){
		this.tables = []
		this.createTable()
	}
	createTable(){
		this.tables.push(new Table())
	}
}

class Table{
	constructor(){
		this.sections = []
		this.createSection()
	}
	createSection(){
		this.sections.push(new Section())
	}
}

class Section{
	constructor(){
		this.rows = []
		// this.columns = []
		this.createRow()
	}
	createRow(){
		this.rows.push(new Row())
	}
	// createColumn(){
	// 	this.columns.push(new Column())
	// }
}

class Row{
	constructor(){
		this.cells = []
		for(let i = 0; i < CFS_DEFAULT_ROW_CELLS; i++){
			this.createCell(i)
		}
	}
	createCell(datum){
		this.cells.push(new Cell(datum))
	}
}

// class Column{
// 	constructor(){
// 		this.cells = []
// 	}
// }

class Cell{
	constructor(datum){
		this.datum = datum
	}
}

module.exports = {
	Coffeesheet,
	Table,
	Section,
	Row,
	Cell
}
