// jest.config.js
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    // O diretório onde seus testes estão
    roots: ['<rootDir>/src'],
    // Padrões de arquivos de teste
    testMatch: [
      '**/__tests__/**/*.+(ts|tsx|js)',
      '**/?(*.)+(spec|test).+(ts|tsx|js)',
    ],
    // Transformadores de módulo
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
    },
  };