import tf from '@tensorflow/tfjs-node';

console.log("Nombre de tenseurs au début :", tf.memory().numTensors);

let maintain;
tf.tidy(() => {
    maintain = tf.tensor([4, 5, 6]);
    const tensor2 = tf.tensor([4, 5, 6]);
    const tensor3 = tf.tensor([4, 5, 6]);
    const returned = tf.tensor([4, 5, 6]);

    console.log("Nombre de tenseurs dans le premier tidy :", tf.memory().numTensors);

    // Protéger un tenseur
    tf.keep(maintain);
});

console.log("Nombre de tenseurs après le premier tidy :", tf.memory().numTensors);

// Disposer des tenseurs manuellement
// Notez que vous ne pouvez pas disposer du tenseur `returned` ici, car tidy l'a déjà fait
maintain.dispose();

console.log("Nombre de tenseurs à la fin du premier tidy :", tf.memory().numTensors);

const result = tf.tidy(() => {
    const x = tf.tensor([1, 2, 3]);
    const y = tf.tensor([4, 5, 6]);

    console.log("Nombre de tenseurs dans le deuxième tidy :", tf.memory().numTensors);

    // Effectue quelques opérations dans tidy
    const sum = x.add(y);

    // La valeur renvoyée pas tidy sera affectée a result
    return sum.square();
});

console.log("Nombre de tenseurs à la fin du deuxième tidy :", tf.memory().numTensors);
result.print();
