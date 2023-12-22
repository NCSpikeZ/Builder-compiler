const greet = (name) => {
    console.log(`Bonjour, ${name} !`);
  };
  
  greet('Utilisateur');
  
  const numbers = [1, 2, 3, 4, 5];
  const sum = (...nums) => {
    return nums.reduce((acc, curr) => acc + curr, 0);
  };
  
  console.log('Somme des nombres :', sum(...numbers));
  
  const fruits = ['Apple', 'Banana', 'Orange'];
  console.log(fruits.includes('Banana') ? 'Oui' : 'Non');
  