import * as migration_20261114_182118_boshlangich from './20261114_182118_boshlangich';
import * as migration_20261128_120000_joriy_alifbo from './20261128_120000_joriy_alifbo';

export const migrations = [
  {
    up: migration_20261114_182118_boshlangich.up,
    down: migration_20261114_182118_boshlangich.down,
    name: '20261114_182118_boshlangich'
  },
  {
    up: migration_20261128_120000_joriy_alifbo.up,
    down: migration_20261128_120000_joriy_alifbo.down,
    name: '20261128_120000_joriy_alifbo'
  },
];
