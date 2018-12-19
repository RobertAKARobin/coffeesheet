// TODO: Declare all classes first, then object.defineProperties on each
// to avoid having to use getters
const Section = Object.defineProperties({}, {
	ancestors: {
		get: ()=>[Table, Base]
	},
	child: {
		get: ()=>Row
	},
	defaultNumberOfChildren: {
		value: 3
	},
	descendants: {
		get: ()=>[Row]
	},
	name: {
		value: 'Section'
	},
	parent: {
		get: ()=>Table
	},
	pluralName: {
		value: 'sections'
	},

	proto: {
		value: Object.defineProperties({}, {
			class: {
				get: ()=>Section
			}
		})
	},

	create: {
		value: (input = {})=>{
			const pvt = {
				children: [],
				parent: undefined
			}
			const section = pvt.instance = Object.create(Section.proto, {
				getChildren: {
					value: Cafesheet.instance.getChildren(pvt)
				},
				getParent: {
					value: Cafesheet.instance.getParent(pvt)
				}
			})

			if(input.rows instanceof Array){
				input.rows.forEach(row=>{
					if(row.class === Row){
						pvt.children.push(row)
					}
				})
			}else{
				Section.defaultNumberOfChildren.times(n=>{
					pvt.children.push(Row.create({parent: section}))
				})
			}
			if(input.parent && input.parent.class === Section.parent){
				pvt.parent = input.parent
			}
			return section
		}
	}
})
