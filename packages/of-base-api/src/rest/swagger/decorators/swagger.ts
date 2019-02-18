import 'reflect-metadata';

export function swaggerProp(opts?: any) {
	// this is the decorator factory
	return function(target: Object, key: string | symbol): void {
		// this is the decorator

		// get the existing metadata props
		const props = Reflect.getMetadata('tsswagger:props', target) || [];
		props.push({ key, opts });
		// define new metadata props
		Reflect.defineMetadata('tsswagger:props', props, target);
	};
}

export function swaggerDefinition(opts?: { title }) {
	// this is the decorator factory
	return function(target: Object): void {
		// this is the decorator
		// define new metadata props
		Reflect.defineMetadata('tsswagger:definition', opts, target);
	};
}