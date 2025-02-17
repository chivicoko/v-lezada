import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTaskStore = defineStore('tasks', () => {
  const cart = ref(localStorage.getItem('cart') || []);
//   const [cart, setCart] = useState<Product2[]>([]);

//   // Load cart from localStorage when the component mounts
//   useEffect(() => {
//     const savedCart = localStorage.getItem('cart');
//     if (savedCart) {
//       setCart(JSON.parse(savedCart));
//     }
//   }, []);
  
  // Save cart to localStorage whenever the cart state changes, but only if it's not empty
  
//   useEffect(() => {
//     if (cart.value.length > 0) {
//       localStorage.setItem('cart', JSON.stringify(cart));
//     }
//   }, [cart]);  

  function addToCart(product: Product2) {
    const existingProduct = cart.value.find((item) => item.id === product.id);
    if (!existingProduct) {
      cart.value.push({ ...product, quantity: 1 });
    }
  };

  function removeFromCart(productId: string) {
    cart.value = cart.value.filter((item) => item.id !== productId);
  };

  function clearCart() {
    setCart([]);
  };

  const totalCount = cart.value.reduce((total, product) => total + (product.quantity || 1), 0);
  const totalCartCount = cart.value.length;

  function getProductQuantity(productId: string): number {
    const product = cart.value.find((item) => item.id === productId);
    return product ? product.quantity || 1 : 0;
  };
  

  function getTotalPrice() {
    const total = cart.value.reduce((sum, product) => {
      const price = parseFloat(product.price) * (product.quantity || 1);
      return sum + price;
    }, 0);
    return total.toFixed(2);
  };

  // Check if a product is in the cart
  function isProductInCart(productId: string): boolean {
    return cart.value.some((item) => item.id === productId);
  };

  // Increase the quantity of a product in the cart
  function increaseProductQuantity(productId: string) {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      )
    );
  };

  // Decrease the quantity of a product in the cart
  function decreaseProductQuantity(productId: string) {
    const product = cart.value.find((item) => item.id === productId);
  
    if (product && product.quantity === 1) {
      // Remove the product if the quantity is 1
      setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    } else {
      // Decrease the quantity if it's greater than 1
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === productId && item.quantity! > 1
            ? { ...item, quantity: item.quantity! - 1 }
            : item
        )
      );
    }
  };
  
  return {
    addToCart,
    removeFromCart,
    clearCart,
    getProductQuantity,
    getTotalPrice,
    isProductInCart,
    increaseProductQuantity,
    decreaseProductQuantity,
    totalCartCount,
    totalCount,
}

})
