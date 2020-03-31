import * as bodyParser from "body-parser";
import * as express from "express";
import { authorize } from "../config";
import Product from "./product.model";
import { ObjectId } from "bson";

const router = express.Router();

async function asyncForEach(array: any[], callback: (element: any, index: number, array: any[]) => void) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

router.route("/").get(authorize, async (_, response) => {
  const items = await Product.find();
  return response.status(200).json(items);
});

router.route("/").post(authorize, bodyParser.json(), async (request, response) => {
  try {
    const item = new Product(request.body);
    await item.save();
    return response.status(200).json("Product saved!");
  } catch (error) {
    return response.status(400).send(error);
  }
});

router.route("/import").post(authorize, bodyParser.json({limit: '10mb'}), async (request, response) => {
  try {
    let results : any[] = [];
    await asyncForEach(request.body, async (element: any) => {
      let item;
      if (element._id || element.id) {
        element.oldId = element._id ||element.id;
        delete element._id; 
        delete element.id;
        let p = await Product.findOne({oldId:new ObjectId(element.oldId)});
        if (p) {
          item = await Product.findOneAndUpdate({oldId:new ObjectId(element.oldId)}, element);
        } else {
          item = new Product(element);
          await item.save();  
        }
      } else {
        item = new Product(element);
        await item.save();
      }
      results.push(item);
    });
    
    return response.status(200).json({
      message: "Products saved!",
      results: results
    });
  } catch (error) {
    return response.status(400).send(error);
  }
});

router.route("/getByOldId/:oldId").get(authorize, bodyParser.json(), async (request, response) => {
  try {
    let p = await Product.findOne({oldId:new ObjectId(request.params.oldId)});    
    return response.status(200).json({
      message: "Search done",
      results: p
    });
  } catch (error) {
    return response.status(400).send(error);
  }
});

export default router;
