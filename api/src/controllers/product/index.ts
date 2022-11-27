import { product } from "../../Types";
import { Product } from "../../models/Product";

const pageSize = 5;

export const getAllProductsAdmin = async (
  page: number,
  category?: string,
  name?: string,
  property?: string,
  order?: string
) => {
  console.log( page, category, name, property, order);
  if (
    category === "undefined" &&
    name !== "undefined" &&
    property !== "undefined" &&
    order !== "undefined"
  ) {
    
    const resultName = await Product.paginate(
      {
        name: new RegExp(`${name}`, "i"),
      },
      {
        limit: pageSize,
        page: page,
        sort: { [`${property}`]: order },
      }
    );
    return resultName;
  } else if (
    category !== "undefined" &&
    name === "undefined" &&
    property !== "undefined" &&
    order !== "undefined"
  ) {
    
    const resultCategory = await Product.paginate(
      {
        category: new RegExp(`${category}`, "i"),
      },
      {
        limit: pageSize,
        page: page,
        sort: { [`${property}`]: order },
      }
    );
    return resultCategory;
  } else if (
    category === "undefined" &&
    name === "undefined" &&
    property !== "undefined" &&
    order !== "undefined"
  ) {
    const resultCategory = await Product.paginate(
      {
        
      },
      {
        limit: pageSize,
        page: page,
        sort: { [`${property}`]: order },
      }
    );
    return resultCategory;
  } else if (
    category !== "undefined" &&
    name !== "undefined" &&
    (property === "undefined" || order === "undefined")
  ) {
    
    const resultCategory = await Product.paginate(
      {
        category: new RegExp(`${category}`, "i"),
        name: new RegExp(`${name}`, "i"),
      },
      {
        limit: pageSize,
        page: page,
      }
    );
    return resultCategory;
  } else if (
    category === "undefined" &&
    name === "undefined" &&
    (property === "undefined" || order === "undefined")
  ) {
    const resultCategory = Product.paginate(
      {
       
      },
      {
        limit: pageSize,
        page: page,
      }
    );;
    return resultCategory;
  } else if (
    category === "undefined" &&
    name !== "undefined" &&
    (property === "undefined" || order === "undefined")
  ) {
    const resultCategory = await Product.paginate(
      {
        name: new RegExp(`${name}`, "i"),
      },
      {
        limit: pageSize,
        page: page,
      }
    );
    return resultCategory;
  } else if (
    category !== "undefined" &&
    name === "undefined" &&
    (property === "undefined" || order === "undefined")
  ) {
    const resultCategory = await Product.paginate(
      {
        category: new RegExp(`${category}`, "i"),
      },
      {
        limit: pageSize,
        page: page,
      }
    );
    return resultCategory;
  } else if (
    category === "undefined" &&
    name !== "undefined" &&
    (property === "undefined" || order === "undefined")
  ) {
    const resultCategory = await Product.paginate(
      {
        name: new RegExp(`${name}`, "i"),
      },
      {
        limit: pageSize,
        page: page,
      }
    );
    return resultCategory;
  } 
  
  else if (
    category === "undefined" &&
    name === "undefined" &&
    property === "undefined" && order !== "undefined"
  ) {
    const resultCategory = await Product.paginate(
      {
       
      },
      {
        limit: pageSize,
        page: page,
        sort: { name: order },
      }
    );
    return resultCategory;
  }

  else {
    const resultAll = await Product.paginate(
      {
        category: new RegExp(`${category}`, "i"),
        name: new RegExp(`${name}`, "i"),
      },
      {
        limit: pageSize,
        page: page,
        sort: { [`${property}`]: order },
      }
    );
    return resultAll;
  }
};


export const findByName = async (name: string) => {
  const result = await Product.paginate({
    name: new RegExp(`${name}`, "i"),
  });
  return result;
};

// ##########################################################
export const getAllProducts = async (page: number) => {
  const result = await Product.paginate(
    { deleted: false },
    { limit: pageSize, page: page }
  );
  return result;
};

// ##########################################################

