import React, { useState } from 'react';
import './style/Home.css'; // التنسيق الخاص بالصفحة

const Home = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [budget, setBudget] = useState(1000);
  const [selectedContinent, setSelectedContinent] = useState('');
  const [days, setDays] = useState(7);
  const [suggestedDestinations, setSuggestedDestinations] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isBudgetLow, setIsBudgetLow] = useState(false);


  const continents = [
    'Asia', 'Europe', 'Africa', 'North America', 'South America', 'Oceania'
  ];

  const countrySuggestions = [
    { name: "Thailand", continent: "Asia", categories: ["Adventures", "Beach", "Nature"], averageCost: 50 },
    { name: "Italy", continent: "Europe", categories: ["Historical", "Culture", "Relaxation"], averageCost: 120 },
    { name: "Egypt", continent: "Africa", categories: ["Historical", "Culture", "Nature"], averageCost: 40 },
    { name: "United States", continent: "North America", categories: ["Adventures", "Urban", "Luxury"], averageCost: 200 },
    { name: "Brazil", continent: "South America", categories: ["Nature", "Beach", "Adventures"], averageCost: 70 },
    { name: "Australia", continent: "Australia", categories: ["Adventures", "Nature", "Luxury"], averageCost: 150 },
    { name: "India", continent: "Asia", categories: ["Historical", "Nature", "Culture"], averageCost: 30 },
    { name: "Spain", continent: "Europe", categories: ["Culture", "Relaxation", "Beach"], averageCost: 90 },
    { name: "South Africa", continent: "Africa", categories: ["Wildlife", "Nature", "Adventures"], averageCost: 80 },
    { name: "Canada", continent: "North America", categories: ["Nature", "Adventures", "Urban"], averageCost: 120 },
    { name: "Argentina", continent: "South America", categories: ["Nature", "Adventures", "Culture"], averageCost: 60 },
    { name: "Japan", continent: "Asia", categories: ["Urban", "Culture", "Luxury"], averageCost: 150 },
    { name: "France", continent: "Europe", categories: ["Culture", "Historical", "Luxury"], averageCost: 140 },
    { name: "Kenya", continent: "Africa", categories: ["Wildlife", "Nature", "Adventures"], averageCost: 70 },
    { name: "Mexico", continent: "North America", categories: ["Beach", "Culture", "Nature"], averageCost: 60 },
    { name: "Chile", continent: "South America", categories: ["Nature", "Adventures", "Relaxation"], averageCost: 90 },
    { name: "New Zealand", continent: "Australia", categories: ["Nature", "Adventures"], averageCost: 130 },
    { name: "United Kingdom", continent: "Europe", categories: ["Culture", "Historical"], averageCost: 130 },
    { name: "Morocco", continent: "Africa", categories: ["Culture", "Desert", "Historical"], averageCost: 60 },
    { name: "Vietnam", continent: "Asia", categories: ["Cultural", "Nature", "Beach"], averageCost: 40 },
    { name: "Costa Rica", continent: "North America", categories: ["Nature", "Adventures", "Beach"], averageCost: 80 },
    { name: "Turkey", continent: "Europe", categories: ["Historical", "Culture", "Relaxation"], averageCost: 90 },
    { name: "Greece", continent: "Europe", categories: ["Beach", "Culture", "Relaxation"], averageCost: 100 },
    { name: "Indonesia", continent: "Asia", categories: ["Nature", "Beach", "Adventures"], averageCost: 50 },
    { name: "Colombia", continent: "South America", categories: ["Beach", "Culture", "Nature"], averageCost: 50 },
    { name: "Germany", continent: "Europe", categories: ["Culture", "Urban", "Historical"], averageCost: 130 },
    { name: "Peru", continent: "South America", categories: ["Historical", "Nature", "Adventures"], averageCost: 60 },
    { name: "Russia", continent: "Europe", categories: ["Culture", "Historical"], averageCost: 70 },
    { name: "South Korea", continent: "Asia", categories: ["Urban", "Technology", "Culture"], averageCost: 120 },
    { name: "Singapore", continent: "Asia", categories: ["Urban", "Luxury"], averageCost: 200 },
    { name: "Switzerland", continent: "Europe", categories: ["Nature", "Luxury"], averageCost: 250 },
    { name: "Portugal", continent: "Europe", categories: ["Beach", "Culture", "Relaxation"], averageCost: 100 },
    { name: "Finland", continent: "Europe", categories: ["Nature", "Luxury"], averageCost: 180 },
    { name: "Norway", continent: "Europe", categories: ["Nature", "Luxury"], averageCost: 250 },
    { name: "Iceland", continent: "Europe", categories: ["Nature", "Adventures"], averageCost: 200 },
    { name: "Malaysia", continent: "Asia", categories: ["Nature", "Urban", "Beach"], averageCost: 70 },
    { name: "Sweden", continent: "Europe", categories: ["Nature", "Luxury"], averageCost: 200 },
    { name: "Belgium", continent: "Europe", categories: ["Culture", "Urban", "Historical"], averageCost: 120 },
    { name: "Ecuador", continent: "South America", categories: ["Nature", "Beach", "Culture"], averageCost: 60 },
    { name: "Serbia", continent: "Europe", categories: ["Culture", "Historical"], averageCost: 70 },
    { name: "Taiwan", continent: "Asia", categories: ["Technology", "Culture", "Urban"], averageCost: 100 },
    { name: "Uganda", continent: "Africa", categories: ["Nature", "Wildlife", "Adventures"], averageCost: 50 },
    { name: "Poland", continent: "Europe", categories: ["Culture", "Historical"], averageCost: 80 },
    { name: "United Arab Emirates", continent: "Asia", categories: ["Luxury", "Urban", "Culture"], averageCost: 250 },
    { name: "Honduras", continent: "North America", categories: ["Nature", "Beach", "Culture"], averageCost: 60 },
    { name: "Romania", continent: "Europe", categories: ["Nature", "Historical", "Cultural"], averageCost: 70 },
    { name: "Hungary", continent: "Europe", categories: ["Cultural", "Relaxation"], averageCost: 90 },
    { name: "Croatia", continent: "Europe", categories: ["Beach", "Nature", "Culture"], averageCost: 120 },
    { name: "Czech Republic", continent: "Europe", categories: ["Historical", "Urban"], averageCost: 80 },
    { name: "Latvia", continent: "Europe", categories: ["Nature", "Historical"], averageCost: 75 },
    { name: "Estonia", continent: "Europe", categories: ["Nature", "Historical"], averageCost: 80 },
    { name: "Slovenia", continent: "Europe", categories: ["Nature", "Adventures"], averageCost: 100 },
    { name: "Slovakia", continent: "Europe", categories: ["Nature", "Historical"], averageCost: 90 },
    { name: "Bulgaria", continent: "Europe", categories: ["Nature", "Historical", "Culture"], averageCost: 60 },
    { name: "Albania", continent: "Europe", categories: ["Nature", "Beach", "Culture"], averageCost: 50 },
    { name: "North Macedonia", continent: "Europe", categories: ["Historical", "Cultural"], averageCost: 55 },
    { name: "Bosnia and Herzegovina", continent: "Europe", categories: ["Historical", "Culture"], averageCost: 55 },
    { name: "Montenegro", continent: "Europe", categories: ["Beach", "Nature"], averageCost: 70 },
    { name: "Kosovo", continent: "Europe", categories: ["Culture", "Historical"], averageCost: 50 },
    { name: "Liechtenstein", continent: "Europe", categories: ["Luxury", "Nature"], averageCost: 300 },
    { name: "San Marino", continent: "Europe", categories: ["Historical", "Culture"], averageCost: 150 },
    { name: "Malta", continent: "Europe", categories: ["Beach", "Historical", "Culture"], averageCost: 110 },
    { name: "Andorra", continent: "Europe", categories: ["Nature", "Luxury"], averageCost: 200 },
    { name: "Monaco", continent: "Europe", categories: ["Luxury", "Beach"], averageCost: 500 }
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
    setBudget(Number(event.target.value)); 
  };

  // التعامل مع تغيير القارة
  const handleContinentChange = (event) => {
    setSelectedContinent(event.target.value);
  };

  // التعامل مع تغيير عدد الأيام
  const handleDaysChange = (event) => {
    setDays(event.target.value);
  };

  // زيادة الميزانية
  const handleIncrease = () => {
    if(budget < 50000)
      setBudget(budget + 100);
  };

  // تقليل الميزانية
  const handleDecrease = () => {
    if (budget > 100) {
      setBudget(budget - 100);
    }
  };

  // فلترة البلدان المقترحة بناءً على الفئات والميزانية والقارة وعدد الأيام
  const filterDestinations = () => {
    setSuggestedDestinations([]);
    setIsBudgetLow(false);
    const filteredDestinations = countrySuggestions.filter((country) => {
      const isCategoryMatch = selectedCategories.some((category) =>
        country.categories.includes(category)
      );
      const isContinentMatch = selectedContinent ? country.continent === selectedContinent : true;
      const totalCost = country.averageCost * days;
      const isBudgetMatch = totalCost <= budget;

      if (isCategoryMatch && isContinentMatch && !isBudgetMatch) {
        setIsBudgetLow(true); // تعيين الحالة إذا كانت الميزانية غير كافية
      }

      return isCategoryMatch && isContinentMatch && isBudgetMatch;
    });

    setSuggestedDestinations(filteredDestinations);
  };

  // إرسال البيانات
  const handleSubmit = () => {
    setHasSearched(true);
    setSuggestedDestinations([]);
    filterDestinations();
  };

  return (
    <div className="home">
      <header className="header">
        <h1>Welcome to JetSetGo</h1>
        <p>Explore the best travel suggestions tailored to your preferences.</p>
      </header>

      <div className='filters-grid'>

      <section className="category-selection">
      <div className="top-row">
      <section className="continent-selection">
        <h2>Select Continent</h2>
        <select onChange={handleContinentChange} value={selectedContinent}>
          <option value="">Any Continent</option>
          {continents.map((continent) => (
            <option key={continent} value={continent}>
              {continent}
            </option>
          ))}
        </select>
      </section>

      <section className="days-selection">
        <h2>Number of Days</h2>
        <input
          type="number"
          min="1"
          max="365"
          value={days}
          onChange={handleDaysChange}
        />
        <p>Days: {days}</p>
      </section> </div>


        <h2>Select Categories</h2>
        <div className="categories">
          {[
            'Adventures', 'Historical', 'Relaxation', 'Culture', 'Nature', 'Beach',
            'Mountains', 'Urban', 'Wildlife', 'Desert', 'Island', 'Road Trips', 'Luxury', 'Backpacking',
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
      </div>
      
      <section className="budget-selection">
        <h2>Select Your Budget</h2>
        <div className="range-container">
          <button className="adjust-buttons" onClick={handleDecrease}>-</button>
          <input
            type="range"
            min="100"
            max="50000"
            value={budget}
            onChange={handleBudgetChange}
            step="100"
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
      {suggestedDestinations.map((destination, index) => {
        const totalCost = destination.averageCost * days;
        const isOverBudget = totalCost > budget;

        return (
          <div key={destination.name} className="suggestion-item">
            <div className="suggestion-number">{index + 1}</div>
            <div className="suggestion-details">
              <h3>{destination.name}</h3>
              <p>Categories: {destination.categories.join(', ')}</p>
              <p>Average Cost: ${destination.averageCost}</p>
              <p>Total Cost for {days} days: ${totalCost}</p>
              {isOverBudget && (
                <p className="budget-warning">
                  ⚠️ The total cost exceeds budget!
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  ) : hasSearched ? ( // تظهر الرسالة المحبطة إذا كان المستخدم قد بدأ البحث
    isBudgetLow ? ( // إذا كانت الميزانية هي المشكلة، تظهر هذه الرسالة
      <div className="no-results">
        <p className="budget-low-message">
          😟 There are destinations that match your criteria, but your budget is too low. Try adjusting your budget or filters!
        </p>
      </div>
    ) : (
      <div className="no-results">
        <p className="no-results-message">
          Unfortunately, no destinations match your search. Try adjusting your filters for more options.
        </p>
      </div>
    )
  ) : ( // تظهر الرسالة التحفيزية إذا لم يبدأ المستخدم البحث بعد
    <div className="no-results">
      <p className="motivational-text">
      🌍 Ready to explore the world? Use the filters to start your journey and find the perfect destination for you!
      </p>
    </div>
  )}
</section>



    </div>
  );
};

export default Home;
