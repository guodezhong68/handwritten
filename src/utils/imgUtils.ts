interface imgUtilsHelpers {
  imgWatermark: (dom: Element, text: string) => void,
  imgSplit: (dom: Element, horizontal: number, vertical: number) => void,
  uploadFile: ({action, accept, signal}: uploadFileOptions) => Promise<any>
}

interface uploadFileOptions {
  action: string,
  accept: string,
  signal?: AbortSignal
}

const imgUtils = (): imgUtilsHelpers => {

//Blob转换到img标签
  function blobToImg(blob: Blob): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      let reader = new FileReader()
      reader.addEventListener('load', () => {
        let img = new Image()
        img.src = reader.result as string
        img.addEventListener('load', () => resolve(img))
      })
      reader.readAsDataURL(blob)
    })
  }

  // function base64ToImg(url: string) {
  //   let img = new Image()
  //   img.src = url
  //   return img
  // }


//将img标签内容绘制到canvas画布
  function imgToCanvas(img: HTMLImageElement) {
    let canvas = document.createElement('canvas')
    canvas.width = img.width
    canvas.height = img.height
    let ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    ctx.drawImage(img, 0, 0)
    return canvas
  }

  // canvas画布转为Blob对象
  function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (blob)
          resolve(blob)
      })
    })
  }

//canvas画布上绘制水印
  function watermark(canvas: HTMLCanvasElement, text: string): HTMLCanvasElement {

    let ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    // 设置填充字号和字体，样式
    ctx.font = "24px 宋体"
    ctx.fillStyle = "#FFC82C"
    // 设置右对齐
    ctx.textAlign = 'right'
    // 在指定位置绘制文字，这里指定距离右下角20坐标的地方
    ctx.fillText(text, canvas.width - 20, canvas.height - 20)

    return canvas
  }

  //img或canvas画布分割
  function segmentation(elt: HTMLImageElement | HTMLCanvasElement, horizontal: number, vertical: number): HTMLCanvasElement[] {
    const width = elt.width / horizontal
    const height = elt.height / vertical
    let canvasList: HTMLCanvasElement[] = [];
    for (let j = 0; j < vertical; j++) {
      for (let i = 0; i < horizontal; i++) {
        let canvas2 = document.createElement('canvas')
        canvas2.width = width
        canvas2.height = height
        let ctx = canvas2.getContext('2d') as CanvasRenderingContext2D
        ctx.drawImage(elt, width * i, height * j, width, height, 0, 0, width, height)
        canvasList.push(canvas2)
      }
    }

    return canvasList;
  }

  //从本地选择文件
  function nativeFile(accept?: string): Promise<FileList> {
    return new Promise((resolve, reject) => {
      let input = document.createElement('input')
      input.setAttribute('type', 'file')
      accept && input.setAttribute('accept', accept)
      input.onchange = async () => {
        if (!input.files) return;
        resolve(input.files)
      }
      input.click()
    })
  }


  //图片添加水印完整接口
  async function imgWatermark(dom: Element, text: string) {
    const files = await nativeFile('image/*');
    let img = await blobToImg(files[0])
    let canvas = imgToCanvas(img)
    let watermarkCanvas = watermark(canvas, text)
    let blob = await canvasToBlob(watermarkCanvas);
    // 此处将Blob读取到img标签，并在dom内渲染出来；如果是上传文件，可以将blob添加到FormData中
    let newImage = await blobToImg(blob)
    dom.appendChild(newImage)
  }

  //图片切割
  async function imgSplit(dom: Element, horizontal: number, vertical: number) {
    const files = await nativeFile('image/*');
    let img = await blobToImg(files[0])
    let splitCanvasList = segmentation(img, horizontal, vertical)
    // 创建一个文档片段
    let frag = document.createDocumentFragment()
    for (const splitCanvas of splitCanvasList) {
      let blob = await canvasToBlob(splitCanvas)
      let image = await blobToImg(blob)
      frag.appendChild(image)
    }
    dom.appendChild(frag)
  }

  async function uploadFile({action, accept, signal}: uploadFileOptions) {
    const files = await nativeFile(accept);

    var fileName = files[0].name;
    var formData = new FormData();
    formData.append('name', fileName);
    formData.append('file', files[0]);
    const response = await fetch(action, {
      method: 'POST',
      body: formData,
      signal: signal,
    })
    console.log(response)
    return response.json()
  }

  //文件格式
  // function fileSuffix(fileName: string) {
  //   return fileName.replace(/.+\./,"").toLowerCase()
  // }

  return {
    imgWatermark,
    imgSplit,
    uploadFile,
  }
}
export default imgUtils();

