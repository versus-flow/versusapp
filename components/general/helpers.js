import { find, includes, replace } from "lodash";
import { Cloudinary } from "cloudinary-core";

import dropsData from "../../components/general/drops.json";
import testDropsData from "../../components/general/testdrops.json";

export const getGraffleUrl = (query) => {
  const contract = (
    process.env.NEXT_PUBLIC_CONTRACT || "0x99ca04281098b33d"
  ).substr(2);
  const editedQuery = replace(query, "CONTRACT", contract);
  return `${
    process.env.NEXT_PUBLIC_GRAFFLE_URL ||
    "https://prod-test-net-dashboard-api.azurewebsites.net/api/company/737eb23a-5c80-4421-8b49-15b20a42f5f4/search"
  }${editedQuery}`;
};

export const isMainnet = () => process.env.NEXT_PUBLIC_FLOW_ENV === "mainnet";

export const getLink = (links, title) => {
  const item = find(links, (l) => l.title === title) || {};
  return item.url;
};

export const checkForFile = async (img) => {
  try {
    const res = await fetch(img, { method: "HEAD" });
    return res.ok;
  } catch (e) {
    return false;
  }
};

export const uploadFile = async (file, name) => {
  return new Promise((resolve, reject) => {
    var url = `https://api.cloudinary.com/v1_1/dxra4agvf/upload`;
    var xhr = new XMLHttpRequest();
    var fd = new FormData();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.onreadystatechange = function (e) {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var response = JSON.parse(xhr.responseText);
        var url = response.secure_url;
        resolve(url);
      }
    };

    fd.append("upload_preset", "fhgwavmy");
    fd.append("tags", "browser_upload"); // Optional - add tag for image admin in Cloudinary
    fd.append("file", file);
    fd.append(
      "filename_override",
      `${process.env.NEXT_PUBLIC_FLOW_ENV || "testnet"}${name}`
    );
    xhr.send(fd);
  });
};

export const resizedataURL = (datas, _scale) => {
  return new Promise(async function (resolve, reject) {
    var img = document.createElement("img");
    img.onload = function () {
      var canvas = document.createElement("canvas");
      canvas.width = img.width * _scale;
      canvas.height = img.height * _scale;
      var ctx = canvas.getContext("2d");
      var maxW = img.width * _scale;
      var maxH = img.height * _scale;
      var iw = img.width;
      var ih = img.height;
      var scl = Math.min(maxW / iw, maxH / ih);
      var iwScaled = iw * scl;
      var ihScaled = ih * scl;
      canvas.width = iwScaled;
      canvas.height = ihScaled;
      ctx.drawImage(this, 0, 0, iwScaled, ihScaled);
      var dataURI = canvas.toDataURL();
      resolve(dataURI);
    };
    img.src = datas;
  });
};

const cl = new Cloudinary({ cloud_name: "dxra4agvf", secure: true });

export const getDropThumbnail = async (
  dropId,
  width = "auto",
  type = "jpg"
) => {
  const setType = type === "gif" ? "gif" : "jpg";
  const imageURL = cl.url(`maindr${dropId}`, {
    transformation: [
      {
        width,
        crop: "fill",
      },
      { fetch_format: "auto" },
    ],
  });
  const isFile = await checkForFile(imageURL);
  if (!isFile) return false;
  return imageURL;
};

export const getVidThumbnail = (src) => {
  return replace(cl.video_url(`${src}.mp4`), "image", "video");
};

export const getImgThumbnail = (src, width = "auto", type = "jpg") => {
  const imageURL = cl.url(src, {
    transformation: [
      {
        width,
        crop: "fill",
      },
      { fetch_format: "auto" },
    ],
  });
  return imageURL;
};

export const getCacheThumbnail = async (
  cacheKey,
  width = "auto",
  type = "jpg"
) => {
  const setType = type === "gif" ? "gif" : "jpg";
  const imageURL = cl.url(`maincache${cacheKey}`, {
    transformation: [
      {
        width,
        crop: "fill",
      },
      { fetch_format: "auto" },
    ],
  });
  const isFile = await checkForFile(imageURL);
  if (!isFile) return false;
  return imageURL;
};

export const getDropFromArtist = (artist, cacheKey) => {
  let cachedDrop = null;
  if (cacheKey)
    cachedDrop = find(
      process.env.NEXT_PUBLIC_FLOW_ENV === "mainnet"
        ? dropsData
        : testDropsData,
      (d) =>
        process.env.NEXT_PUBLIC_FLOW_ENV === "mainnet"
          ? cacheKey === d.cacheKey
          : (d.id = "1")
    );
  if (cachedDrop) return cachedDrop;
  return find(
    process.env.NEXT_PUBLIC_FLOW_ENV === "mainnet" ? dropsData : testDropsData,
    (d) =>
      process.env.NEXT_PUBLIC_FLOW_ENV === "mainnet"
        ? artist === d.artist || artist.toLowerCase() === d.handle.toLowerCase()
        : (d.id = "1")
  );
};

export const isSpecialDrop = (drop) => {
  return includes(["flow", "ipfs/audio", "ipfs/video"], drop.metadata.type);
};

export const isAudioDrop = (drop) => {
  return includes(["ipfs/audio"], drop.metadata.type);
};

export const isVideoDrop = (drop) => {
  return includes(["ipfs/video"], drop.metadata.type);
};

export const getVideoDimensionsOf = (url) => {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    video.addEventListener(
      "loadedmetadata",
      function () {
        const height = this.videoHeight;
        const width = this.videoWidth;
        resolve({ height, width });
      },
      false
    );
    video.src = url;
  });
};

export const sendFilterChange = () => {
  const elem = window;
  const event = new Event("filterChange");
  elem.dispatchEvent(event);
};
