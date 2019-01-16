import AppStyles from './AppStyles';

const _getCategories = () => {
  const categories = [{
    title: 'Analytics',
    color: AppStyles.colorSet.analyticsColor,
    lightColor: AppStyles.colorSet.analyticsLightColor,
    icon: AppStyles.iconSet.analytics
  },{
    title: 'Customers',
    color: AppStyles.colorSet.customersColor,
    lightColor: AppStyles.colorSet.customersLightColor,
    icon: AppStyles.iconSet.customers
  },{
    title: 'Orders',
    color: AppStyles.colorSet.ordersColor,
    lightColor: AppStyles.colorSet.ordersLightColor,
    icon: AppStyles.iconSet.orders
  },{
    title: 'Tasks',
    color: AppStyles.colorSet.tasksColor,
    lightColor: AppStyles.colorSet.tasksLightColor,
    icon: AppStyles.iconSet.tasks
  },{
    title: 'Sales',
    color: AppStyles.colorSet.salesColor,
    lightColor: AppStyles.colorSet.salesLightColor,
    icon: AppStyles.iconSet.sales
  },{
    title: 'Products',
    color: AppStyles.colorSet.productsColor,
    lightColor: AppStyles.colorSet.productsLightColor,
    icon: AppStyles.iconSet.products
  }];

  return categories;
}

const dict = {
  getCategories: _getCategories,
};

export default dict;

