class Glope{
    setImgURL(item){
        // console.log(item.SupplyNo)
        var url = "https://res.bestcake.com/m-images/ww";
        if(item.SupplyNo.indexOf("KSK")!==-1){
         return url+"/jd/"+item.Name+".png";
        }else if(item.SupplyNo.indexOf("NS")!==-1){
         return url+"/ns/"+item.Name+".jpg";
        }else if(item.SupplyNo.indexOf("JZ")!==-1){
         return url+"/jz/"+item.Name+".png";
        }else{
          return url+"/rp/"+item.Name+".jpg";
        }
      }
}
export default new(Glope);