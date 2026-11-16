import * as migration_20261114_182118_boshlangich from './20261114_182118_boshlangich';

export const migrations = [
  {
    up: migration_20261114_182118_boshlangich.up,
    down: migration_20261114_182118_boshlangich.down,
    name: '20261114_182118_boshlangich'
  },
];
