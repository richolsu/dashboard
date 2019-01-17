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

const _getTaskItem = (index) => {
  let item = {
    id: index,
    title: 'Publish new product page ' + index,
    description: 'Due Date: Jul ' + index,
    photo: 'https://image.shutterstock.com/image-photo/smiling-man-crossed-arms-over-260nw-371570986.jpg',
    value: 'Done',
  };

  return item;
}

const _getProductsItem = (index) => {
  let item = {
    id: index,
    title: 'Zapatos shows' + index,
    description: 'The Black 9 Shoes look ' + index,
    photo: 'https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    value: 'Created Jul ' + index,
  };

  return item;
}

const _getOrdersItem = (index) => {
  let item = {
    id: index,
    title: 'Adidas Sweatshirt ' + index,
    description: 'Monica Perez . Stripe . #43555 . Aug ' + index,
    photo: 'https://static.pullandbear.cn/2/photos/2019/V/0/2/p/5590/540/827/5590540827_1_1_3.jpg?t=1543923397000',
    value: '$' + index + '.00',
  };

  return item;
}

const _getCustomersItem = (index) => {
  let item = {
    id: index,
    title: 'John Doe ' + index,
    description: 'iPhone . Total Spend $' + index,
    photo: 'https://image.shutterstock.com/image-photo/smiling-man-crossed-arms-over-260nw-371570986.jpg',
    value: 'Created Jul ' + index,
  };

  return item;
}

const _getSalesItem = (index) => {
  let item = {
    id: index,
    title: 'Sales ' + index,
    description: 'Due Date: Jul ' + index,
    photo: 'https://image.shutterstock.com/image-photo/smiling-man-crossed-arms-over-260nw-371570986.jpg',
    value: 'Done',
  };

  return item;
}

const _getAnalyticsItem = (index) => {
  let item = {
    id: index,
    title: 'Analytics ' + index,
    description: 'Due Date: Jul 23',
    photo: 'https://image.shutterstock.com/image-photo/smiling-man-crossed-arms-over-260nw-371570986.jpg',
    value: 'Done',
  };

  return item;
}

const _getListOfCategory = (category) => {
  let list = [];
  for (let i=1; i<=20; i++) {
    if (category == 'Tasks') {
      list.push(_getTaskItem(i));
    } else if (category == 'Products') {
      list.push(_getProductsItem(i));
    } else if (category == 'Orders') {
      list.push(_getOrdersItem(i));
    } else if (category == 'Customers') {
      list.push(_getCustomersItem(i));
    } else if (category == 'Sales') {
      list.push(_getSalesItem(i));
    } else if (category == 'Analytics') {
      list.push(_getAnalyticsItem(i));
    }
  }

  return list;
}

const dict = {
  getCategories: _getCategories,
  getListOfCategory: _getListOfCategory
};

export default dict;

