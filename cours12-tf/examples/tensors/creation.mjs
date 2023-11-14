import tf from '@tensorflow/tfjs-node';

const data = [1, 2, 3, 4, 5];

// Création d'un tenseur à partir d'un tableau
const firstTensor = tf.tensor(data);
const secondTensor = tf.tensor1d(data);

// Création d'un tenseur float32
const floatTensor = tf.tensor([1.2, 2.2, 3.3], null, 'float32');

console.log("Nombre de tenseurs:", tf.memory().numTensors);

// Création d'un tenseur int32
const intTensor = tf.tensor([1, 2, 3], null, 'int32');

// Création d'un tenseur booléen
const boolTensor = tf.tensor([true, true, false]);

// Conversion de type de données
const newIntTensor = floatTensor.asType('int32');

console.log("Nombre de tenseurs:", tf.memory().numTensors);

// Contrairement aux tableaux et autres variables JavaScript, les tenseurs
// ne sont pas récupérés par le garbage collector de l'engin JavaScript.
// On doit disposer des tenseurs manuellement.

tf.dispose([firstTensor, secondTensor]);
tf.dispose([floatTensor, intTensor, boolTensor, newIntTensor]);

console.log("Nombre de tenseurs:", tf.memory().numTensors);