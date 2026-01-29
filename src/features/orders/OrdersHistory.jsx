import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  fetchUserOrders, 
  selectUserOrders, 
  selectOrdersStatus, 
  selectOrdersError,
  clearOrdersError 
} from './orderSlice';
import OrderDetail from './OrderDetail';
import Loader from '../../components/Loader';

export default function OrderHistory() {
  const dispatch = useDispatch();
  const orders = useSelector(selectUserOrders);
  const status = useSelector(selectOrdersStatus);
  const error = useSelector(selectOrdersError);

  useEffect(() => {
    dispatch(fetchUserOrders());
    return () => dispatch(clearOrdersError()); // Cleanup error on unmount
  }, [dispatch]);

  // Responsive layout classes
  const gridClasses = "orders-grid grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8";

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-red-800">{error}</p>
              <button 
                onClick={() => dispatch(fetchUserOrders())}
                className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Retry Loading Orders
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">My Order History</h1>
          <p className="mt-2 text-lg text-gray-500 max-w-3xl mx-auto">
            View your past orders, track shipments, and reorder favorites
          </p>
        </div>

        {orders.length === 0 ? (
          // Empty State Pattern
          <div className="bg-white rounded-2xl shadow-sm border-2 border-dashed border-gray-200 p-12 text-center max-w-3xl mx-auto">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100">
              <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 className="mt-4 text-xl font-medium text-gray-900">No orders yet</h3>
            <p className="mt-2 text-gray-500">Your orders will appear here once you complete a purchase.</p>
            <div className="mt-6">
              <a
                href="/products"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Start Shopping
              </a>
            </div>
          </div>
        ) : (
          // Responsive Grid Layout
          <div className={gridClasses}>
            {orders.map((order) => (
              <OrderDetail 
                key={order.id} 
                order={order} 
                isExpandable={true} 
              />
            ))}
          </div>
        )}

        {/* Pagination would go here (future enhancement) */}
      </div>
    </div>
  );
}