export const getWithfilters = async (
  page: number,
  category?: string,
  name?: string,
  property?: string,
  order?: string
) => {
  if (
    category === "undefined" &&
    name !== "undefined" &&
    property !== "undefined" &&
    order !== "undefined"
  ) {
    console.log("1");
    const resultName = await Product.paginate(
      {
        name: new RegExp(`${name}`, "i"),
        deleted: false,
      },
      {
        limit: pageSize,
        page: page,
        sort: { [`${property}`]: order },
      }
    );
    return resultName;
  } else if (
    category !== "undefined" &&
    name === "undefined" &&
    property !== "undefined" &&
    order !== "undefined"
  ) {
    console.log("2");
    const resultCategory = await Product.paginate(
      {
        category: new RegExp(`${category}`, "i"),
        deleted: false,
      },
      {
        limit: pageSize,
        page: page,
        sort: { [`${property}`]: order },
      }
    );
    return resultCategory;
  } else if (
    category === "undefined" &&
    name === "undefined" &&
    property !== "undefined" &&
    order !== "undefined"
  ) {
    console.log("3");
    const resultCategory = await Product.paginate(
      {
        deleted: false,
      },
      {
        limit: pageSize,
        page: page,
        sort: { [`${property}`]: order },
      }
    );
    return resultCategory;
  } else if (
    category !== "undefined" &&
    name !== "undefined" &&
    (property === "undefined" || order === "undefined")
  ) {
    console.log("4");
    const resultCategory = await Product.paginate(
      {
        category: new RegExp(`${category}`, "i"),
        name: new RegExp(`${name}`, "i"),
        deleted: false,
      },
      {
        limit: pageSize,
        page: page,
      }
    );
    return resultCategory;
  } else if (
    category === "undefined" &&
    name === "undefined" &&
    (property === "undefined" || order === "undefined")
  ) {
    console.log("5");
    const resultCategory = getAllProducts(page);
    return resultCategory;
  } else if (
    category === "undefined" &&
    name !== "undefined" &&
    (property === "undefined" || order === "undefined")
  ) {
    console.log("6");
    const resultCategory = await Product.paginate(
      {
        name: new RegExp(`${name}`, "i"),
        deleted: false,
      },
      {
        limit: pageSize,
        page: page,
      }
    );
    return resultCategory;
  } else if (
    category !== "undefined" &&
    name === "undefined" &&
    (property === "undefined" || order === "undefined")
  ) {
    console.log("7");
    const resultCategory = await Product.paginate(
      {
        category: new RegExp(`${category}`, "i"),
        deleted: false,
      },
      {
        limit: pageSize,
        page: page,
      }
    );
    return resultCategory;
  } else if (
    category === "undefined" &&
    name !== "undefined" &&
    (property === "undefined" || order === "undefined")
  ) {
    console.log("8");
    const resultCategory = await Product.paginate(
      {
        name: new RegExp(`${name}`, "i"),
        deleted: false,
      },
      {
        limit: pageSize,
        page: page,
      }
    );
    return resultCategory;
  } else {
    console.log("9");
    console.log("entre3");
    const resultAll = await Product.paginate(
      {
        category: new RegExp(`${category}`, "i"),
        name: new RegExp(`${name}`, "i"),
        deleted: false,
      },
      {
        limit: pageSize,
        page: page,
        sort: { [`${property}`]: order },
      }
    );
    return resultAll;
  }
};

// ##########################################################

export const getProductById = async (id: String) => {
  if (id.length > 24 || id.length < 24) {
    throw new Error("Id no valido");
  }
  const result = await Product.findById(id).populate([{
    path: 'reviews',
    populate: [{
      path: 'review',
      populate: [{
        path: 'user'
      }]
    }]
  }
  ])

  if (!result) {
    throw new Error("No se encontro el producto con ese id");
  }

  return result;
};

// ##########################################################

export const addNewProduct = async (prod: product) => {
  const productFind = await Product.findOne({ name: prod.name });

  if (
    !prod ||
    !prod.name ||
    !prod.description ||
    !prod.stock ||
    !prod.price ||
    !prod.category
  ) {
    throw new Error("Info Missing");
  } else if (productFind) {
    throw new Error("Product already exist");
  } else if (!productFind) {
    const newProduct = new Product({
      name: prod.name,
      description: prod.description,
      price: prod.price,
      rating: prod.rating,
      image: prod.image,
      stock: prod.stock,
      category: prod.category,
      colors: prod.colors,
      sizes: prod.sizes,
      deleted: false,
    });

    newProduct
      .save()
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => new Error(error));
  }
};

export const deleteProduct = async (id: string) => {
  const result = await Product.findOneAndUpdate({ _id: id }, { deleted: true });

  if (!result) {
    throw new Error("No se puede eliminar el producto");
  }
  return result;
};

export const changeProperties = async (id: string, body: any) => {
  const product = await Product.findById(id);

  product.price.push(body.price);
  body.price = product.price;

  const result = await Product.findOneAndUpdate({ _id: id }, body);
  if (!result) {
    throw new Error("No existe el producto");
  }

  if (!result) {
    throw new Error("No existe el producto");
  }
  return result;
};
