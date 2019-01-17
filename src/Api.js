import AppStyles from './AppStyles';

const _getCategories = () => {
  const categories = [{
    title: 'Analytics',
    color: AppStyles.colorSet.analyticsColor,
    lightColor: AppStyles.colorSet.analyticsLightColor,
    icon: AppStyles.iconSet.analytics
  }, {
    title: 'Customers',
    color: AppStyles.colorSet.customersColor,
    lightColor: AppStyles.colorSet.customersLightColor,
    icon: AppStyles.iconSet.customers
  }, {
    title: 'Orders',
    color: AppStyles.colorSet.ordersColor,
    lightColor: AppStyles.colorSet.ordersLightColor,
    icon: AppStyles.iconSet.orders
  }, {
    title: 'Tasks',
    color: AppStyles.colorSet.tasksColor,
    lightColor: AppStyles.colorSet.tasksLightColor,
    icon: AppStyles.iconSet.tasks
  }, {
    title: 'Sales',
    color: AppStyles.colorSet.salesColor,
    lightColor: AppStyles.colorSet.salesLightColor,
    icon: AppStyles.iconSet.sales
  }, {
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

  item.properties = {
    'Title': 'Launch iPhone app for Dashboard',
    'Status': 'In Progress',
    'Creation Date': 'Aug 14, 2018',
    'Priority': 'High',
    'Difficulty': 2,
    'Due Date': 'Aug 29, 2018'
  }

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

  item.properties = {
    'Name': 'Adidas Sweatshirt',
    'Items Sold': '432 items',
    'Tags': 'sports, running, discount',
    'Categories': 'Clothes, Sport',
    'Price': '$169.00',
    'SKU': '',
    'Tax Status': 'taxable',
    'Tax Class': 2
  }

  return item;
}

const _getOrdersItem = (index) => {
  let item = {
    id: index,
    title: 'Skater Dress ' + index,
    description: 'Monica Perez . Stripe . #43555 . Aug ' + index,
    photo: 'https://static.pullandbear.cn/2/photos/2019/V/0/2/p/5590/540/827/5590540827_1_1_3.jpg?t=1543923397000',
    value: '$' + index + '.00',
  };

  item.properties = {
    'Creation Date': 'Aug 11',
    'Product Name': 'Skater Dress',
    'Customer Name': 'Adele Camp',
    'Payment Gateway': 'Square',
    'Refund': 'No',
    'Receipt Number': '#645644',
    'Final Price': '$260'
  }

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

  item.properties = {
    'Name': 'John Doe',
    'Email': 'jdoe@gmail.com',
    'Account Created': 'Jul 12, 2018',
    'Total Spend': '$259',
    'Total Orders': 2,
  }

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

  item.properties = {
    'title': 'Launch iPhone app for Dashboard',
    'Status': 'In Progress',
    'Creation Date': 'Aug 14, 2018',
    'Priority': 'High',
    'Difficulty': 2,
    'Due Date': 'Aug 29, 2018'
  }

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

  item.properties = {
    'title': 'Launch iPhone app for Dashboard',
    'Status': 'In Progress',
    'Creation Date': 'Aug 14, 2018',
    'Priority': 'High',
    'Difficulty': 2,
    'Due Date': 'Aug 29, 2018'
  }

  return item;
}

const _getListOfCategory = (category) => {
  let list = [];
  for (let i = 1; i <= 20; i++) {
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

const _getDataOfCategory = (category, id) => {
  let data = null;
  if (category == 'Tasks') {
    data = _getTaskItem(id);
  } else if (category == 'Products') {
    data = _getProductsItem(id);
  } else if (category == 'Orders') {
    data = _getOrdersItem(id);
  } else if (category == 'Customers') {
    data = _getCustomersItem(id);
  } else if (category == 'Sales') {
    data = _getSalesItem(id);
  } else if (category == 'Analytics') {
    data = _getAnalyticsItem(id);
  }

  return data;
}

const dict = {
  getCategories: _getCategories,
  getListOfCategory: _getListOfCategory,
  getDataOfCategory: _getDataOfCategory,
};

export default dict;
