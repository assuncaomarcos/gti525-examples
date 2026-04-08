import tf from '@tensorflow/tfjs-node';

const data = [1, 2, 3, 4, 5];

// Création d'un tenseur à partir d'un tableau
const firstTensor = tf.tensor(data);
const secondTensor = tf.tensor1d(data);

// Création d'un tenseur float32
const floatTensor = tf.tensor([1.2, 2.2, 3.3], null, 'float32');

console.log("Nombre de tenseurs en mémoire :", tf.memory().numTensors);

// Création d'un tenseur int32
const intTensor = tf.tensor([1, 2, 3], null, 'int32');

// Création d'un tenseur booléen
const boolTensor = tf.tensor([true, true, false]);

// Conversion de type de données
const castedTensor = intTensor.asType('float32');

console.log("Nombre de tenseurs avant nettoyage :", tf.memory().numTensors);

// Contrairement aux objets JS classiques, les tenseurs résident dans la mémoire
// native (C++/GPU) et ne sont pas vus par le Garbage Collector de V8.
// Oublier de les disposer créera une fuite de mémoire.
tf.dispose([
  firstTensor,
  secondTensor,
  floatTensor,
  intTensor,
  boolTensor,
  castedTensor
]);

console.log("Nombre de tenseurs après tf.dispose() :", tf.memory().numTensors);