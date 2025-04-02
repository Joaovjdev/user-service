import swaggerJsdoc from 'swagger-jsdoc';
import YAML from 'yamljs';
import path from 'path';

const swaggerYaml = YAML.load(path.join(__dirname, 'swagger.yaml'));

const options = {
  definition: swaggerYaml,
  apis: [], // Não precisamos mais de apis pois estamos usando o arquivo YAML
};

export const swaggerSpec = swaggerJsdoc(options); 