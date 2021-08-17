import rc from 'rc';
import packageJson from '../package.json';

interface AppConfiguration {
  db: {
    uri: string;
    dbName: string;
  };
}

const defaultConf: AppConfiguration = {
  db: {
    uri: 'mongodb://localhost:27017/my-app',
    dbName: 'my-app',
  },
};

const appConfig = rc<AppConfiguration>(packageJson.name, defaultConf);

export default appConfig;
