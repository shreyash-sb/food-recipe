import React, { useState } from 'react';
import { ShoppingBag, X, Check, Trash2, Plus, Copy, CheckCheck } from 'lucide-react';

export default function ShoppingDrawer({
  isOpen,
  onClose,
  shoppingList,
  toggleShoppingItem,
  removeFromShoppingList,
  clearShoppingList,
  addCustomShoppingItem,
  showToast,
}) {
  const [customText, setCustomText] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleAddCustom = (e) => {
    e.preventDefault();
    if (!customText.trim()) return;
    addCustomShoppingItem(customText.trim());
    setCustomText('');
  };

  const handleCopyList = () => {
    if (shoppingList.length === 0) return;
    const text = shoppingList
      .map(
        (item) =>
          `${item.completed ? '✓ ' : '• '} ${item.quantity ? item.quantity + ' ' : ''}${
            item.unit ? item.unit + ' ' : ''
          }${item.description || item.text}`
      )
      .join('\n');

    navigator.clipboard.writeText(`🛒 My Grocery Shopping List:\n\n${text}`);
    setCopied(true);
    showToast('Shopping list copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const completedCount = shoppingList.filter((i) => i.completed).length;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Drawer */}
      <aside aria-label="Shopping Grocery List" className="relative w-full max-w-md bg-white dark:bg-dark-card h-full shadow-2xl z-10 flex flex-col border-l border-slate-200 dark:border-slate-800 animate-slide-up sm:animate-none">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-800 dark:text-white">Shopping List</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {shoppingList.length === 0
                  ? 'No items added'
                  : `${completedCount} of ${shoppingList.length} items checked`}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Add custom item form */}
        <form onSubmit={handleAddCustom} className="p-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex gap-2">
            <input
              type="text"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="Add extra ingredient or item..."
              className="flex-1 px-4 py-2.5 rounded-xl text-sm bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-brand-500 text-slate-800 dark:text-slate-100 placeholder:text-slate-400"
            />
            <button
              type="submit"
              className="p-2.5 px-4 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-sm font-semibold flex items-center gap-1 shadow-md shadow-brand-500/20 transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
        </form>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {shoppingList.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-6 text-slate-400 dark:text-slate-500">
              <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4 text-slate-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <p className="font-semibold text-slate-700 dark:text-slate-300">Your shopping list is empty</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs">
                Add ingredients directly from any recipe details page or type them in above!
              </p>
            </div>
          ) : (
            shoppingList.map((item) => (
              <div
                key={item.id}
                className={`group flex items-center justify-between p-3 rounded-xl border transition-all ${
                  item.completed
                    ? 'bg-slate-50/60 dark:bg-slate-900/30 border-slate-200/50 dark:border-slate-800/50 opacity-60'
                    : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/60 shadow-sm'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleShoppingItem(item.id)}
                  className="flex items-center gap-3 flex-1 text-left"
                >
                  <div
                    className={`w-5 h-5 rounded-lg flex items-center justify-center border transition-colors ${
                      item.completed
                        ? 'bg-emerald-500 border-emerald-500 text-white'
                        : 'border-slate-300 dark:border-slate-600 group-hover:border-brand-500'
                    }`}
                  >
                    {item.completed && <Check className="w-3.5 h-3.5" />}
                  </div>
                  <span
                    className={`text-sm ${
                      item.completed
                        ? 'line-through text-slate-400 dark:text-slate-500'
                        : 'text-slate-700 dark:text-slate-200 font-medium'
                    }`}
                  >
                    {item.quantity ? `${item.quantity} ` : ''}
                    {item.unit ? `${item.unit} ` : ''}
                    {item.description || item.text}
                  </span>
                </button>
                <button
                  onClick={() => removeFromShoppingList(item.id)}
                  className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-all"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        {shoppingList.length > 0 && (
          <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex gap-2">
            <button
              onClick={handleCopyList}
              className="flex-1 py-2.5 px-3 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
            >
              {copied ? <CheckCheck className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy to Clipboard'}
            </button>
            <button
              onClick={clearShoppingList}
              className="py-2.5 px-3 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/40 text-rose-600 dark:text-rose-400 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
