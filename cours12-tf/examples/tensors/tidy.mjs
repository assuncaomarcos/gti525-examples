import tf from '@tensorflow/tfjs-node';

console.log("Nombre de tenseurs au départ :", tf.memory().numTensors);

let maintain;

tf.tidy(() => {
    maintain = tf.tensor([4, 5, 6]);
    const tensor2 = tf.tensor([4, 5, 6]);
    const tensor3 = tf.tensor([4, 5, 6]);
    const temporary = tf.tensor([4, 5, 6]);

    console.log("Tenseurs actifs dans le bloc :", tf.memory().numTensors);

    // tf.keep() permet d'extraire un tenseur du cycle de nettoyage
    tf.keep(maintain);
});

console.log("Tenseurs après le premier tidy :", tf.memory().numTensors);

// Libération manuelle du tenseur protégé
maintain.dispose();
console.log("Tenseurs après dispose() manuel :", tf.memory().numTensors);

const result = tf.tidy(() => {
    const x = tf.tensor([1, 2, 3]);
    const y = tf.tensor([4, 5, 6]);

    console.log("Nombre de tenseurs dans le deuxième tidy :", tf.memory().numTensors);

    // Effectue quelques opérations dans tidy
    const sum = x.add(y);

    // La valeur renvoyée pas tidy sera affectée a result
    return sum.square();
});

console.log("Tenseurs après calcul (seul le résultat reste) :", tf.memory().numTensors);
result.print();