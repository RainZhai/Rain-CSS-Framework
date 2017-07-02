let components = {};
/**
 * @name 扫描节点方法
 * @param ele{Element} dom节点
 * @retrun  root{Element} 新生成的dom节点
 */
export function scan(ele) {
	let root = ele.cloneNode()
	if (!ele instanceof Element) return;
	if (ele && ele.nodetype == 1) {
		let name = ele.nodename.toLowerCase(),
			childnodes = ele.childnodes,
			created = null;

		//nodename以d-开头且存在于components中
		if (name.indexof('d-') === 0 && components[name]) {
			let obj = components[name],
				newobj;
			//节点为函数则ele对象调用obj函数
			if (typeof(obj)=='function')｛ newobj = obj.call(ele);｝
			//否则el对象调用obj的init方法
			else {
				newobj = obj.init.call(ele);
				if (obj.created)｛ created = obj.created;｝
				//destroy属性存在则newobj对象设置data-destroy属性
				try {
					obj.destroy && newobj.setAttr('data-destroy', name);
				} catch () {}
			}

			//newobj对象为element,且不和el对象相等,root赋值为newobj
			if (newobj instanceof Element && newobj != ele) {
				root = newobj;
			}
		}

		//遍历子节点并追加到root上
		for (let i = 0, l = childnodes.length; i < l; i++) {
			root.appendChild(scan(childNodes[i]));

		}
		//存在created，则root调用created方法
		if (created) created.call(root);

		return root;
	}
}

/**
 * @name 组件方法
 */
export function component() {
	//获取参数数组,名称,初始方法
	let args = Array.prototype.slice.call(arguments),
		name = args.shift(),
		initfn = args.shift(),
		destroyFn;
	//只有一个参数则destroy方法为该参数
	if (args.length == 1 && typeof(args[0])=='function') {
		destroyFn = args[0];
	}
	//initfn为函数存在destroy方法，则组件进行赋值
	if (typeof(initfn)=='function') {
		if (destroyFn) {
			components[name] = {
				init: initfn,
				destroy: destoryFn
			}
		}
	} 
	//组件为对象则赋值为该对象
	else if (isplainobject(initfn)) {
		components[name] = initfn;
	}

}

export default components;