import * as fcl from "@onflow/fcl";

fcl
  .config()
  .put(
    "accessNode.api",
    process.env.ACCESS_NODE || "https://access-testnet.onflow.org"
  )
  .put(
    "challenge.handshake",
    process.env.WALLET || "https://flow-wallet-testnet.blocto.app/authn"
  )
  .put("0xFungibleToken", process.env.FUNGIBLE_TOKEN || "0x9a0766d93b6608b7")
  .put(
    "0xNonFungibleToken",
    process.env.NONFUNGIBLE_TOKEN || "0x631e88ae7f1d7c20"
  )
  .put("0xCONTRACT", process.env.CONTRACT || "0xd5ee212b0fa4a319")
  .put("env", process.env.FLOW_ENV || "testnet");
