import * as fcl from "@onflow/fcl";

export const fetchVersusDrop = `
// This script checks that the accounts are set up correctly for the marketplace tutorial.
//
//emulator
// import NonFungibleToken, Content, Art, Auction, Versus from 0xf8d6e0586b0a20c7
//testnet
import Auction, Versus from 0xCONTRACT
/*
  Script used to get the first active drop in a versus 
 */
pub fun main(dropID: UInt64) : Versus.DropStatus {
		return Versus.getDrop(dropID)!
}
`;

export const fetchVersusArt = `
//testnet
import Versus from 0xCONTRACT
pub fun main(dropId: UInt64) : String {
  return Versus.getArtForDrop(dropId)!
}
`;

export const fetchMyArt = `
/*
  This script will check an address and print out its FT, NFT and Versus resources
 */
import Art from 0xCONTRACT
pub fun main(address:Address) : [Art.ArtData] {
    return Art.getArt(address: address)
}
`;

export const fetchOneArt = `
import Versus, Art from 0xCONTRACT
pub fun main(address:Address, artId:UInt64) : String? {
  return Art.getContentForArt(address: address, artId: artId)
}`;

export const fetchOneUser = `
import FungibleToken from 0xFungibleToken
/*
  This script will check an address and print out its FT, NFT and Versus resources
 */
pub fun main(address:Address) : UFix64 {
    // get the accounts' public address objects
    let account = getAccount(address)
    let balance = 0.0
    
    if let vault= account.getCapability(/public/flowTokenBalance).borrow<&{FungibleToken.Balance}>() {
       return vault.balance
    }
    return balance
}
`;

export const connectArtCollection = `
import NonFungibleToken from 0xNonFungibleToken
import Art from 0xCONTRACT
//This transaction will setup a drop in a versus auction
transaction() {
    prepare(account: AuthAccount) {
        account.save<@NonFungibleToken.Collection>(<- Art.createEmptyCollection(), to: Art.CollectionStoragePath)
        account.link<&{Art.CollectionPublic}>(Art.CollectionPublicPath, target: Art.CollectionStoragePath)
    }
}
`;

export const checkForArtConnection = `
import Art from 0xCONTRACT
pub fun main(address: Address): Bool {
  let account = getAccount(address)
  var collectionCap = account.getCapability<&{Art.CollectionPublic}>(Art.CollectionPublicPath)
  return collectionCap.check()
}
`;

export const profileEdit = `
import FungibleToken from 0xFungibleToken
import FlowToken from 0x0ae53cb6e3f42a79
import Profile, Art, NonFungibleToken, Marketplace, FUSD from 0xf8d6e0586b0a20c7

transaction(name: String, description: String, tags:[String], allowStoringFollowers: Bool) {
  prepare(acct: AuthAccount) {

    let profile <-Profile.createUser(name:name, description: description, allowStoringFollowers:allowStoringFollowers, tags:tags)

    let flowReceiver= acct.getCapability<&{FungibleToken.Receiver}>(/public/flowTokenReceiver)
    let flowBalance= acct.getCapability<&{FungibleToken.Balance}>(/public/flowTokenBalance)
    let flow=acct.borrow<&FlowToken.Vault>(from: /storage/flowTokenVault)!

    let flowWallet= Profile.Wallet(name:"Flow", receiver: flowReceiver, balance: flowBalance, accept:flow.getType(), tags: ["flow"])
    profile.addWallet(flowWallet)

    let fusd <- FUSD.createEmptyVault()
    let fusdType=fusd.getType()
    acct.save(<- fusd, to: /storage/fusdVault)
    acct.link<&FUSD.Vault{FungibleToken.Receiver}>( /public/fusdReceiver, target: /storage/fusdVault)
    acct.link<&FUSD.Vault{FungibleToken.Balance}>( /public/fusdBalance, target: /storage/fusdVault)

    let fusdWallet=Profile.Wallet(
        name:"FUSD", 
        receiver:acct.getCapability<&{FungibleToken.Receiver}>(/public/fusdReceiver),
        balance:acct.getCapability<&{FungibleToken.Balance}>(/public/fusdBalance),
        accept: fusdType,
        tags: ["fusd", "stablecoin"]
    )

    profile.addWallet(fusdWallet)

    acct.save<@NonFungibleToken.Collection>(<- Art.createEmptyCollection(), to: Art.CollectionStoragePath)
    acct.link<&{Art.CollectionPublic}>(Art.CollectionPublicPath, target: Art.CollectionStoragePath)
    let artCollectionCap=acct.getCapability<&{Art.CollectionPublic}>(Art.CollectionPublicPath)
    let artCollection=artCollectionCap.borrow()!
    artCollection.deposit(token: <- Art.createArtWithContent(name: "TestArt1", artist:"Tester", artistAddress:acct.address, description: "This is a test art", url: "Testing", type: "String", royalty:{}))
    artCollection.deposit(token: <- Art.createArtWithContent(name: "TestArt2", artist:"Tester", artistAddress:acct.address, description: "This is a test art", url: "Testing", type: "String", royalty:{}))
    profile.addCollection(Profile.ResourceCollection( 
        name: "VersusArt", 
        collection:artCollectionCap, 
        type: Type<&{Art.CollectionPublic}>(),
        tags: ["versus", "nft"]))

    let marketplaceCap = acct.getCapability<&{Marketplace.SalePublic}>(Marketplace.CollectionPublicPath)

    let sale <- Marketplace.createSaleCollection(ownerVault: flowReceiver)
    acct.save<@Marketplace.SaleCollection>(<- sale, to:Marketplace.CollectionStoragePath)
    acct.link<&{Marketplace.SalePublic}>(Marketplace.CollectionPublicPath, target: Marketplace.CollectionStoragePath)
    let marketplace=acct.borrow<&Marketplace.SaleCollection>(from: Marketplace.CollectionStoragePath)!
    let art <- Art.createArtWithContent(name: "TestArt3", artist:"Tester", artistAddress:acct.address, description: "This is a test art", url: "Testing", type: "String", royalty:{})
    marketplace.listForSale(token: <- art, price: 10.0)
    profile.addCollection(Profile.ResourceCollection(
        "VersusMarketplace", 
        marketplaceCap, 
        Type<&{Marketplace.SalePublic}>(),
        ["versus", "marketplace"]))


    profile.addLink(Profile.Link("Foo", "Image", "http://foo.bar"))
    acct.save(<-profile, to: Profile.storagePath)
    acct.link<&Profile.User{Profile.Public}>(Profile.publicPath, target: Profile.storagePath)
  }
}
`;
