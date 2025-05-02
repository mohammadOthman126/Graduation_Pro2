import React, { useState,useEffect } from 'react';
import './style/Home.css'; // التنسيق الخاص بالصفحة
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Home = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [budget, setBudget] = useState(1000);
  const [selectedContinent, setSelectedContinent] = useState('');
  const [days, setDays] = useState(7);
  const [suggestedDestinations, setSuggestedDestinations] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isBudgetLow, setIsBudgetLow] = useState(false);
  const [budgetChange, setBudgetChange] = useState(null); // لتخزين مقدار التغيير
  const [increaseCount, setIncreaseCount] = useState(0);  // عدد النقرات للزيادة
  const [decreaseCount, setDecreaseCount] = useState(0);  // عدد النقرات للنقصان
   
   const [countrySuggestions, setCountrySuggestions] = useState([]); // لتخزين البلدان من قاعدة البيانات



  const continents = [
    'Asia', 'Europe', 'Africa', 'North America', 'South America', 'Oceania'
  ];

 
  
  const categoryImages = {
    Adventures: 'adventure.jpg',
    Historical: 'historical.jpg',
    Relaxation: 'a.jpg',
    Culture: 'cultural.jpg',
    Nature: 'nature.jpg',
    Beach: 'beach.jpg',
    Mountains: 'mountain.jpg',
    Urban: 'nature.jpg',
    Wildlife: 'wildlife.jpg',
    Desert: 'desert.jpg',
    Island: 'island.jpg',
    'Road Trips': 'a.jpg',
    Luxury: 'city.jpg',
    Backpacking: 'wildlife.jpg',
  };

  useEffect(() => {
    // جلب البيانات من الخادم
    const fetchCountrySuggestions = async () => {
      try {
        const response = await fetch('http://localhost:5000/auth/countries'); 
        const data = await response.json();
        setCountrySuggestions(data); 
      
      } catch (error) {
        console.error('Error fetching country data:', error);
        
      }
    };
    fetchCountrySuggestions(); // استدعاء الدالة لجلب البيانات
  }, []);
  


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
    const newBudget = Number(event.target.value);
    const budgetDifference = newBudget - budget;
    setBudget(newBudget); // تحديث الميزانية

    setBudgetChange({
      amount: Math.abs(budgetDifference), // إظهار الفرق فقط كعدد إيجابي
      direction: budgetDifference > 0 ? 'increase' : 'decrease' // تحديد الاتجاه بناءً على الفرق
    });
  
    // Reset the counts
    setIncreaseCount(budgetDifference > 0 ? increaseCount + Math.floor(budgetDifference / 100) : 0);
    setDecreaseCount(budgetDifference < 0 ? decreaseCount + Math.floor(Math.abs(budgetDifference) / 100) : 0);

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
    const increaseAmount = 100;
    if(budget < 50000){
      setBudget(budget + increaseAmount);
      setIncreaseCount(increaseCount + 1); // زيادة عدد النقرات
    setBudgetChange({ amount: increaseAmount * (increaseCount + 1), direction: 'increase' }); 
    }
  };

  // تقليل الميزانية
  const handleDecrease = () => {
    const decreaseAmount = 100;
    if (budget > 100) {
      setBudget(budget - decreaseAmount);
      setDecreaseCount(decreaseCount + 1); // زيادة عدد النقرات
    setBudgetChange({ amount: decreaseAmount * (decreaseCount + 1), direction: 'decrease' });
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

  const handleAddToCart = async (destination) => {
    const token = localStorage.getItem('authToken'); // تحقق من وجود التوكن
    if (!token) {
      toast.error('يجب تسجيل الدخول لإضافة الوجهة إلى السلة!');
      return;
    }
  
    // تأكد من وجود جميع البيانات
    const { _id, name, averageCost, categories, continent } = destination;
  
    try {
      const response = await fetch('http://localhost:5000/auth/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ destinationId: _id, name, averageCost, categories, continent }), // إضافة البيانات المطلوبة
      });
  
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'فشل في الإضافة');
  
      toast.success('✅ تم إضافة الوجهة إلى السلة!');
    } catch (error) {
      toast.error(`❌ خطأ: ${error.message}`);
    }
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
    <label key={category} className={`category-card ${selectedCategories.includes(category) ? 'selected' : ''}`}>
      <input
        type="checkbox"
        className="hidden-checkbox"
        checked={selectedCategories.includes(category)}
        onChange={() => handleCategoryChange(category)}
      />
      <div class="checkmark">✔</div>
      <div
        className="card-content"
        style={{
          backgroundImage: `url(/images/${categoryImages[category]})`,
        }}
      >
        <span className="category-name">{category}</span>
      </div>
    </label>
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
          {/* عرض التغيير بجانب الميزانية */}
  {budgetChange && (
    <p className={`budget-change ${budgetChange.direction}`}>
      {budgetChange.direction === 'increase' ? '▲' : '▼'} ${budgetChange.amount}
      {budgetChange.direction === 'increase' ? ' increase' : ' decrease'}
    </p>
  )}
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
               <div className="suggestion-header">
            <div className="suggestion-number">{index + 1}</div>
            <button
          className="add-to-cart-btn"
          onClick={() => handleAddToCart(destination)}
          title="Add to cart"
            >
                      ❤️
            </button>
            </div>
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

<ToastContainer />


    </div>
  );
};

export default Home;
