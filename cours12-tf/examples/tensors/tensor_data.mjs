import tf from '@tensorflow/tfjs-node';

// Création de tenseurs avec différentes données
const tensor1 = tf.tensor([3, 4, 5]);
const tensor2 = tf.tensor([2.17128128]);
const tensor3 = tf.tensor([[3, 4, 5], [6, 7, 8]]);

console.log('Structure du premier tenseur :');
console.log(tensor1);

console.log('Éléments du premier tenseur :');
tensor1.print();

// Convertir des tenseurs en structures JavaScript
console.log('Un tableau JavaScript :', tensor3.arraySync());
console.log('Un tableau typé :', tensor3.dataSync());

tf.dispose([tensor1, tensor2, tensor3]);