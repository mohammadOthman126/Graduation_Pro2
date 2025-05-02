const Cart = require('../models/cartModel');

// إضافة وجهة إلى السلة
exports.addToCart = async (req, res) => {
  const { destinationId, name, averageCost, categories, continent } = req.body;
  const userId = req.user.id;

  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, destinations: [] });
    }

    // تحقق من وجود الوجهة مسبقاً
    const exists = cart.destinations.some(dest => dest.destinationId === destinationId);
    if (exists) return res.status(400).json({ message: "Destination already in cart" });

    cart.destinations.push({ destinationId, name, averageCost, categories, continent });
    await cart.save();

    res.status(200).json({ message: "Destination added to cart", cart });
  } catch (err) {
    res.status(500).json({ message: "Error adding to cart", error: err.message });
  }
};

// جلب السلة للمستخدم
exports.getCart = async (req, res) => {
  const userId = req.user.id;
  try {
    const cart = await Cart.findOne({ userId }) || { destinations: [] };
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: "Error fetching cart", error: err.message });
  }
};

// حذف وجهة من السلة
exports.removeFromCart = async (req, res) => {
  const userId = req.user.id;
  const { destinationId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.destinations = cart.destinations.filter(dest => dest.destinationId !== destinationId);
    await cart.save();

    res.status(200).json({ message: "Destination removed from cart", cart });
  } catch (err) {
    res.status(500).json({ message: "Error removing from cart", error: err.message });
  }
};
