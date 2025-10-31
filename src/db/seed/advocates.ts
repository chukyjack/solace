const specialties = [
  "Bipolar",
  "LGBTQ",
  "Medication/Prescribing",
  "Suicide History/Attempts",
  "General Mental Health (anxiety, depression, stress, grief, life transitions)",
  "Men's issues",
  "Relationship Issues (family, friends, couple, etc)",
  "Trauma & PTSD",
  "Personality disorders",
  "Personal growth",
  "Substance use/abuse",
  "Pediatrics",
  "Women's issues (post-partum, infertility, family planning)",
  "Chronic pain",
  "Weight loss & nutrition",
  "Eating disorders",
  "Diabetic Diet and nutrition",
  "Coaching (leadership, career, academic and wellness)",
  "Life coaching",
  "Obsessive-compulsive disorders",
  "Neuropsychological evaluations & testing (ADHD testing)",
  "Attention and Hyperactivity (ADHD)",
  "Sleep issues",
  "Schizophrenia and psychotic disorders",
  "Learning disorders",
  "Domestic abuse",
];

const firstNames = [
  "John", "Jane", "Alice", "Michael", "Emily", "Chris", "Jessica", "David",
  "Laura", "Daniel", "Sarah", "James", "Megan", "Joshua", "Amanda", "Robert",
  "Jennifer", "William", "Lisa", "Richard", "Michelle", "Joseph", "Kimberly",
  "Thomas", "Angela", "Charles", "Ashley", "Christopher", "Brenda", "Matthew",
  "Emma", "Anthony", "Olivia", "Mark", "Cynthia", "Donald", "Marie", "Steven",
  "Janet", "Andrew", "Catherine", "Kenneth", "Frances", "Joshua", "Christine",
  "Kevin", "Samantha", "Brian", "Deborah", "George", "Rachel", "Edward", "Carolyn",
  "Ronald", "Janet", "Timothy", "Virginia", "Jason", "Maria", "Jeffrey", "Heather",
  "Ryan", "Diane", "Jacob", "Julie", "Gary", "Joyce", "Nicholas", "Victoria",
  "Eric", "Kelly", "Jonathan", "Christina", "Stephen", "Joan", "Larry", "Evelyn",
  "Justin", "Judith", "Scott", "Megan", "Brandon", "Cheryl", "Benjamin", "Andrea",
  "Samuel", "Hannah", "Frank", "Jacqueline", "Gregory", "Martha", "Raymond", "Gloria",
  "Alexander", "Teresa", "Patrick", "Sara", "Jack", "Janice", "Dennis", "Marie",
  "Jerry", "Julia", "Tyler", "Grace", "Aaron", "Judy", "Jose", "Theresa",
];

const lastNames = [
  "Doe", "Smith", "Johnson", "Brown", "Davis", "Martinez", "Taylor", "Harris",
  "Clark", "Lewis", "Lee", "King", "Green", "Walker", "Hall", "Allen",
  "Young", "Hernandez", "King", "Wright", "Lopez", "Hill", "Scott", "Adams",
  "Baker", "Gonzalez", "Nelson", "Carter", "Mitchell", "Perez", "Roberts", "Turner",
  "Phillips", "Campbell", "Parker", "Evans", "Edwards", "Collins", "Stewart", "Sanchez",
  "Morris", "Rogers", "Reed", "Cook", "Morgan", "Bell", "Murphy", "Bailey",
  "Rivera", "Cooper", "Richardson", "Cox", "Howard", "Ward", "Torres", "Peterson",
  "Gray", "Ramirez", "James", "Watson", "Brooks", "Kelly", "Sanders", "Price",
  "Bennett", "Wood", "Barnes", "Ross", "Henderson", "Coleman", "Jenkins", "Perry",
  "Powell", "Long", "Patterson", "Hughes", "Flores", "Washington", "Butler", "Simmons",
  "Foster", "Gonzales", "Bryant", "Alexander", "Russell", "Griffin", "Diaz", "Hayes",
];

const cities = [
  "New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia",
  "San Antonio", "San Diego", "Dallas", "San Jose", "Austin", "Jacksonville",
  "San Francisco", "Columbus", "Fort Worth", "Charlotte", "Seattle", "Denver",
  "Washington", "Boston", "El Paso", "Nashville", "Detroit", "Oklahoma City",
  "Portland", "Las Vegas", "Memphis", "Louisville", "Baltimore", "Milwaukee",
  "Albuquerque", "Tucson", "Fresno", "Sacramento", "Kansas City", "Mesa",
  "Atlanta", "Omaha", "Colorado Springs", "Raleigh", "Miami", "Long Beach",
  "Virginia Beach", "Oakland", "Minneapolis", "Tulsa", "Arlington", "Tampa",
];

const degrees = ["MD", "PhD", "MSW"];

// Generate random specialties (2-5 specialties per advocate)
const getRandomSpecialties = () => {
  const numSpecialties = Math.floor(Math.random() * 4) + 2; // 2-5 specialties
  const shuffled = [...specialties].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numSpecialties);
};

// Generate random phone number
const getRandomPhoneNumber = () => {
  const areaCode = Math.floor(Math.random() * 900) + 100; // 100-999
  const exchange = Math.floor(Math.random() * 900) + 100; // 100-999
  const number = Math.floor(Math.random() * 10000); // 0-9999
  return parseInt(`${areaCode}${exchange}${number.toString().padStart(4, '0')}`);
};

// Generate advocates
const generateAdvocates = (count: number) => {
  const advocates = [];
  const usedNames = new Set<string>();

  for (let i = 0; i < count; i++) {
    let firstName: string;
    let lastName: string;
    let fullName: string;

    // Ensure unique names
    do {
      firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      fullName = `${firstName} ${lastName}`;
    } while (usedNames.has(fullName) && usedNames.size < firstNames.length * lastNames.length);

    usedNames.add(fullName);

    advocates.push({
      firstName,
      lastName,
      city: cities[Math.floor(Math.random() * cities.length)],
      degree: degrees[Math.floor(Math.random() * degrees.length)],
      specialties: getRandomSpecialties(),
      yearsOfExperience: Math.floor(Math.random() * 20) + 1, // 1-20 years
      phoneNumber: getRandomPhoneNumber(),
    });
  }

  return advocates;
};

// Generate 150 advocates to test pagination (6 pages with 25 per page)
const advocateData = generateAdvocates(150);

export { advocateData };
