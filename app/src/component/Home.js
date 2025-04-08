import React, { useState } from 'react';
import './style/Home.css';
 

const Home = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [budget, setBudget] = useState(1000);
  const [suggestedDestinations, setSuggestedDestinations] = useState([]);

  const countrySuggestions = [
    { name: "Thailand", categories: ["Adventures", "Beach", "Nature"], averageCost: 1200 },
    { name: "Italy", categories: ["Historical", "Culture", "Relaxation"], averageCost: 2000 },
    { name: "Egypt", categories: ["Historical", "Culture", "Nature"], averageCost: 800 },
    { name: "Australia", categories: ["Adventures", "Beach", "Nature"], averageCost: 2500 },
    { name: "Switzerland", categories: ["Nature", "Luxury"], averageCost: 3500 },
    { name: "Morocco", categories: ["Culture", "Desert", "Historical"], averageCost: 1000 },
    { name: "Japan", categories: ["Urban", "Culture", "Luxury"], averageCost: 3000 },
    { name: "Mexico", categories: ["Beach", "Historical", "Nature"], averageCost: 1200 },
    { name: "France", categories: ["Culture", "Historical", "Luxury"], averageCost: 2500 },
    { name: "Spain", categories: ["Culture", "Relaxation", "Beach"], averageCost: 1800 },
    { name: "United States", categories: ["Adventures", "Urban", "Luxury"], averageCost: 3500 },
    { name: "Brazil", categories: ["Adventures", "Nature", "Beach"], averageCost: 1500 },
    { name: "South Africa", categories: ["Wildlife", "Adventures", "Nature"], averageCost: 1600 },
    { name: "New Zealand", categories: ["Adventures", "Nature"], averageCost: 2200 },
    { name: "Canada", categories: ["Nature", "Adventures"], averageCost: 2500 },
    { name: "United Kingdom", categories: ["Culture", "Historical"], averageCost: 2400 },
    { name: "Russia", categories: ["Historical", "Culture"], averageCost: 1800 },
    { name: "Turkey", categories: ["Historical", "Culture", "Relaxation"], averageCost: 1200 },
    { name: "Greece", categories: ["Historical", "Culture", "Beach"], averageCost: 1500 },
    { name: "India", categories: ["Cultural", "Historical", "Nature"], averageCost: 700 },
    { name: "Vietnam", categories: ["Cultural", "Nature", "Beach"], averageCost: 800 },
    { name: "Indonesia", categories: ["Beach", "Nature", "Adventures"], averageCost: 1000 },
    { name: "Portugal", categories: ["Beach", "Historical", "Culture"], averageCost: 1500 },
    { name: "South Korea", categories: ["Urban", "Culture", "Technology"], averageCost: 2300 },
    { name: "Singapore", categories: ["Urban", "Luxury"], averageCost: 3500 },
    { name: "Argentina", categories: ["Adventures", "Nature", "Beach"], averageCost: 1800 },
    { name: "Peru", categories: ["Historical", "Nature"], averageCost: 1300 },
    { name: "Chile", categories: ["Nature", "Adventures"], averageCost: 1600 },
    { name: "Thailand", categories: ["Adventures", "Beach", "Nature"], averageCost: 1200 },
    { name: "Sri Lanka", categories: ["Beach", "Nature", "Cultural"], averageCost: 1000 },
    { name: "Egypt", categories: ["Culture", "Desert", "Historical"], averageCost: 900 },
    { name: "Kenya", categories: ["Wildlife", "Nature", "Adventures"], averageCost: 1500 },
    { name: "Jordan", categories: ["Historical", "Desert", "Cultural"], averageCost: 1400 },
    { name: "Vietnam", categories: ["Nature", "Historical", "Relaxation"], averageCost: 700 },
    { name: "Cambodia", categories: ["Historical", "Culture", "Nature"], averageCost: 900 },
    { name: "Malaysia", categories: ["Beach", "Nature", "Urban"], averageCost: 1200 },
    { name: "Chile", categories: ["Adventures", "Nature"], averageCost: 1700 },
    { name: "Nepal", categories: ["Adventures", "Nature"], averageCost: 1000 },
    { name: "Sweden", categories: ["Nature", "Luxury"], averageCost: 3000 },
    { name: "Denmark", categories: ["Urban", "Luxury"], averageCost: 2500 },
    { name: "Finland", categories: ["Nature", "Luxury"], averageCost: 2800 },
    { name: "Norway", categories: ["Nature", "Adventures"], averageCost: 3200 },
    { name: "Belgium", categories: ["Culture", "Historical", "Urban"], averageCost: 2200 },
    { name: "Netherlands", categories: ["Urban", "Culture", "Luxury"], averageCost: 2300 },
    { name: "Switzerland", categories: ["Nature", "Luxury"], averageCost: 3500 },
    { name: "Poland", categories: ["Culture", "Historical"], averageCost: 1300 },
    { name: "Finland", categories: ["Nature", "Luxury"], averageCost: 2900 },
    { name: "Austria", categories: ["Culture", "Historical", "Luxury"], averageCost: 2800 },
    { name: "New Zealand", categories: ["Nature", "Adventures"], averageCost: 2200 },
    { name: "Ireland", categories: ["Culture", "Historical", "Nature"], averageCost: 2000 },
    { name: "Iceland", categories: ["Nature", "Adventures"], averageCost: 3000 },
    { name: "Malta", categories: ["Historical", "Culture", "Relaxation"], averageCost: 1800 },
    { name: "Estonia", categories: ["Culture", "Nature"], averageCost: 1400 },
    { name: "Latvia", categories: ["Nature", "Culture"], averageCost: 1500 },
    { name: "Lithuania", categories: ["Nature", "Historical"], averageCost: 1300 },
    { name: "Ukraine", categories: ["Historical", "Culture"], averageCost: 1200 },
    { name: "Romania", categories: ["Culture", "Historical"], averageCost: 1300 },
    { name: "Hungary", categories: ["Culture", "Historical", "Urban"], averageCost: 1400 },
    { name: "Slovakia", categories: ["Nature", "Culture"], averageCost: 1200 },
    { name: "Czech Republic", categories: ["Historical", "Culture"], averageCost: 1300 },
    { name: "Croatia", categories: ["Culture", "Historical", "Beach"], averageCost: 1600 },
    { name: "Slovenia", categories: ["Nature", "Culture"], averageCost: 1500 },
    { name: "Bulgaria", categories: ["Culture", "Historical"], averageCost: 1200 },
    { name: "Serbia", categories: ["Culture", "Historical"], averageCost: 1200 },
    { name: "Bosnia and Herzegovina", categories: ["Culture", "Historical"], averageCost: 1000 },
    { name: "Albania", categories: ["Culture", "Nature"], averageCost: 1000 },
    { name: "Kosovo", categories: ["Culture", "Historical"], averageCost: 900 },
    { name: "Macedonia", categories: ["Culture", "Nature"], averageCost: 1200 },
    { name: "Montenegro", categories: ["Beach", "Nature"], averageCost: 1500 },
    { name: "Georgia", categories: ["Culture", "Nature"], averageCost: 1300 },
    { name: "Armenia", categories: ["Culture", "Nature"], averageCost: 1100 },
    { name: "Azerbaijan", categories: ["Culture", "Nature"], averageCost: 1200 },
    { name: "Turkey", categories: ["Culture", "Historical", "Beach"], averageCost: 1300 },
    { name: "Kuwait", categories: ["Urban", "Culture"], averageCost: 2000 },
    { name: "Qatar", categories: ["Urban", "Luxury"], averageCost: 3000 },
    { name: "UAE", categories: ["Urban", "Luxury"], averageCost: 3500 },
    { name: "Saudi Arabia", categories: ["Historical", "Cultural"], averageCost: 2000 },
    { name: "Bahrain", categories: ["Urban", "Luxury"], averageCost: 2500 },
    { name: "Oman", categories: ["Beach", "Culture", "Nature"], averageCost: 1500 },
    { name: "Jordan", categories: ["Historical", "Desert"], averageCost: 1300 },
    { name: "Lebanon", categories: ["Culture", "Beach", "Nature"], averageCost: 1800 },
    { name: "Syria", categories: ["Historical", "Cultural"], averageCost: 1000 },
    { name: "Yemen", categories: ["Historical", "Culture"], averageCost: 800 },
    { name: "Iraq", categories: ["Historical", "Cultural"], averageCost: 700 }
  ];
  

  // التعامل مع تغيير الفئات
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((item) => item !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  // التعامل مع تغيير الميزانية
  const handleBudgetChange = (event) => {
    setBudget(event.target.value);
  };

  // زيادة الميزانية
  const handleIncrease = () => {
    if(budget < 5000)
      setBudget(budget + 50);
  };

  // تقليل الميزانية
  const handleDecrease = () => {
    if (budget > 100) {
      setBudget(budget - 50);
    }
  };

  // فلترة البلدان المقترحة
  const filterDestinations = () => {
    const filteredDestinations = countrySuggestions.filter((country) => {
      const isCategoryMatch = selectedCategories.some((category) =>
        country.categories.includes(category)
      );
      const isBudgetMatch = country.averageCost <= budget;
      return isCategoryMatch && isBudgetMatch;
    });

    setSuggestedDestinations(filteredDestinations);
  };

  // إرسال البيانات
  const handleSubmit = () => {
    filterDestinations();
  };

  return (
    <div className="home">
      
      <header className="header">
        <h1>Welcome to JetSetGo</h1>
        <p>Explore the best travel suggestions tailored to your preferences.</p>
      </header>

      <section className="category-selection">
        <h2>Select Categories</h2>
        <div className="categories">
          {[
            'Adventures',
            'Historical',
            'Relaxation',
            'Culture',
            'Nature',
            'Beach',
            'Mountains',
            'Urban',
            'Wildlife',
            'Desert',
            'Island',
            'Road Trips',
            'Luxury',
            'Backpacking',
          ].map((category) => (
            <button
              key={category}
              className={`category-btn ${selectedCategories.includes(category) ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className="budget-selection">
        <h2>Select Your Budget</h2>
        <div className="range-container">
          <button className="adjust-buttons" onClick={handleDecrease}>-</button>
          <input
            type="range"
            min="100"
            max="5000"
            value={budget}
            onChange={handleBudgetChange}
            step="50"
          />
          <button className="adjust-buttons" onClick={handleIncrease}>+</button>
        </div>
        <p>Budget: ${budget}</p>
      </section>

      <button onClick={handleSubmit} className="suggestions-btn">
        Get Travel Suggestions
      </button>

      <section className="suggestions">
        {suggestedDestinations.length > 0 ? (
          <div className="suggestions-list">
            {suggestedDestinations.map((destination, index) => (
              <div key={destination.name} className="suggestion-item">
                <div className="suggestion-number">{index + 1}</div>
                <div className="suggestion-details">
                  <h3>{destination.name}</h3>
                  <p>Categories: {destination.categories.join(', ')}</p>
                  <p>Average Cost: ${destination.averageCost}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No destinations match your criteria.</p>
        )}
      </section>
    </div>
  );
};

export default Home;

