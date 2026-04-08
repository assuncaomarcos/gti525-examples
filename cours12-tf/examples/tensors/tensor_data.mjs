import tf from '@tensorflow/tfjs-node';

// Création de tenseurs avec différentes données
const tensor1 = tf.tensor([3, 4, 5]);
const tensor2 = tf.tensor([2.17128128]);
const tensor3 = tf.tensor([[3, 4, 5], [6, 7, 8]]);

console.log('Structure du premier tenseur :');
console.log(tensor1);

console.log('Éléments du premier tenseur :');
tensor1.print()

// Conversion vers JavaScript
const jsArray = await tensor3.array(); // Retourne un tableau standard
const typedArray = await tensor3.data(); // Retourne un Float32Array (Plus rapide)

console.log('Tableau JavaScript classique :', jsArray);
console.log('Tableau typé (TypedArray) :', typedArray);

tf.dispose([tensor1, tensor2, tensor3]);