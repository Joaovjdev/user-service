import swaggerJsdoc from 'swagger-jsdoc';
import YAML from 'yamljs';
import path from 'path';

const swaggerYaml = YAML.load(path.join(__dirname, 'swagger.yaml'));

const options = {
  definition: swaggerYaml,
  apis: [],
};

export const swaggerSpec = swaggerJsdoc(options); 