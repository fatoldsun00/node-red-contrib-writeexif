module.exports = function(RED) {
  const exiftool = require("exiftool-vendored").exiftool
  const fs = require("fs")


  function  WriteExif(config) {
    RED.nodes.createNode(this,config);
    this.image = config.image || undefined
    this.imageType = config.imageType || msg
    this.exif = config.exif || {}
    this.exifType = config.exifType || json
    this.deleteOriginal = config.deleteOriginal || false
    this.startListening()
  }

  WriteExif.prototype.startListening = function() {
    var node = this;
  
    node.on('input', async (msg) => {
      try {
        const imageFilePath = RED.util.evaluateNodeProperty(node.image,node.imageType,node,msg)
        const exif = RED.util.evaluateNodeProperty(node.exif,node.exifType,node,msg)
        if (imageFilePath == msg.payload) throw new Error('msg.payload is reserved for exif data to write')
        //If msg.payload has no properties
        if((Object.keys(msg.payload)).length > 0) {
          node.status({
            fill: "yellow",
            shape: "dot",
            text: "Write exif"
          });
          await exiftool.write(imageFilePath,exif)
        }
        
        node.status({
          fill: "blue",
          shape: "dot",
          text: "Read exif"
        });
        msg.payload = await exiftool.read(imageFilePath)

        if (node.deleteOriginal) {
          node.status({
            fill: "grey",
            shape: "dot",
            text: "done !"
          });
          await this.clearTEMPFile(imageFilePath)
        } 

        node.status({
					fill: "green",
					shape: "dot",
					text: "done !"
        });
        node.send(msg)

      } catch (err) {
        console.log(err);
        node.status({
					fill: "red",
					shape: "dot",
					text: "Error :"+ err.message
				});
      }
    })
    //on close
    node.on('close', () => {
      //clean temp file
    })
  }

  WriteExif.prototype.clearTEMPFile = async function(imageDir) {
    //nettoyage
    try{
      if (fs.existsSync(imageDir+'_exiftool_tmp')) fs.unlinkSync(imageDir+'_exiftool_tmp')
      if (fs.existsSync(imageDir+'_original')) fs.unlinkSync(imageDir+"_original")
      return true
    } catch (err) {
      return false
    }
  }

  RED.nodes.registerType("write-exif",WriteExif);
}
