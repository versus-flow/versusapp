import dynamic from "next/dynamic";

const Model = dynamic(() => import("./Model"), { ssr: false });

const ARViewer = ({ src }) => {
  const item = {
    obj: "QmVWPsjA52jUKTFa8R8NSuKDeYFcwADW8ZuwHUXCBY1AzQ",
    usdz: "QmYpBqaFYasL7Uoyc89KSGb2B7k9gqB9Ee41A2i5oZxHAJ",
    glb: "QmWWCJZcxNTgjcmwQPhmuS4NpJHFRXZqsg5k4GhebFc8y7",
  };
  const withUrl = {
    obj: `https://gateway.pinata.cloud/ipfs/${item.obj}`,
    usdz: `https://gateway.pinata.cloud/ipfs/${item.usdz}`,
    glb: `https://gateway.pinata.cloud/ipfs/${item.glb}`,
  };
  const { glb, obj, usdz } = withUrl;
  console.log(withUrl);
  return (
    <>
      <Model src={withUrl} />
    </>
  );
};

export default ARViewer;
