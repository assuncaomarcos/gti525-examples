const students = [
    { name: 'Éléonore', score: 85 },
    { name: 'Antoine', score: 70 },
    { name: 'Camille', score: 95 },
    { name: 'Léa', score: 60 }
];

const topStudents = students
    .filter(student => student.score >= 80)
    .map(student => student.name);

console.log(topStudents); // Affiche : ['Alice', 'Charlie']