const ENV = require('../env')

class CSNode{
	constructor(parent){
		this.class = this.constructor
		this.childType = this.class.childType
		this.parentType = this.class.parentType
		if(this.class.parentType){
			this[this.class.parentType.name.toLowerCase()] = parent
		}
		if(this.class.childType){
			this.children = new CSSiblings(this)
			this[`${this.class.childType.name.toLowerCase()}s`] = this.children
		}
		if(this.onCreate){
			this.onCreate()
		}
	}
}

class CSSiblings extends Array{
	constructor(parent){
		super()
		this.parent = parent
		this.class = parent.childType
	}

	add(options){
		let child = new this.class(this.parent, options)
		this.push(child)
		return child
	}
}

class Coffeesheet extends CSNode{
	static get childType(){
		return Table
	}

	onCreate(){
		this.children.add()
	}
}

class Table extends CSNode{
	static get childType(){
		return Section
	}
	static get parentType(){
		return Coffeesheet
	}

	onCreate(){
		this.children.add()
	}
}

class Section extends CSNode{
	static get childType(){
		return Row
	}
	static get parentType(){
		return Table
	}
	// createColumn(){
	// 	this.columns.push(new Column())
	// }

	onCreate(){
		this.children.add()
	}
}

class Row extends CSNode{
	static get childType(){
		return Cell
	}
	static get parentType(){
		return Section
	}
	get index(){
		return this.section.rows.indexOf(this)
	}
	get next(){
		return this.section.rows[this.index + 1]
	}
	get previous(){
		return this.section.rows[this.index - 1]
	}

	onCreate(){
		for(let i = 0; i < ENV.CFS_DEFAULT_ROW_CELLS; i++){
			this.children.add(i)
		}
	}
}

// class Column{
// 	constructor(){
// 		this.cells = []
// 	}
// }

class Cell{
	constructor(row, datum){
		this.row = row
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
