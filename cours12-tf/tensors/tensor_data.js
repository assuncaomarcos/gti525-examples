const tf = require('@tensorflow/tfjs-node');

const tensor1 = tf.tensor([3, 4, 5]);
const tensor2 = tf.tensor([2.17128128]);
const tensor3 = tf.tensor([[3, 4, 5], [6, 7, 8]]);

// Cela va afficher la structure du tenseur
console.log(tensor1);

// Cela va imprimer les eléments du tenseur
tensor1.print();

// De tenseur vers JavaScript
console.log('Un tableau JavaScript:', tensor3.arraySync());
console.log('Un tableau typé:', tensor3.dataSync());

tf.dispose([tensor1, tensor2, tensor3]);