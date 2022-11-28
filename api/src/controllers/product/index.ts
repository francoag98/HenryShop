import { product } from "../../Types";
import { Product } from "../../models/Product";
import { Category } from "../../models/Category"

const pageSize = 5;

export const getAllProductsAdmin = async (
  page: number,
  category?: string,
  name?: string,
  property?: string,
  order?: string
) => {
  console.log(category, name);
  const catObj = await Category.findOne({name: category});
  const catId = catObj? catObj._id: "undefined";
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
        category: catObj,
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
        category: catObj,
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
        category: catObj,
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
        category:catObj,
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
  console.log(category, name);
  const catObj = await Category.findOne({name: category});
  const catId = catObj? catObj._id: "undefined";
  console.log(catId);
  if (
    catId === "undefined" &&
    name !== "undefined" &&
    property !== "undefined" &&
    order !== "undefined"
  ) {
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
    catId !== "undefined" &&
    name === "undefined" &&
    property !== "undefined" &&
    order !== "undefined"
  ) {
    const resultCategory = await Product.paginate(
      {
        category: catId,
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
    catId === "undefined" &&
    name === "undefined" &&
    property !== "undefined" &&
    order !== "undefined"
  ) {
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
    catId !== "undefined" &&
    name !== "undefined" &&
    (property === "undefined" || order === "undefined")
  ) {
    const resultCategory = await Product.paginate(
      {
        category: catId,
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
    catId === "undefined" &&
    name === "undefined" &&
    (property === "undefined" || order === "undefined")
  ) {
    const resultCategory = getAllProducts(page);
    return resultCategory;
  } else if (
    catId === "undefined" &&
    name !== "undefined" &&
    (property === "undefined" || order === "undefined")
  ) {
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
    catId !== "undefined" &&
    name === "undefined" &&
    (property === "undefined" || order === "undefined")
  ) {
    const resultCategory = await Product.paginate(
      {
        category: catId,
        deleted: false,
      },
      {
        limit: pageSize,
        page: page,
      }
    );
    return resultCategory;
  } else if (
    catId === "undefined" &&
    name !== "undefined" &&
    (property === "undefined" || order === "undefined")
  ) {
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
    const resultAll = await Product.paginate(
      {
        category: catId,
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
  const categoryFind = await Category.findOne( {name: prod.category} );
  const categoryId:any = categoryFind._id; 
  if (
    !prod ||
    !prod.name ||
    !prod.description ||
    !prod.price ||
    !prod.category
  ) {
    throw new Error("Info Missing");
  } else if (productFind) {
    throw new Error("Product already exist");
  } else if (!productFind) {
    try{
      const newProduct = await Product.create({
        name: prod.name,
        description: prod.description,
        price: prod.price,
        image: prod.image,
        category: categoryId,
        variants: prod.variants,
        variantName: prod.variantName,
        deleted: false,
      });
    }catch(error:any){
      throw error.message;
    }
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
  const categoryFind = await Category.findOne( {name: body.category} );
  const categoryId:any = categoryFind._id; 

  product.price.push(body.price);
  body.price = product.price;

  const result = await Product.findOneAndUpdate({ _id: id }, {...body, category: categoryId});
  if (!result) {
    throw new Error("No existe el producto");
  }

  if (!result) {
    throw new Error("No existe el producto");
  }
  return result;
};
