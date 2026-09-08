import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import Favorites from "./pages/favorites";
import Details from "./pages/details";
import ToastContainer from "./components/toast";
import ShoppingDrawer from "./components/shopping-drawer";
import { GlobalContext } from "./context";
import { Heart, UtensilsCrossed } from "lucide-react";

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
      {/* Top Navbar */}
      <Navbar />

      {/* Main App Routes */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/recipe-item/:id" element={<Details />} />
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
      <footer className="border-t border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-dark-card/50 backdrop-blur-md py-10 px-4 sm:px-6 lg:px-8 mt-auto no-print">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-amber-400 flex items-center justify-center text-white shadow-md">
              <UtensilsCrossed className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-sm tracking-tight text-slate-800 dark:text-white">
              Flavor<span className="text-brand-500">Craft</span> Studio
            </span>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1">
            Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for passionate home chefs & food lovers.
          </p>

          <p className="text-xs text-slate-400 dark:text-slate-500">
            Powered by Forkify API & React
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;