//import { ImageUploader } from "https://js.sabae.cc/ImageUploader.js";
import { ImageUploader } from "./ImageUploader.js";
import { uploadFile } from "https://js.sabae.cc/uploadFile.js";

class InputImage extends HTMLElement {
  constructor(opts) {
    super();
    if (opts) {
      for (const name in opts) {
        if (opts[name] != null) {
          this.setAttribute(name, opts[name]);
        }
      }
    }

    const name = this.getAttribute("name");
    const accept = this.getAttribute("accept");
    //console.log(uploadurl, maxwidth, maxsize);
    const multiple = this.getAttribute("multiple") != null;

    const inp = document.createElement("input");
    this.appendChild(inp);
    inp.type = "file";
    inp.accept = accept;
    if (multiple) {
      inp.multiple = true;
    }

    const inp2 = document.createElement("input");
    this.appendChild(inp2);
    inp2.type = "hidden";
    inp2.name = name;

    const imgc = document.createElement("div");
    this.imgc = imgc;
    this.appendChild(imgc);
    inp.onchange = async (e) => {
      const uploadurl = this.getAttribute("uploadurl");
      const maxwidth = this.getAttribute("maxwidth") || 1220;
      const maxsize = this.getAttribute("maxsize") || "3MB";

      if (!multiple) {
        while (this.imgc.firstElementChild) {
          this.imgc.removeChild(this.imgc.firstElementChild);
        }
      }
      const files = [];
      for (const file of e.target.files) {
        files.push(file);
      }
      // files.sort((a, b) => a.lastModified - b.lastModified); // 更新古い順
      files.sort((a, b) => (a < b ? -1 : ((a > b ? 1 : 0)))); // 名前順
      // console.log(files.map(f => f.name + " " + f.lastModified));
      const ps = [];
      for (const file of files) {
        const type = file.type;
        const p = new Promise((res, rej) => {
          try {
            if (type.startsWith("image/")) {
              const imgup = new ImageUploader(uploadurl);
              imgup.onload = res;
              imgup.setFile(file, maxwidth, maxsize);
              imgc.appendChild(imgup);
            } else {
              const inpurl = document.createElement("input");
              imgc.appendChild(inpurl);
              uploadFile(uploadurl, file, maxsize).then((url) => {
                inpurl.value = url;
                res();
              });
            }
          } catch (e) {
            rej(e);
          }
        });
        ps.push(p);
        if (!multiple) {
          break;
        }
      }
      await Promise.all(ps);
      inp2.value = this.value;
      if (this.onupload) {
        this.onupload({ target: this });
      }
    };
  }

  get name() {
    return this.getAttribute("name");
  }

  get value() {
    const urls = [];
    for (let i = 0; i < this.imgc.children.length; i++) {
      urls.push(this.imgc.children[i].value);
    }
    return urls.join(",");
  }

  set value(urls) {
    if (urls == null || urls.length === 0) {
      return;
    }
    const uploadurl = this.getAttribute("uploadurl");
    const url = urls.split(",");
    for (const n of url) {
      const imgup = new ImageUploader(uploadurl);
      imgup.setImage(n);
      this.imgc.appendChild(imgup);
    }
  }
}
customElements.define("input-image", InputImage);

export { InputImage };
