import { Document, model, Schema, Mongoose } from "mongoose";
import { SchemaDef } from "../../types";
import { ObjectID } from "bson";

interface Product {
    name:string,
    category:string,
    seasons: {
        1:number,
        2:number,
        3:number,
        4:number,
        5:number,
        6:number,
        7:number,
        8:number,
        9:number,
        10:number,
        11:number,
        12:number
    },
    fromAnimal:boolean,
    containsLactose:boolean,
    containsGluten:boolean,
    oldId:ObjectID
}

// Declare model interface
interface ProductDoc extends Product, Document {
}

const productSchemaDef: SchemaDef<Product> = {
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type : String,
    trim: true
  },
  seasons : {
    1 : {
        type: Number,
        default: 0
      },
      2 : {
        type: Number,
        default: 0
      },
      3 : {
        type: Number,
        default: 0
      },
      4 : {
        type: Number,
        default: 0
      },
      5 : {
        type: Number,
        default: 0
      },
      6 : {
        type: Number,
        default: 0
      },
      7 : {
        type: Number,
        default: 0
      },
      8 : {
        type: Number,
        default: 0
      },
      9 : {
        type: Number,
        default: 0
      },
      10 : {
        type: Number,
        default: 0
      },
      11 : {
        type: Number,
        default: 0
      },
      12 : {
        type: Number,
        default: 0
      }
  },
  fromAnimal : {
    type:Boolean,
  },
  containsLactose : {
    type:Boolean,
  },
  containsGluten : {
    type:Boolean,
  },
  oldId : {
    type:ObjectID
  }
};

// Define model schema
const productSchema = new Schema(productSchemaDef, { timestamps : true });

export default model<ProductDoc>("Product", productSchema);
