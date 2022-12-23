const express = require("express");
const connection = require("../config/dbconnection");
const request = require("request");
let data = [];

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
const getAllCountries = async (req, res) => {
  request(
    "https://countriesnow.space/api/v0.1/countries/population",
    { json: true },
    (err, res, body) => {
      if (err) {
        return res.status(400).json({
          message: "Error",
          error: err,
          success: false,
        });
      }

      data = body.data;
    }
  );

  await sleep(10000);

  haha();
  /*connection.query(
    `SELECT collection_id , collection_name  
    from countries 
    WHERE DELETED = 0`,
    (err, result) => {
      if (err) {
        res.status(200).json({
          message: "Error",
          error: err,
          success: false,
        });
      }
      res.status(200).send({
        result: result,
        success: true,
      });
    }
  );*/
};

function haha() {
  console.log("kkkkkkkk");
  console.log(data[0]);
}

const addCountry = async (req, res) => {
  const countries = req.body.data;

  connection.query(
    `INSERT INTO countries VALUES collection_id , collection_name  
      from countries 
      WHERE DELETED = 0`,
    (err, result) => {
      if (err) {
        res.status(200).json({
          message: "Error",
          error: err,
          success: false,
        });
      }
      res.status(200).send({
        result: result,
        success: true,
      });
    }
  );
};

//============================== getAllCollectionsWithProducts =======================================

