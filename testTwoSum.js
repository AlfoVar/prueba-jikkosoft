const { twoSum } = require('./twoSum');

console.log('Iniciando pruebas de twoSum...');

console.assert(
    JSON.stringify(twoSum([2, 7, 11, 15], 9)) === JSON.stringify([0, 1]),
    'Prueba 1 fallida: [2,7,11,15], 9'
);

console.assert(
    JSON.stringify(twoSum([3, 2, 4], 6)) === JSON.stringify([1, 2]),
    'Prueba 2 fallida: [3,2,4], 6'
);

console.assert(
    JSON.stringify(twoSum([3, 3], 6)) === JSON.stringify([0, 1]),
    'Prueba 3 fallida: [3,3], 6'
);

console.assert(
    twoSum([1, 2, 3], 10).length === 0,
    'Prueba 4 fallida: sin solución'
);

console.log('Todas las pruebas pasaron');