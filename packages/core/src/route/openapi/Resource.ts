import _ from 'lodash';
import { ISwaggerDefinitions, PathsDefinition } from '../types/openapi';

class Resource {
	resourceName: string;

	paths: PathsDefinition;

	definitions: ISwaggerDefinitions;

	parameters: object;

	basePath: string;

	constructor(resourceName, doc, basePath?) {
		this.resourceName = resourceName;
		this.paths = doc.paths;
		this.definitions = doc.definitions;
		this.parameters = doc.parameters;
		this.basePath = basePath || this.resourceName;

		_.each(this.paths, path => {
			_.each(path, operation => {
				if (!operation.consumes || operation.consumes.length === 0) {
					operation.consumes = ['application/json'];
				}

				if (!operation.produces || operation.produces.length === 0) {
					operation.produces = ['application/json'];
				}

				// tags
				if (!operation.tags || operation.tags.length === 0) {
					operation.tags = [_.capitalize(this.resourceName)];
				}
				// operations
				if (!operation.responses) operation.responses = {};
			});
		});
	}
}

export default Resource;