/*router.get("/collections/getAllCollectionsWithProducts", (req, res) => {
  connection.query(
    `SELECT coll.collection_id , coll.collection_name,pro.PRODUCT_VOLUME, pro.PRODUCT_PRICE price, pro.PRODUCT_ID id, pro.CATEGORY_ID, pro.PRODUCT_NAME title,
     pro.PRODUCT_QUANTITY availability,  pro.PRODUCT_DESCRIPTION, pro.SOLD,  pro.PRODUCT_PATH image ,pro.collection_id, pro.PRODUCT_COVER quickView,
     pro.PRODUCT_PRICE_CURRENCY_ID,curr.CURRENCY_NAME,pro.PRODUCT_WEIGHT, pro.CREATED_AT, pro.DELETED  
    from collections coll 
    LEFT JOIN products pro
          ON coll.collection_id = pro.collection_id
    LEFT JOIN CURRENCY curr
         ON pro.PRODUCT_PRICE_CURRENCY_ID = curr.CURRENCY_ID
    WHERE coll.DELETED = 0 AND pro.DELETED = 0 
     ;`,
    (err, result) => {
      let map = new Map();
      var obj = {};
      for (let i = 0; i < result.length; i++) {
        var collectionName = result[i].collection_name;
        if (map.has(collectionName)) {
          obj[collectionName].push(result[i]);
        } else {
          map.set(collectionName, collectionName);
          obj[collectionName] = obj[collectionName] || [];
          obj[collectionName].push(result[i]);
        }
      }
      //console.log(obj);

      if (err) {
        res.status(200).json({
          message: "Error",
          error: err,
          success: false,
        });
      }
      res.status(200).send({
        result: obj,
        success: true,
      });
    }
  );
});

///////////////////////////////insert new collection ////////////////////////////////////////////

router.post("/collections/insertCollection", (req, res) => {
  var data = {
    collection_name: req.body.collection_name,
  };
  const sql = "INSERT INTO collections SET ?";

  connection.query(sql, data, (err, result) => {
    if (err) {
      res.status(200).json({
        message: "Error!",
        error: err,
        success: false,
      });
    }

    res.status(200).send({
      message: "collection inserted Successfully",
      result: data,
      success: true,
    });
  });
});

//==============================getAllproducts=======================================

router.get("/products/getAllProducts", (req, res) => {
  connection.query(
    `SELECT coll.collection_id , coll.collection_name,pro.PRODUCT_ID id, pro.CATEGORY_ID, pro.PRODUCT_NAME title, pro.PRODUCT_QUANTITY availability,
    pro.PRODUCT_VOLUME, pro.PRODUCT_PRICE price,  pro.PRODUCT_DESCRIPTION, pro.SOLD,  pro.PRODUCT_PATH image, pro.collection_id, pro.PRODUCT_COVER quickView,
    pro.PRODUCT_PRICE_CURRENCY_ID,curr.CURRENCY_NAME,pro.PRODUCT_WEIGHT, pro.CREATED_AT, pro.DELETED  
    from products pro
    LEFT JOIN collections coll
          ON pro.collection_id = coll.collection_id  
    LEFT JOIN CURRENCY curr
          ON pro.PRODUCT_PRICE_CURRENCY_ID = curr.CURRENCY_ID
         WHERE pro.DELETED = 0 
     ;`,
    (err, result) => {
      if (err) {
        res.status(200).json({
          message: "Error",
          error: err,
          success: false,
        });
      }
      res.status(200).send({
        result: result,
        success: true,
      });
    }
  );
});

//=========================================getProductById==================================================

router.post("/products/getProductByid", (req, res) => {
  const PRODUCT_ID = req.body.PRODUCT_ID;

  connection.query(
    `SELECT coll.collection_id , coll.collection_name,pro.PRODUCT_VOLUME, pro.PRODUCT_PRICE, pro.PRODUCT_ID, pro.CATEGORY_ID, pro.PRODUCT_NAME,
     pro.PRODUCT_QUANTITY, pro.PRODUCT_DESCRIPTION, pro.SOLD, pro.PRODUCT_PATH, pro.PRODUCT_COVER,pro.PRODUCT_PRICE_CURRENCY_ID,curr.CURRENCY_NAME,pro.PRODUCT_WEIGHT,
      pro.CREATED_AT, pro.DELETED   
    from products pro
    LEFT JOIN collections coll
        ON pro.collection_id = coll.collection_id 
    LEFT JOIN CURRENCY curr
          ON pro.PRODUCT_PRICE_CURRENCY_ID = curr.CURRENCY_ID
         WHERE pro.DELETED = 0  AND pro.PRODUCT_ID = '` +
      PRODUCT_ID +
      `'`,
    (err, result) => {
      if (err) {
        res.status(200).json({
          message: "Error",
          error: err,
          success: false,
        });
      }
      res.status(200).send({
        result: result,
        success: true,
      });
    }
  );
});

//=========================================getProducts by category id==================================================

router.post("/products/getProductsByCategory", (req, res) => {
  const CATEGORY_ID = req.body.CATEGORY_ID;

  connection.query(
    `SELECT cat.CATEGORY_ID, cat.CAT_PARENT_ID, cat.CATEGORY_NAME, cat.CATEGORY_INFO, prod.PRODUCT_ID, prod.CATEGORY_ID, prod.PRODUCT_NAME, prod.PRODUCT_QUANTITY,  prod.PRODUCT_DESCRIPTION, prod.SOLD, prod.PRODUCT_PATH,prod.PRODUCT_COVER,prod.collection_id ,prod.CREATED_AT, prod.DELETED  
  from categories cat
  LEFT JOIN products prod
        ON cat.CATEGORY_ID = prod.CATEGORY_ID  
         WHERE DELETED = 0  AND cat.CATEGORY_ID = '` +
      CATEGORY_ID +
      `'`,
    (err, result) => {
      if (err) {
        res.status(200).json({
          message: "Error",
          error: err,
          success: false,
        });
      }
      res.status(200).send({
        result: result,
        success: true,
      });
    }
  );
});

//=========================================updateProductName==================================================

router.post(
  "/products/updateProductName",
  [authJwt.verifyToken],
  (req, res) => {
    const PRODUCT_ID = req.body.PRODUCT_ID;
    var PRODUCT_NAME = req.body.PRODUCT_NAME;

    connection.query(
      `UPDATE products SET PRODUCT_NAME = '` +
        PRODUCT_NAME +
        `' WHERE PRODUCT_ID = '` +
        PRODUCT_ID +
        `' AND DELETED = 0 `,
      (err, result) => {
        if (err) {
          res.status(200).json({
            message: "Error",
            error: err,
            success: false,
          });
        }
        res.status(200).send({
          result: "Product Name Updated Successfully !",
          success: true,
        });
      }
    );
  }
);

router.post(
  "/products/getProductsSoldByUserId",
  /*[authJwt.verifyToken], (req, res) => {
    const USER_ID = req.body.USER_ID;

    connection.query(
      `SELECT PRODUCT_SOLD_ID, INVOICE_ID, PRODUCT_NAME,PRODUCT_PRICE, PRODUCT_ID, PRODUCT_QUANTITY ,USER_ID ,BARCODE 
    FROM PRODUCT_SOLD WHERE USER_ID = '` +
        USER_ID +
        `'`,
      (err, result) => {
        if (err) {
          res.status(200).json({
            message: "Error",
            error: err,
            success: false,
          });
        }
        res.status(200).send({
          result: result,
          success: true,
        });
      }
    );
  }
);*/
// =======================================================================================================================

module.exports = {
  addCountry,
  getAllCountries,
};
