import { useState } from 'react';
import { format } from 'date-fns';
import { 
  ChevronDownIcon, 
  ChevronUpIcon, 
  CheckCircleIcon, 
  ClockIcon,
  TruckIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

const STATUS_CONFIG = {
  pending: { label: 'Pending', icon: ClockIcon, color: 'text-yellow-500' },
  confirmed: { label: 'Confirmed', icon: CheckCircleIcon, color: 'text-blue-500' },
  shipped: { label: 'Shipped', icon: TruckIcon, color: 'text-purple-500' },
  delivered: { label: 'Delivered', icon: CheckCircleIcon, color: 'text-green-500' },
  cancelled: { label: 'Cancelled', icon: XCircleIcon, color: 'text-red-500' }
};

export default function OrderDetail({ order, isExpandable = false }) {
  const [isExpanded, setIsExpanded] = useState(!isExpandable);
  const StatusIcon = STATUS_CONFIG[order.status]?.icon || ClockIcon;
  const statusClass = STATUS_CONFIG[order.status]?.color || 'text-gray-500';

  const toggleExpand = () => isExpandable && setIsExpanded(prev => !prev);

  return (
    <div 
      className={`order-card bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all ${
        isExpandable ? 'hover:shadow-md cursor-pointer' : ''
      }`}
      onClick={toggleExpand}
      role={isExpandable ? "button" : "region"}
      aria-expanded={isExpandable ? isExpanded : undefined}
      tabIndex={isExpandable ? 0 : undefined}
    >
      {/*Order Summary Header */}
      <div className="p-4 md:p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <div className="flex items-center space-x-3">
            <h3 className="font-bold text-lg text-gray-800">Order #{order.id}</h3>
            <div className={`flex items-center ${statusClass}`}>
              <StatusIcon className="w-4 h-4 mr-1" />
              <span className="font-medium">{STATUS_CONFIG[order.status]?.label || order.status}</span>
            </div>
          </div>
          <p className="text-gray-500 mt-1 text-sm">
            Placed: {format(new Date(order.createdAt), 'MMM dd, yyyy HH:mm')}
          </p>
        </div>
        
        <div className="mt-3 md:mt-0 text-right">
          <p className="font-bold text-lg text-gray-900">
            {new Intl.NumberFormat('en-US', { 
              style: 'currency', 
              currency: 'USD' 
            }).format(order.totalAmount)}
          </p>
          <p className="text-gray-500 text-sm mt-1">
            {order.items.length} item{order.items.length > 1 ? 's' : ''}
          </p>
        </div>
        
        {isExpandable && (
          <button 
            onClick={(e) => { e.stopPropagation(); toggleExpand(); }}
            className="ml-3 p-1 text-gray-400 hover:text-gray-600 focus:outline-none"
            aria-label={isExpanded ? "Collapse order details" : "Expand order details"}
          >
            {isExpanded ? (
              <ChevronUpIcon className="w-5 h-5" />
            ) : (
              <ChevronDownIcon className="w-5 h-5" />
            )}
          </button>
        )}
      </div>

      {/* Order Details (conditionally rendered) */}
      {(isExpanded || !isExpandable) && (
        <div className="p-4 md:p-6 space-y-5">
          {/* Items Grid */}
          <div>
            <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
              <span>Items</span>
              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                {order.items.length}
              </span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <img 
                    src={item.productImage} 
                    alt={item.productName} 
                    className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                    loading="lazy"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-800 truncate">{item.productName}</p>
                    <p className="text-gray-500 text-sm mt-1">
                      Qty: {item.quantity} × {new Intl.NumberFormat('en-US', { 
                        style: 'currency', 
                        currency: 'USD' 
                      }).format(item.price)}
                    </p>
                    {item.variant && (
                      <p className="text-xs text-gray-400 mt-1">Variant: {item.variant}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Address */}
          {order.shippingAddress && (
            <div>
              <h4 className="font-semibold text-gray-700 mb-3">Shipping Address</h4>
              <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600 space-y-1">
                <p>{order.shippingAddress.name}</p>
                <p>{order.shippingAddress.street}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                </p>
                <p>{order.shippingAddress.country}</p>
                <p className="mt-1 font-medium">Phone: {order.shippingAddress.phone}</p>
              </div>
            </div>
          )}

          {/* Order Timeline (Admin would expand this) */}
          {order.statusHistory && order.statusHistory.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-700 mb-3">Status Timeline</h4>
              <div className="relative pl-4 border-l-2 border-gray-200">
                {order.statusHistory.map((step, index) => (
                  <div key={index} className="mb-4 ml-3">
                    <div className="absolute w-3 h-3 bg-blue-500 rounded-full mt-1.5 -left-1.5 border-2 border-white"></div>
                    <p className="text-sm font-medium text-gray-800">{step.status}</p>
                    <p className="text-xs text-gray-500">
                      {format(new Date(step.timestamp), 'MMM dd, yyyy HH:mm')}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}