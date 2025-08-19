/**
 * Encuentra dos índices cuyos valores sumen el 'target'.
 * @param {number[]} nums - Arreglo de enteros
 * @param {number} target - Valor objetivo
 * @returns {number[]} - Arreglo con los índices [i, j], o vacío si no hay solución
 */
function twoSum(nums, target) {
    const seen = new Map();

    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (seen.has(complement)) {
            return [seen.get(complement), i];
        }
        seen.set(nums[i], i);
    }

    return [];
}

// Exportar para pruebas
module.exports = { twoSum };