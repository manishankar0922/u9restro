import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_MENU, INITIAL_TABLES, INITIAL_ORDERS, INITIAL_WAITER_REQUESTS } from '../data/mockData';

const AppContext = createContext();

export const playNotificationSound = () => {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    
    // First beep (deep/warm pitch)
    const osc1 = audioCtx.createOscillator();
    const gain1 = audioCtx.createGain();
    osc1.connect(gain1);
    gain1.connect(audioCtx.destination);
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
    gain1.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
    osc1.start(audioCtx.currentTime);
    osc1.stop(audioCtx.currentTime + 0.15);
    
    // Second beep (happy high pitch)
    setTimeout(() => {
      if (audioCtx.state === 'closed') return;
      const osc2 = audioCtx.createOscillator();
      const gain2 = audioCtx.createGain();
      osc2.connect(gain2);
      gain2.connect(audioCtx.destination);
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(880, audioCtx.currentTime); // A5
      gain2.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain2.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);
      osc2.start(audioCtx.currentTime);
      osc2.stop(audioCtx.currentTime + 0.25);
    }, 120);
  } catch (error) {
    console.warn("Web Audio API not supported or blocked by user gesture:", error);
  }
};

export const AppProvider = ({ children }) => {
  const [state, setState] = useState(() => {
    const saved = localStorage.getItem('u9restro_state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Revive items or default back if broken
        return {
          menu: parsed.menu || INITIAL_MENU,
          orders: parsed.orders || INITIAL_ORDERS,
          tables: parsed.tables || INITIAL_TABLES,
          waiterRequests: parsed.waiterRequests || INITIAL_WAITER_REQUESTS
        };
      } catch (e) {
        console.error(e);
      }
    }
    return {
      menu: INITIAL_MENU,
      orders: INITIAL_ORDERS,
      tables: INITIAL_TABLES,
      waiterRequests: INITIAL_WAITER_REQUESTS
    };
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('u9restro_state', JSON.stringify(state));
  }, [state]);

  // Sync across different browser tabs in real-time
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'u9restro_state' && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          const oldState = JSON.parse(e.oldValue || '{}');
          
          // Check if a new order was added (orders length increased)
          const oldOrdersLength = oldState.orders ? oldState.orders.length : 0;
          const newOrdersLength = parsed.orders ? parsed.orders.length : 0;
          
          if (newOrdersLength > oldOrdersLength) {
            playNotificationSound();
          }
          
          setState(parsed);
        } catch (err) {
          console.error("Failed to sync storage change:", err);
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const placeOrder = (tableNumber, cartItems, customerNotes) => {
    const orderId = `order-${Math.floor(100 + Math.random() * 900)}`;
    const newOrder = {
      id: orderId,
      tableNumber: parseInt(tableNumber, 10),
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        notes: item.notes || ""
      })),
      status: "pending",
      notes: customerNotes,
      createdAt: new Date().toISOString(),
      totalPrice: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    };

    // Update tables state as well
    const updatedTables = state.tables.map(table => {
      if (table.number === parseInt(tableNumber, 10)) {
        return { ...table, status: "occupied", currentOrderId: orderId };
      }
      return table;
    });

    setState(prev => ({
      ...prev,
      orders: [newOrder, ...prev.orders],
      tables: updatedTables
    }));

    // Trigger local notification sound for current window
    playNotificationSound();
    return newOrder;
  };

  const updateOrderStatus = (orderId, nextStatus) => {
    const updatedOrders = state.orders.map(order => {
      if (order.id === orderId) {
        return { ...order, status: nextStatus };
      }
      return order;
    });

    // If completed/served, update table status appropriately or keep it occupied
    // Let's say if completed/served, we can keep table occupied until cleared, or make table 'occupied' but no longer cooking
    let updatedTables = [...state.tables];
    if (nextStatus === "completed" || nextStatus === "cancelled") {
      const targetOrder = state.orders.find(o => o.id === orderId);
      if (targetOrder) {
        updatedTables = state.tables.map(table => {
          if (table.number === targetOrder.tableNumber) {
            // Keep table occupied but clear currentOrderId, or set status to vacant once completed? 
            // In a real restaurant, it becomes vacant when guest pays. Let's make it vacant on "completed"
            // or let's keep status as occupied but order is completed to show live admin tracking. Let's do vacant.
            return { ...table, status: "vacant", currentOrderId: null };
          }
          return table;
        });
      }
    }

    setState(prev => ({
      ...prev,
      orders: updatedOrders,
      tables: updatedTables
    }));
  };

  const addWaiterRequest = (tableNumber, type) => {
    const newRequest = {
      id: `req-${Math.floor(100 + Math.random() * 900)}`,
      tableNumber: parseInt(tableNumber, 10),
      type, // waiter, water, bill
      status: "pending",
      createdAt: new Date().toISOString()
    };

    // If request type is 'bill', we update table status to 'waiting_bill'
    const updatedTables = state.tables.map(table => {
      if (table.number === parseInt(tableNumber, 10)) {
        return { ...table, status: type === 'bill' ? 'occupied' : table.status };
      }
      return table;
    });

    setState(prev => ({
      ...prev,
      waiterRequests: [newRequest, ...prev.waiterRequests],
      tables: updatedTables
    }));

    playNotificationSound();
    return newRequest;
  };

  const resolveWaiterRequest = (requestId) => {
    const updatedRequests = state.waiterRequests.map(req => {
      if (req.id === requestId) {
        return { ...req, status: "resolved" };
      }
      return req;
    });
    setState(prev => ({
      ...prev,
      waiterRequests: updatedRequests
    }));
  };

  const toggleStockStatus = (itemId) => {
    const updatedMenu = state.menu.map(item => {
      if (item.id === itemId) {
        return { ...item, inStock: !item.inStock };
      }
      return item;
    });
    setState(prev => ({ ...prev, menu: updatedMenu }));
  };

  const updateItemPrice = (itemId, newPrice) => {
    const updatedMenu = state.menu.map(item => {
      if (item.id === itemId) {
        return { ...item, price: parseFloat(newPrice) || 0 };
      }
      return item;
    });
    setState(prev => ({ ...prev, menu: updatedMenu }));
  };

  const updateTableStatus = (tableId, status) => {
    const updatedTables = state.tables.map(table => {
      if (table.id === tableId) {
        return { ...table, status };
      }
      return table;
    });
    setState(prev => ({ ...prev, tables: updatedTables }));
  };

  const resetAllData = () => {
    localStorage.removeItem('u9restro_state');
    setState({
      menu: INITIAL_MENU,
      orders: INITIAL_ORDERS,
      tables: INITIAL_TABLES,
      waiterRequests: INITIAL_WAITER_REQUESTS
    });
  };

  return (
    <AppContext.Provider value={{
      menu: state.menu,
      orders: state.orders,
      tables: state.tables,
      waiterRequests: state.waiterRequests,
      placeOrder,
      updateOrderStatus,
      addWaiterRequest,
      resolveWaiterRequest,
      toggleStockStatus,
      updateItemPrice,
      updateTableStatus,
      resetAllData
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
