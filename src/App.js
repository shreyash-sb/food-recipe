import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import ScrollToTop from "./components/scroll-to-top";
import Home from "./pages/home";
import Favorites from "./pages/favorites";
import Details from "./pages/details";
import NotFound from "./pages/not-found";
import ToastContainer from "./components/toast";
import ShoppingDrawer from "./components/shopping-drawer";
import { GlobalContext } from "./context";

function App() {
  const {
    toasts,
    removeToast,
    isShoppingOpen,
    setIsShoppingOpen,
    shoppingList,
    toggleShoppingItem,
    removeFromShoppingList,
    clearShoppingList,
    addCustomShoppingItem,
    showToast,
  } = useContext(GlobalContext);

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFE] dark:bg-dark-bg text-slate-800 dark:text-slate-100 transition-colors duration-300 selection:bg-brand-500 selection:text-white">
      {/* Scroll to Top helper on route changes */}
      <ScrollToTop />

      {/* Top Navbar */}
      <Navbar />

      {/* Main App Routes */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/recipe-item/:id" element={<Details />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Global Shopping Drawer */}
      <ShoppingDrawer
        isOpen={isShoppingOpen}
        onClose={() => setIsShoppingOpen(false)}
        shoppingList={shoppingList}
        toggleShoppingItem={toggleShoppingItem}
        removeFromShoppingList={removeFromShoppingList}
        clearShoppingList={clearShoppingList}
        addCustomShoppingItem={addCustomShoppingItem}
        showToast={showToast}
      />

      {/* Global Toast Notifications */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
