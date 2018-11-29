o('Section', ()=>{
	o(Section.descendants).deepEquals([Row, Cell])
	o(Section.child).equals(Row)
	o(Section.ancestors).deepEquals([Table, Base])
	o(Section.parent).equals(Table)
})
o.spec('@section', ()=>{
	Cafesheet.Spec(Section)
		.addToParent()
		.createChild()
		.getChildren()
		.getParent()
		.getPlace()
		.getSiblings()
		.placeAt()
		.placeChild()
		.removeFromParent()
		.removeChild()
})