import { find, replace } from "lodash";
import dropsData from "../../components/general/drops.json";
import testDropsData from "../../components/general/testdrops.json";

export const getGraffleUrl = (query) => {
  const contract = (
    process.env.NEXT_PUBLIC_CONTRACT || "0x69915b410cca3c65"
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

export const getDropThumbnail = async (
  dropId,
  width = "auto",
  type = "jpg"
) => {
  const setType = type === "gif" ? "gif" : "jpg";
  const url = `https://res.cloudinary.com/dxra4agvf/image/upload/w_${width}/v1629283084/maindr${dropId}.${setType}`;
  const isFile = await checkForFile(url);
  if (!isFile) return false;
  return url;
};

export const getCacheThumbnail = async (
  cacheKey,
  width = "auto",
  type = "jpg"
) => {
  const setType = type === "gif" ? "gif" : "jpg";
  const url = `https://res.cloudinary.com/dxra4agvf/image/upload/w_${width}/v1629283084/maincache${cacheKey}.${setType}`;
  const isFile = await checkForFile(url);
  if (!isFile) return false;
  return url;
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
