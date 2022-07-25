const tf = require('@tensorflow/tfjs-node');

console.log("Nombre de tenseurs au debut:", tf.memory().numTensors);

tf.tidy(() => {
    maintain = tf.tensor([4, 5, 6]);
    tensor2 = tf.tensor([4, 5, 6]);
    tensor3 = tf.tensor([4, 5, 6]);
    returned = tf.tensor([4, 5, 6]);

    console.log("Nombre de tenseurs dans tidy:", tf.memory().numTensors);

    // proteger un tenseur
    tf.keep(maintain);

    return returned;
});

console.log("Nombre de tenseurs après tidy:", tf.memory().numTensors);

// Disposer des tenseurs manuellement
maintain.dispose();
returned.dispose();

console.log("Nombre de tenseurs à la fin:", tf.memory().numTensors);