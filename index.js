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
const addMetadata = (_edition) => {
    let dateTime = Date.now();
    let tempMetadata = {
      hash:hash.join(""),
      decodedHash:decodedHash,
      edition:_edition,
      date:dateTime,
      attributes: attributes
    }
   metadata.push(tempMetadata);
   attributes = [];
   hash = [];
   decodedHash = [];
};

const addAttributes = (_element,_layer) => {
    let tempAttr = {
        id:_element.id,
        layer:_layer.name,
        name:_element.name,
        rarity:_element.rarity
    }
    attributes.push(tempAttr)
    hash.push(_layer.id)
    hash.push(_element.id)
    decodedHash.push({[_layer.id]:_element.id})

}

const drawLayer = async (_layer,_edition) => {
    const element = _layer.elements[Math.floor(Math.random() * _layer.elements.length)]
    addAttributes(element,_layer)
    const image = await loadImage(`${_layer.location}${element.filename}`);
  //  console.log(_layer.location)
  //  console.log(element.filename)
  //  console.log(image)
    ctx.drawImage(image,_layer.position.x,_layer.position.y,_layer.size.width,_layer.size.height);
 //   console.log(`I created ${_layer.name} layer, and choose element ${element.name}`)
    saveLayer(canvas,_edition)
}

for(let i=1; i <= edition; i++){
    layers.forEach((layer) => {
     //   console.log("layers: ",layer)
    
        drawLayer(layer, i);
        addMetadata(i)
        //console.log(layer)
    });
}

fs.readFile("./output/_metadata.json",(err,data)=>{
    if(err) throw err;
    fs.writeFileSync("./output/_metadata.json", JSON.stringify(metadata))
})
