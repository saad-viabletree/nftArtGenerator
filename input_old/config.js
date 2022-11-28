const fs = require("fs");
const width= 1000;
const height= 1000;
const dir = __dirname;
//console.log(dir + "/background/black.png")

const rarity = [
  {key:"", val:"original"},
  {key:"_r", val:"rare"},
  {key:"_sr", val:"super rare"},

]

const addRarity = (_str) => {
    let itemRarity;
    rarity.forEach((r) => {
        if(_str.includes(r.key))
        {
            itemRarity = r.val;
        }
      
    });
   return itemRarity
  }
const cleanName = (_str) => {
  let name = _str.slice(0,-4);
  rarity.forEach((r) => {
    name = name.replace(r.key,"")
  });
 return name
}


const getElements = (_dir) => {
    try {
      return fs
        .readdirSync(_dir)
        // .filter((item) => {
        //   let extension = path.extname(`${_dir}${item}`);
        //   if (extension == ".png" || extension == ".jpg") {
        //     return item;
        //   }
        // })
        .map((i,index) => {
          return {
            id:index + 1,
            filename: i,
            name: cleanName(i),
            rarity:addRarity(i)
          };
        });
        
    } catch {
      return null;
    }
  };
  
const layers = [
    {
    id:1,
    name:"background",
    location:`${dir}/Background/`,
    elements:getElements(`${dir}/Background/`),
    position: {x:0 , y:0},
    size: {width:1000, height:1000},
   },
   {
    id:2,
    name:"ball",
    location:`${dir}/ball/`,
    elements:getElements(`${dir}/ball/`),
    position: {x:0 , y:0},
    size: {width:1000, height:1000},
   },
   {
    id:3,
    name:"Eye color",
    location:`${dir}/Eye color/`,
    elements:getElements(`${dir}/Eye color/`),
    position: {x:0 , y:0},
    size: {width:1000, height:1000},
   },
   {
    id:4,
    name:"Iris",
    location:`${dir}/Iris/`,
    elements:getElements(`${dir}/Iris/`),
    position: {x:0 , y:0},
    size: {width:1000, height:1000},
   },
   {
    id:5,
    name:"Shine",
    location:`${dir}/Shine/`,
    elements:getElements(`${dir}/Shine/`),
    position: {x:0 , y:0},
    size: {width:1000, height:1000},
   },
   {
    id:6,
    name:"Bottom lid",
    location:`${dir}/Bottom lid/`,
    elements:getElements(`${dir}/Bottom lid/`),
    position: {x:0 , y:0},
    size: {width:1000, height:1000},
   },
   {
    id:7,
    name:"Top lid",
    location:`${dir}/Top lid/`,
    elements:getElements(`${dir}/Top lid/`),
    position: {x:0 , y:0},
    size: {width:1000, height:1000},
    },
];
//console.log(layers[1])
module.exports = {layers,width,height};
