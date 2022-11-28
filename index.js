const fs = require("fs");
const myArgs = process.argv.slice(2);
const {createCanvas, loadImage} = require("canvas");
const {layers,width,height} = require("./input/config"); 
const canvas = createCanvas(width,height);
const ctx = canvas.getContext("2d");
const { lstat } = require("fs");
const edition = myArgs.length > 0 ? Number(myArgs[0]) : 1;
var metadata = [];
var attributes = [];
var hash = [];
var decodedHash = [];

const saveLayer = (_canvas,_edition) => {
   fs.writeFileSync(`./output/${_edition}.png`,_canvas.toBuffer("image/png"));
  // console.log("image created")
}
attributes = [];
const addMetadata = (_edition) => {
    let dateTime = Date.now();
    let tempMetadata = {
      hash:hash.join(""),
      decodedHash:decodedHash,
      edition:_edition,
      date:dateTime,
      image:`ipfs://QmVwc4V7PD1LCWntoBiv7SHtgWqGFubWTH5eBPucJ3DcY5/${_edition}.png`,
      attributes: attributes
    }

   fs.writeFileSync(`./output/metadata/${_edition}.json`, JSON.stringify(tempMetadata))
//    attributes = [];
  // attributes.length = 0;
  
 //  metadata.push(tempMetadata);
   
 //  hash = [];
 //  decodedHash = [];
};

const  addAttributes = (_element,_layer) => {
    let tempAttr = {
        id:_element.id,
        layer:_layer.name,
        name:_element.name,
        rarity:_element.rarity
    }
    attributes.push(tempAttr)
    decodedHash.push({[_layer.id]:_element.id})

}

const drawLayer = async (_layer,_edition) => {
    const element = _layer.elements[Math.floor(Math.random() * _layer.elements.length)]
    addAttributes(element,_layer)
    const image = await loadImage(`${_layer.location}${element.filename}`);
    ctx.drawImage(image,_layer.position.x,_layer.position.y,_layer.size.width,_layer.size.height);
   const re =  saveLayer(canvas,_edition)
}

for(let i=1; i <= edition; i++){
    layers.forEach((layer) => {
        drawLayer(layer, i);
        addMetadata(i)
        
    });
    attributes = [];
    decodedHash = [];
    hash = [];

}